require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const routes = require("./routes/routes");
const nodemailer = require("nodemailer");
const crypto = require('crypto');
const bcrypt = require('bcryptjs');
const User = require('./models/user.model');
const cookieParser = require('cookie-parser');
const path = require("path");

const app = express();
const port = process.env.PORT || 3001;

app.use(express.json({limit:'50mb'}));

// Enable CORS
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get('/set-cookie', (req, res) => {
  const cookieId = process.env.JWT_SECRET;
  res.cookie('cookieId', cookieId, {
    sameSite: 'none',
    secure: true
  });
  res.send('Cookie set successfully');
});

app.get("/favicon.ico", (req, res) => {
  res.sendFile(path.join(__dirname, "/favicon.ico"));
});

// Connect to MongoDB
mongoose
  .connect(
    process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, }
  )
  .then(() => {
    console.log("Connected to MongoDB");
    initial();
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB", error);
    process.exit();
  });

// Create a transporter with your email service provider's configuration
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: process.env.NODEMAILER_USER,
    pass: process.env.NODEMAILER_PASS,
  },
});

// Helper function to generate a random token
function generateResetToken() {
  const token = crypto.randomBytes(20).toString('hex');
  return token;
}

// Send Mail Logic
app.post("/api/reset-password", async (req, res) => {
  const { user } = req.body;
  try {
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const token = generateResetToken();

    const updatedUser = await User.findOneAndUpdate({ email: user.email, username: user.username }, { resetToken: token });

    if (!updatedUser) {
      return res.status(404).json({ error: 'User not found.' });
    }

    const mailOptions = {
      from: process.env.NODEMAILER_USER,
      to: user.email,
      subject: "GW2Geary Password Reset",
      html: `<h4>Hi ${user.username},</h4>
             <p>You have requested to reset your password.</p>
             <p style="display: inline;">Click <h4 style="display: inline;"><a href="https://gw2geary.com/reset-password/${token}">here</a></h4> to reset your password.</p>
             <p>If you did not request this, please ignore this email.</p>
             <h4>GW2Geary team.</h4>`,
    };

    await transporter.sendMail(mailOptions);

    res.json({ message: "Mail sent successfully." });
  } catch (error) {
    console.error("Error sending password reset email:", error);
    res.status(500).json({ message: "An error occurred" });
  }
});


// Reset Password Logic
app.post('/api/reset-password/:token', (req, res) => {
  const { token } = req.params;
  const { newPassword } = req.body;
  const encryptedPassword = bcrypt.hashSync(newPassword, 8);
  User.findOneAndUpdate({ resetToken: token }, { password: encryptedPassword })
    .then((user) => {
      if (!user) {
        return res.status(404).json({ error: 'User not found.' });
      }

      delete user.resetToken;
      user.save();

      return res.json({ message: 'Password reset successful.' });
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ error: 'Internal server error.' });
    });
});

app.post('/api/contacts', async (req, res) => {
  const { email, subject, message } = req.body;

  try {
    // Compose the email
    const mailOptions = {
      from: email,
      to: 'gw2geary@gmail.com',
      subject: subject,
      text: `
      From: ${email}
      Subject: ${subject}
      Message: ${message}
      `,
    };

    // Send the email
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent:', info.response);

    res.sendStatus(200);
  } catch (error) {
    console.error('Error sending email:', error);
    res.sendStatus(500);
  }
});

// Consolidated routes
app.use("/api", routes);

// Default route with dynamic meta tags
app.use(require('./routes/pages.routes'));

// Serve static files from the build folder
app.use(express.static(path.join(__dirname, "../client/build")));

// // Set port and listen for requests
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

// Function to initialize roles
async function initial() {
  const db = require("./models");
  const Role = db.role;

  try {
    const count = await Role.estimatedDocumentCount();

    if (count === 0) {
      await new Role({ name: "user" }).save();
      console.log("Added 'user' to roles collection");

      await new Role({ name: "moderator" }).save();
      console.log("Added 'moderator' to roles collection");

      await new Role({ name: "admin" }).save();
      console.log("Added 'admin' to roles collection");
    }
  } catch (error) {
    console.error("Error initializing roles:", error);
  }
}

