import OpenAI from 'openai';

const ai = new OpenAI({
    baseURL: "https://openrouter.ai/api/v1",
    apiKey: process.env.OPENROUTER_API_KEY
});

export async function assistirAi(req, res) {

    const mensagem = req.body.mensagem;

    console.log("mensagem recebida: " + mensagem);

    const resposta = await ai.chat.completions.create({
        model: "google/gemini-2.5-flash",
        max_completion_tokens: 1000,
        messages: [
            {
                role: "user",
                content: mensagem
            }
        ]
    });

    console.log(resposta.choices[0].message.content);

    res.json({
        resposta: resposta.choices[0].message.content
    })
}