require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const routes = require("./routes/routes");
const nodemailer = require("nodemailer");
const crypto = require('crypto');
const bcrypt = require('bcryptjs');
const User = require('./models/user.model');

const app = express();
const port = process.env.PORT || 3001;

// Enable CORS
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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
  host: "gw2geary.com",
  secure: true,
  service: "gmail",
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
app.post("/reset-password", async (req, res) => {
  const { user } = req.body;
  try {
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const token = generateResetToken();

    const updatedUser = await User.findOneAndUpdate({ email: user.email }, { resetToken: token });

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
app.post('/reset-password/:token', (req, res) => {
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

app.post('/contacts', async (req, res) => {
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

// Default route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to Terter application." });
});

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

