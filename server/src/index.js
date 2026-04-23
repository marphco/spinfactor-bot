const express = require('express');
const nodemailer = require('nodemailer');

const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5001;
const ALLOWED_ORIGINS = [
  process.env.CLIENT_URL,
  'http://localhost:5173',
  'http://localhost:5174', // Added to support local port shifts
  'https://spinfactor-bot.vercel.app',
  'https://www.spinfactor.it',
  'https://spinfactor.it'
];

// Middleware
app.use(helmet());
app.use(morgan('dev'));
app.use(cors({
  origin: function (origin, callback) {
    // allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    if (ALLOWED_ORIGINS.indexOf(origin) === -1 && !origin.startsWith('http://localhost:51')) {
      return callback(new Error('The CORS policy for this site does not allow access from the specified Origin.'), false);
    }
    return callback(null, true);
  },
  methods: ['GET', 'POST'],
  credentials: true
}));
app.use(express.json());

// Basic Route for AI/API bridge
app.get('/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    timestamp: new Date().toISOString(),
    service: 'Spinbot AI Bridge'
  });
});

// AI Proxy Endpoint (Streaming)
app.post('/api/chat', async (req, res) => {
  const { message } = req.body;
  
  if (!message) {
    return res.status(400).json({ error: 'Message is required' });
  }

  try {
    // Intentionally removed AI request log for production
    
    const systemicPrompt = `D'ora in poi agirai esclusivamente come Spinny, l'assistente concierge di Spin Factor. 
    REGOLE CRITICHE: 
    1. Sii estremamente sintetico (massimo 1-2 paragrafi). 
    2. NON dire mai "sul nostro sito", "visita la sezione" o frasi simili: l'utente è già qui. 
    3. NON fornire mai indirizzi email (es. segreteria@spinfactor.it).
    4. Se l'utente vuole approfondire o contattarci, invitalo a usare i pulsanti che appariranno sotto la tua risposta.
    5. Menziona esattamente i nomi di queste sezioni per attivare i tasti: "Scopri Chi Siamo", "Podcast", "Scopri cosa Facciamo", "Capri Talks", "Contatti".
    6. Tono: Wit, sintetico, istituzionale ma accessibile.
    
    DOMANDA UTENTE: ${message}`;

    const response = await fetch(process.env.VIS_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.VIS_API_TOKEN}`
      },
      body: JSON.stringify({
        question: systemicPrompt,
        stream: true
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`External API responded with status ${response.status}: ${errorText}`);
    }

    // Set headers for streaming
    res.setHeader('Content-Type', 'text/plain; charset=utf-8');
    res.setHeader('Transfer-Encoding', 'chunked');

    const reader = response.body.getReader();
    const decoder = new TextDecoder();

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      
      const chunk = decoder.decode(value, { stream: true });
      res.write(chunk);
    }

    res.end();


  } catch (error) {
    console.error('❌ AI Proxy Stream Error:', error.message);
    if (!res.headersSent) {
      res.status(500).json({ 
        reply: "Il sistema AI è temporaneamente offline. Ti preghiamo di riprovare più tardi.",
        error: error.message 
      });
    } else {
      res.end(); // Terminate if mid-stream
    }
  }
});

// Contact Form Endpoint
app.post('/api/contact', async (req, res) => {
  const { name, email, message, company } = req.body;

  // Anti-spam Check (Honeypot)
  if (company) {
    // Silently reject spam
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
