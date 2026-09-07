import { obterEmailsGmail } from "../services/gmailEmailService.js";

export async function buscarEmailsGmail(req, res) {
    const emails = await obterEmailsGmail();

    res.json(emails);
}

