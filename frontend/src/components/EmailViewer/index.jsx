import './index.scss'

export default function EmailViewer({ email }) {

    if (!email) {
        return (
            <section className='comp-emailViewer'>
                <p>selecione um e-mail para visualizar</p>
            </section>
        );
    }

    return (
        <section className='comp-emailViewer'>
            <div>
                <p><i>{email.remetente}</i></p>
                <h2>{email.assunto}</h2>
                <span>{email.preview}</span>
            </div>
        </section>
    );
}