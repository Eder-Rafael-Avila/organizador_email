import lembretes from '../data/lembretes.js';
import { enviarMensagemWhatsApp } from './whatsappService.js';

export async function verificarLembretes() {
    const agora = new Date();

    console.log("🕐 Agora:", agora);

    for (const lembrete of lembretes) {
        console.log("📌 Lembrete:", lembrete);

        const dataHoraLembrete = new Date(
            `${lembrete.data}T${lembrete.hora}:00`
        );

        console.log("📅 Data do lembrete:", dataHoraLembrete);
        console.log("⏰ Já passou?", agora >= dataHoraLembrete);

        if (!lembrete.enviado && agora >= dataHoraLembrete) {
            console.log('🔔 Lembrete disparado!');

            try {
                const numeroWhatsApp = lembrete.numeroWhatsApp || process.env.NUMERO_WHATSAPP;

                if (!numeroWhatsApp) {
                    throw new Error('Lembrete sem número de WhatsApp configurado.');
                }

                await enviarMensagemWhatsApp(
                    numeroWhatsApp,
                    `🔔 Lembrete do Mailly:\n\n${lembrete.comentario}`
                );

                lembrete.enviado = true;

            } catch (erro) {
                console.log(`❌ Erro interno da API: ${erro}`);
            }
        }
    }

    console.log('Verificação feita');
}

setInterval(verificarLembretes, 59000);