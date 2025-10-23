// Top-level run-check
console.log('index.ts iniciado');
const express = require('express');
const cors = require('cors');
import { Request, Response } from 'express';

const app = express();
const PORT = 4000;

// ❌ Rota sem CORS
app.get('/sem-cors', (req: Request, res: Response) => {
  res.json({ message: 'Essa rota NÃO tem CORS habilitado.' });
});

// ✅ Rota com CORS liberado para qualquer origem
app.get('/com-cors', cors(), (req: Request, res: Response) => {
  res.json({ message: 'CORS habilitado para qualquer origem!' });
});

// 🔐 Rota com CORS restrito
app.get('/cors-restrito', cors({
  origin: 'http://localhost:3000'
}), (req: Request, res: Response) => {
  res.json({ message: 'CORS permitido apenas para http://localhost:3000' });
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
});
