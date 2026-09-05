import './index.scss'

import EmailItem from '../EmailItem'

export default function EmailList() {

    const emails = [
        {
        id: 1,
        remetente: "Google",
        assunto: "Seu relatório mensal está disponível",
        preview: "Confira as novidades e informações da sua conta..."
        },
        {
        id: 2,
        remetente: "FREI",
        assunto: "Avisos importantes do curso",
        preview: "Temos algumas informações importantes para você..."
        },
        {
        id: 3,
        remetente: "Netflix",
        assunto: "Novidades que você pode gostar",
        preview: "Confira os lançamentos desta semana..."
        }
    ];

    return (
        <section className='comp-emailList'>
            <h2>Seus e-mails</h2>

            {
                emails.map((email, pos) => (
                    <EmailItem
                        key={pos}
                        remetente={email.remetente}
                        assunto={email.assunto}
                        preview={email.preview}
                    />
                ))
            }
            
        </section>
    );
}