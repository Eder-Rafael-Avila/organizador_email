import express from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { google } from "googleapis";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import {
    gerarUrlAutorizacao,
    desconectarGoogle,
    oAuth2Client
} from "../config/googleAuth.js";

const router = express.Router();

router.get("/auth/google", (req, res) => {
    const url = gerarUrlAutorizacao();

    res.redirect(url);
});

router.get("/auth/google/callback", async (req, res) => {
    const codigo = req.query.code;

    const { tokens } = await oAuth2Client.getToken(codigo);

    oAuth2Client.setCredentials(tokens);

    fs.writeFileSync(
        path.join(__dirname, "..", "token.json"),
        JSON.stringify(tokens, null, 2)
    );

    res.redirect(`http://localhost:5173/?contaAtualizada=${Date.now()}`);
});

router.get('/auth/google/logout', (req, res) => {
    desconectarGoogle();

    res.redirect('/auth/google');
})

router.get("/auth/google/conta", async (req, res) => {
    try {
        const auth = oAuth2Client;
        const gmail = google.gmail({
            version: "v1",
            auth
        });

        const resposta = await gmail.users.getProfile({
            userId: "me"
        });

        res.json({
            conectado: true,
            email: resposta.data.emailAddress
        });

    } catch (erro) {
        console.error(erro);

        res.status(500).json({
            conectado: false,
            email: null
        });
    }
});

export default router;