import "./index.scss";

export default function EmailItem({ email, aoClicar, selecionado }) {
    return (
        <article
            className={`comp-emailItem
                            ${selecionado ? "selecionado" : ""} 
                            ${!email.lido ? "nao-lido" : ""}`}
            onClick={aoClicar}
        >
            <h3>
                <span className='remetente'>
                    <strong>{email.remetente}</strong>
                    {email.remetenteEmail && <small>{email.remetenteEmail}</small>}
                </span>
                <span className='status'>{email.lido ? "Lido" : "Não Lido"}</span>
            </h3>
            <span>{email.assunto}</span>
            <p>{email.preview}</p>
        </article>
    );
}
