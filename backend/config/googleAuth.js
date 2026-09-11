import { google } from 'googleapis';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const credenciais = JSON.parse(
    fs.readFileSync(
        path.join(__dirname, "..", "credentials.json"),
        "utf-8"
    )
);

const { client_id, client_secret, redirect_uris } = credenciais.installed;

const oAuth2Client = new google.auth.OAuth2(
    client_id,
    client_secret,
    "http://localhost:7070/auth/google/callback"
);

const caminhoToken = path.join(__dirname, "..", "token.json");

if (fs.existsSync(caminhoToken)) {
    const token = JSON.parse(
        fs.readFileSync(caminhoToken, "utf-8")
    );

    oAuth2Client.setCredentials(token);
}

export function gerarUrlAutorizacao() {
    return oAuth2Client.generateAuthUrl({
        access_type: "offline",
        prompt: "select_account",
        scope: [
            "https://www.googleapis.com/auth/gmail.readonly"
        ]
    });
}

export function desconectarGoogle() {
    oAuth2Client.setCredentials({});

    if (fs.existsSync(caminhoToken)) {
        fs.unlinkSync(caminhoToken);
    }
}

export function obterClienteGoogle() {
    return oAuth2Client;
}

export { oAuth2Client };