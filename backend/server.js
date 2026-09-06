import express from 'express';
const app = express();



app.get('/', (req, res) => {
    res.send('API FUNCIONANDOAAAAAAA')
})

app.get('/emails', (req, res) => {
    res.json(
        {
            remetente: "Google",
            assunto: "Sua conta foi invadida",
            preview: "Altere sua senha imediatamente"
        }
    )
})

app.listen(7070, () => {
    console.log(`API subiu com sucesso na porta 7070`);
})