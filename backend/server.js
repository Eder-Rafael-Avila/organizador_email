import express from 'express';
const app = express();

app.listen(PORT, () => {
    console.log(`API subiu com sucesso na porta ${PORT}`);
})