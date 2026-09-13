import whatsapp from "whatsapp-web.js";
import qrcode from "qrcode-terminal";

const { Client, LocalAuth } = whatsapp;

const client = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: {
        headless: false
    }
});

let whatsappPronto = false;

client.on("qr", qr => {
    console.log("📱 Escaneie este QR Code com o WhatsApp:");
    qrcode.generate(qr, { small: true });
});

client.on("authenticated", () => {
    console.log("🔐 WhatsApp autenticado!");
});

client.on("ready", () => {
    whatsappPronto = true;
    console.log("✅ WhatsApp conectado!");
});

client.on("auth_failure", erro => {
    console.error("❌ Falha na autenticação:", erro);
});

export async function enviarMensagemWhatsApp(numero, mensagem) {
    const estado = await client.getState();

    console.log("📱 Estado do WhatsApp:", estado);

    if (estado !== "CONNECTED") {
        throw new Error(`WhatsApp não está conectado. Estado atual: ${estado}`);
    }

    const chatId = `${numero}@c.us`;

    console.log("📱 Enviando para:", chatId);

    await client.sendMessage(
        chatId,
        mensagem,
        {
            waitUntilMsgSent: true
        }
    );

    console.log("📨 Mensagem enviada pelo WhatsApp!");
}

client.initialize();