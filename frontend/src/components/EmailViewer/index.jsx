import './index.scss'

export default function EmailViewer({ email }) {

    if (!email) {
        return (
            <section className='comp-emailViewer'>
                <div id='nenhumEmail'>
                    <p id='selectEmail'>selecione um e-mail para visualizar</p>
                </div>
            </section>
        );
    }

    return (
        <section className='comp-emailViewer'>
            <div className='email-header'>
                <h2>{email.assunto}</h2>
            </div>

            <div className='email-remetente'>
                <h3>{email.remetente}</h3>
                <p>{email.data}</p>
            </div>

            <div className='email-content'>
                <p>
                    {email.conteudo}
                </p>
            </div>
        </section>
    );
}