const express = require('express');
const router = express.Router();
const nodemailer = require("nodemailer");
const crypto = require('crypto');
const bcrypt = require('bcryptjs');
const User = require('../models/user.model');

// Create a transporter with your email service provider's configuration
const transporter = nodemailer.createTransport({
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
  router.post("/", async (req, res) => {
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
               <p style="display: inline;">Click <h4 style="display: inline;"><a href="https://gw2geary.com/resetPassword/${token}">here</a></h4> to reset your password.</p>
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
  router.post('/:token', (req, res) => {
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

module.exports = router;
