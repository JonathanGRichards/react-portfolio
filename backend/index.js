const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
require('dotenv').config({ path: './backend/.env' });

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Email route
app.post('/send-email', async (req, res) => {
  const { name, email, subject, message } = req.body;

  try {
    const transporter = nodemailer.createTransport({
      host: 'smtp.zoho.eu', // Zoho Mail SMTP server
      port: 465, // Use 465 for secure connection
      secure: true, // Use true for SSL/TLS
      auth: {
        user: process.env.EMAIL_USER, // Your Zoho email address
        pass: process.env.EMAIL_PASS, // Your Zoho email password or app-specific password
      },
    });
  
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      replyTo: email,
      subject: `Portfolio Contact: ${subject}`,
      text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
    };
  
    await transporter.sendMail(mailOptions);
    res.status(200).send('Email sent successfully!');
  } catch (error) {
    res.status(500).send('Failed to send email.');
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});