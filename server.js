const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

// CONFIGURAÇÃO DO EMAIL (GMAIL)
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'aprovacaowtb@gmail.com',
    pass: 'M2XGVV93RSEQVTQ37LMK92XB'
  }
});

// ROTA PARA ENVIAR EMAIL
app.post('/api/send-email', async (req, res) => {
  const { to, subject, text } = req.body;

  try {
    await transporter.sendMail({
      from: 'aprovacaowtb@gmail.com',
      to,
      subject,
      text
    });

    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000');
});
