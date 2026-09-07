import express from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import {
    gerarUrlAutorizacao,
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

    fs.writeFileSync(
        path.join(__dirname, "..", "token.json"),
        JSON.stringify(tokens, null, 2)
    );

    res.send("Autorização concluída! Pode fechar esta página.");
});


export default router;