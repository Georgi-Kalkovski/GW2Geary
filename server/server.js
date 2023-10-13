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
const fs = require("fs");
const path = require("path");

const app = express();
const port = process.env.PORT || 3001;

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

// Serve static files from the build folder
app.use(express.static(path.join(__dirname, "../client/build")));

// Default route with dynamic meta tags
app.get("*", (req, res) => {
  try {
    const pathToIndex = path.join(__dirname, "../client/build/index.html");
    const raw = fs.readFileSync(pathToIndex, 'UTF8');

    // Determine the requested page and set dynamic meta tags accordingly
    let pageTitle, pageDescription, pageOgUrl;
    if (req.path === '/login') {
      pageTitle = "GW2Geary - Login";
      pageDescription = `Login/Sign in to access your profile's information or reset password using your email.
      By Login you'll have access to your API Keys, hide/show/delete them, as well as hide/show your characters separately.
      You'll also be able to manipulate your profile info (change username, change email, change password, delete user).`;
      pageOgUrl = "https://gw2geary.com/login/"
    } else if (req.path === '/register') {
      pageTitle = "GW2Geary - Register";
      pageDescription = `Register/Sign up to create a profile's information.
      By signing up you'll be able to register API Keys, hide/show/delete them, as well as hide/show your characters separately.
      You'll also be able to manipulate your profile info (change username, change email, change password, delete user).`;
      pageOgUrl = "https://gw2geary.com/register/"
    }
    else if (req.path === '/news') {
      pageTitle = "GW2Geary - News";
      pageDescription = "All the News about GW2Geary are here! Latest news: Added Relic and Power Core to the character's preview.";
      pageOgUrl = "https://gw2geary.com/news/"
    } else if (req.path === '/about') {
      pageTitle = "GW2Geary - About";
      pageDescription = `Welcome to GW2Geary, a dedicated GW2 armory. Your ultimate inspect tool to explore and inspect Guild Wars 2 accounts and characters.
      With GW2Geary, you can dive deep into the details of your favorite players equipment, builds, traits, and skills.
      Want to show your gear(armour & weapons) to others? Use GW2Geary!`;
      pageOgUrl = "https://gw2geary.com/about/"
    } else if (req.path === '/contacts') {
      pageTitle = "GW2Geary - Contacts";
      pageDescription = `This is where you can contact us. Write us a message if you have a questin, an idea or just want to chat.`;
      pageOgUrl = "https://gw2geary.com/contacts/"
    } else if (req.path.split('/')[1] === 'a') {
      const name = req.path.split('/')[2];
      pageTitle = `GW2Geary - ${name ? name : 'Account'}`;
      pageDescription = `Find more information about the account${name ? ' ' + name : '.'}`;
      pageOgUrl = `https://gw2geary.com/a/${name}/`
    } else if (req.path.split('/')[1] === 'c') {
      const name = req.path.split('/')[2];
      pageTitle = `GW2Geary - ${name ? name : 'Character'}`;
      pageDescription = `Find more information about the character${name ? ' ' + name : '.'}`;
      pageOgUrl = `https://gw2geary.com/c/${name}/`
    } else {
      pageTitle = "GW2Geary";
      pageDescription = `Discover and Inspect GW2 Accounts and Characters.
      Welcome to GW2Geary, a dedicated GW2 armory. Your ultimate tool to explore and inspect Guild Wars 2 accounts and characters.
      With GW2Geary, you can dive deep into the details of your favorite players equipment, builds, traits, and skills.
      Want to show your gear(armour & weapons) to others? Use GW2Geary!`;
      pageOgUrl = "https://gw2geary.com/"
    }

    const updated = raw
      .replace(/__PAGE_TITLE__/g, pageTitle)
      .replace(/__PAGE_DESCRIPTION__/g, pageDescription)
      .replace(/__PAGE_URL__/g, pageOgUrl);

    // console.log(updated)

    res.send(updated);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
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

