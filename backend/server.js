import express from 'express';
import cors from 'cors';

import 'dotenv/config';

import emailRoutes from './routes/emailRoutes.js';
import aiRoutes from './routes/aiRoutes.js';
import authRoutes from "./routes/authRoutes.js";
import gmailRoutes from "./routes/gmailRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('API FUNCIONANDOAAAAAAA')
})

app.use(emailRoutes);

app.use(aiRoutes);

app.use(authRoutes);

app.use(gmailRoutes);

app.listen(7070, () => {
    console.log(`API subiu com sucesso na porta 7070`);
})

console.log(process.env.OPENROUTER_API_KEY ? "API KEY carregada!" : "API KEY NÃO carregada!");