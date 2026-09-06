import './index.scss'

import EmailItem from '../EmailItem'
import AssistAiSection from '../AssistAISection'

export default function EmailList({ aoSelecionarEmail, emails, emailSelecionado, aoMarcarComoLido, pastaSelecionada }) {

    if (pastaSelecionada === "Assist AI") {
        return (
            <AssistAiSection />
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
                            aoMarcarComoLido(email.id)
                        }}
                        selecionado={emailSelecionado === email.id}
                    />
                )))
            }

        </section>
    );
}