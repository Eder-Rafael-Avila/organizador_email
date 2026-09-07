export function assistirAi(req, res) {
    const msg = req.body

    res.json({
        recebido: msg.mensagem
    });
}