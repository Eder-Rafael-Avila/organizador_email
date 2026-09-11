import { google } from "googleapis";
import * as cheerio from "cheerio";
import { obterClienteGoogle } from "../config/googleAuth.js";

function pegarHeader(headers, nome) {
    const header = headers.find(
        item => item.name.toLowerCase() === nome.toLowerCase()
    );

    if (!header) return "";

    return header.value
        .replace(/[\t\n\r]+/g, " ")
        .replace(/\s+/g, " ")
        .trim();
}

function decodificarBase64Url(dados) {
    if (!dados) return "";

    return Buffer.from(
        dados.replace(/-/g, "+").replace(/_/g, "/"),
        "base64"
    ).toString("utf-8");
}

function pegarConteudo(payload) {
    if (payload.body?.data) {
        return decodificarBase64Url(payload.body.data);
    }

    if (payload.parts) {
        for (const parte of payload.parts) {
            const conteudo = pegarConteudo(parte);

            if (conteudo) {
                return conteudo;
            }
        }
    }

    return "";
}

function limparHtml(html) {
    const $ = cheerio.load(html);

    $("script, style, img, svg").remove();
    $("br").replaceWith("\n");
    $("p, div, section, article, h1, h2, h3, h4, h5, h6, li, blockquote, tr")
        .each((_, elemento) => {
            $(elemento).append("\n");
        });

    return $.root()
        .text()
        .replace(/[\u200B-\u200D\uFEFF]/g, "")
        .replace(/\u00A0/g, " ")
        .replace(/\\t/g, " ")
        .replace(/\\n/g, "\n")
        .replace(/\\r/g, "")
        .replace(/[ \t]+/g, " ")
        .replace(/ *\n */g, "\n")
        .replace(/\n{3,}/g, "\n\n")
        .trim();
}

function separarRemetente(valor) {
    const correspondencia = valor.match(/^(.*?)\s*<([^>]+)>$/);

    if (!correspondencia) {
        return {
            nome: valor,
            email: valor.includes("@") ? valor : ""
        };
    }

    return {
        nome: correspondencia[1].replace(/^['"]|['"]$/g, "").trim() || correspondencia[2],
        email: correspondencia[2].trim()
    };
}

function transformarEmail(email) {
    return {
        id: email.id,
        remetente: email.remetente,
        remetenteEmail: email.remetenteEmail,
        assunto: email.assunto,
        preview: email.conteudo.substring(0, 100),
        conteudo: email.conteudo,
        data: email.data,
        lido: !email.labels.includes("UNREAD"),
        importante: email.labels.includes("IMPORTANT"),
        pasta: email.labels.includes("TRASH")
            ? "Lixeira"
            : !email.labels.includes("INBOX")
                ? "Arquivados"
                : "Entrada"
    };
}

export async function obterEmailsGmail() {
    const auth = obterClienteGoogle();
    const gmail = google.gmail({ version: "v1", auth });

    const resposta = await gmail.users.messages.list({
        userId: "me",
        maxResults: 30
    });

    const mensagens = resposta.data.messages || [];

    return Promise.all(
        mensagens.map(async mensagem => {
            const respostaEmail = await gmail.users.messages.get({
                userId: "me",
                id: mensagem.id,
                format: "full"
            });

            const dados = respostaEmail.data;
            const headers = dados.payload?.headers || [];
            const conteudo = limparHtml(pegarConteudo(dados.payload));
            const remetente = separarRemetente(pegarHeader(headers, "From"));

            return transformarEmail({
                id: dados.id,
                remetente: remetente.nome,
                remetenteEmail: remetente.email,
                assunto: pegarHeader(headers, "Subject"),
                data: pegarHeader(headers, "Date"),
                conteudo,
                labels: dados.labelIds || []
            });
        })
    );
}
