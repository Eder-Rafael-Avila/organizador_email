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
                {email.remetente}
                <span>{email.lido ? "Lido" : "Não Lido"}</span>
            </h3>
            <span>{email.assunto}</span>
            <p>{email.preview}</p>
        </article>
    );
}
