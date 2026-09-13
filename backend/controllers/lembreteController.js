import lembretes from '../data/lembretes.js';

export function criarLembrete(req, res) {
    const { emailId, comentario, data, hora } = req.body;

    if (!emailId || !comentario || !data || !hora) {
        return res.status(400).json({
            erro: "Todos os campos são obrigatórios."
        });
    }

    const novoLembrete = {
        id: Date.now(),
        emailId,
        comentario,
        data,
        hora,
        enviado: false
    };

    lembretes.push(novoLembrete);

    res.status(201).json(novoLembrete);
}