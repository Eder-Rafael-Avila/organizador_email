import './index.scss'

import EmailItem from '../EmailItem'
import AssistAiSection from '../AssistAISection'

export default function EmailList({ 
    aoSelecionarEmail,
    emails,
    todosOsEmails,
    setEmails,
    emailSelecionado,
    aoMarcarComoLido,
    pastaSelecionada }) {

    if (pastaSelecionada === "Assist AI") {
        return (
            <AssistAiSection 
                emails={todosOsEmails}
            />
        )
    }

    return (
        <section className='comp-emailList'>
            <h2>Seus e-mails</h2>

            {
                emails.length === 0 ? (
                    <p><i>Não há e-mails aqui.</i></p>
                ) : (
                emails.map(email => (
                    <EmailItem
                        key={email.id}
                        email={email}
                        aoClicar={() => {
                            aoSelecionarEmail(email.id)
                            aoMarcarComoLido(email.id, setEmails, emails)
                        }}
                        selecionado={emailSelecionado === email.id}
                    />
                )))
            }

        </section>
    );
}