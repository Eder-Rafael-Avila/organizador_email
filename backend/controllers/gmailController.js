import { obterEmailsGmail } from "../services/gmailEmailService.js";

export async function buscarEmailsGmail(req, res) {
    try {
        const emails = await obterEmailsGmail();

        res.json(emails);
    } catch (erro) {
        console.error("Não foi possível buscar os e-mails do Gmail:", erro);

        res.status(502).json({
            erro: "Não foi possível carregar os e-mails da conta conectada."
        });
    }
}

