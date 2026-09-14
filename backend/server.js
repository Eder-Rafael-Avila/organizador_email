import express from 'express';
import cors from 'cors';
import "./services/lembreteServices.js";
import "./services/whatsappService.js";
import { enviarMensagemWhatsApp } from "./services/whatsappService.js";

import 'dotenv/config';

import aiRoutes from './routes/aiRoutes.js';
import authRoutes from "./routes/authRoutes.js";
import gmailRoutes from "./routes/gmailRoutes.js";
import lembreteRoutes from './routes/lembreteRoutes.js';

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('API FUNCIONANDOAAAAAAA')
})

app.use(aiRoutes);

app.use(authRoutes);

app.use(gmailRoutes);

app.use(lembreteRoutes);

app.listen(7070, () => {
    console.log(`API subiu com sucesso na porta 7070`);
})

console.log(process.env.OPENROUTER_API_KEY ? "API KEY carregada!" : "API KEY NÃO carregada!");