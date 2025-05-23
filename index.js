const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Enable CORS for your frontend
app.use(cors({
  origin: '*', // your React frontend port
  methods: ['POST'],
  allowedHeaders: ['Content-Type'],
}));

app.use(express.json());

// Test route
app.get('/', (req, res) => {
  res.send('🟢 API is live');
});

// Contact form handler
app.post('/api/contact', async (req, res) => {
  const { name, email, message } = req.body;

  console.log('📩 New message:', { name, email, message });

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: email,
    to: process.env.EMAIL_USER,
    subject: `Portfolio Message from ${name}`,
    text: `Email: ${email}\n\nMessage:\n${message}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('✅ Email sent successfully!');
    res.send('Message sent successfully!');
  } catch (error) {
    console.error('❌ Email sending error:', error.message);
    res.status(500).send('Failed to send message');
  }
});

// Start server
const PORT = process.env.PORT || 5050;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});