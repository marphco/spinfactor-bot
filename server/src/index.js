const express = require('express');
const nodemailer = require('nodemailer');

const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5001;
const CLIENT_URL = process.env.CLIENT_URL || 'http://localhost:5173';

// Middleware
app.use(helmet());
app.use(morgan('dev'));
app.use(cors({
  origin: CLIENT_URL,
  methods: ['GET', 'POST'],
  credentials: true
}));
app.use(express.json());

// Basic Route for AI/API bridge
app.get('/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    timestamp: new Date().toISOString(),
    service: 'Spin Factor AI Bridge'
  });
});

// Future AI Endpoint
app.post('/api/chat', (req, res) => {
  const { message } = req.body;
  // This is where the AI logic from the backend team will go
  res.json({ 
    reply: `Backend received: "${message}". AI module integration pending.` 
  });
});

// Contact Form Endpoint
app.post('/api/contact', async (req, res) => {
  const { name, email, message, company } = req.body;

  // Anti-spam Check (Honeypot)
  if (company) {
    console.log('Spam detected! Honeypot filled.');
    return res.status(200).json({ success: true, message: 'Message received (spam)' });
  }

  // Basic Validation
  if (!name || !email || !message) {
    return res.status(400).json({ success: false, message: 'Tutti i campi sono obbligatori.' });
  }

  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: true, // Use SSL for port 465
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const mailOptions = {
      from: `"${name}" <${process.env.SENDER_EMAIL}>`,
      replyTo: email,
      to: process.env.RECEIVER_EMAIL,
      subject: `Nuovo messaggio da Spin Factor Bot: ${name}`,
      text: `Nome: ${name}\nEmail: ${email}\nMessaggio: ${message}`,
      html: `
        <h3>Nuovo contatto dal sito</h3>
        <p><strong>Nome:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Messaggio:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
      `,
    };

    console.log('--- Intent di invio Email ---');
    console.log('Da:', mailOptions.from);
    console.log('A:', mailOptions.to);
    console.log('Oggetto:', mailOptions.subject);
    console.log('Contenuto:', mailOptions.text);
    console.log('----------------------------');

    await transporter.sendMail(mailOptions);
    res.status(200).json({ success: true, message: 'Messaggio inviato con successo!' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ success: false, message: 'Errore durante l\'invio del messaggio. Riprova più tardi.' });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Spin Factor Server running on port ${PORT}`);
});
