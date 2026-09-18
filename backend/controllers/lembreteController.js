import lembretes from '../data/lembretes.js';

export function criarLembrete(req, res) {
    const { emailId, comentario, data, hora, numeroWhatsApp } = req.body;
    const numeroNormalizado = String(numeroWhatsApp || '').replace(/\D/g, '');

    if (!emailId || !comentario || !data || !hora || !numeroNormalizado) {
        return res.status(400).json({
            erro: "Todos os campos são obrigatórios."
        });
    }

    if (numeroNormalizado.length < 8 || numeroNormalizado.length > 15) {
        return res.status(400).json({
            erro: "Informe um número de WhatsApp válido com código do país."
        });
    }

    const novoLembrete = {
        id: Date.now(),
        emailId,
        comentario,
        data,
        hora,
        numeroWhatsApp: numeroNormalizado,
        enviado: false
    };

    lembretes.push(novoLembrete);
    console.log("📌 Lembretes cadastrados:", lembretes);

    res.status(201).json({
        criado: true,
        lembrete: novoLembrete
    });
}