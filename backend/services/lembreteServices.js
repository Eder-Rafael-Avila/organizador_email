import lembretes from '../data/lembretes.js';

export function verificarLembretes() {
    const agora = new Date();

    const dataAtual = agora.toISOString().split("T")[0];

    const horaAtual = agora.toTimeString().slice(0, 5);

    lembretes.forEach(lembrete => {
        if (
            !lembrete.enviado &&
            lembrete.data === dataAtual &&
            lembrete.hora === horaAtual
        ) {
            console.log("Lembrete disparado!");
            console.log(lembrete);

            lembrete.enviado = true;
        }
    });
}

setInterval(verificarLembretes, 60000);