export function marcarComoLido(id, setEmails) {
    setEmails(emailsAtuais =>
        emailsAtuais.map(email => {
        if (email.id === id) {
            return {
            ...email,
            lido: true
            };
        }
        
        return email;
        })
    )
}

export function marcarComoNaoLido(id, setEmails) {
    setEmails(emailsAtuais =>
        emailsAtuais.map(email => {
            if (email.id === id) {
                return {
                    ...email,
                    lido: false
                }
            }

            return email;
        })
    )
}

export function excluirEmail(id, setEmails) {
    setEmails(emailsAtuais =>
        emailsAtuais.map(email => {
        if(email.id === id) {
            return {
            ...email,
            importante: false,
            pastaAnterior: email.pasta,
            pasta: "Lixeira"
            };
        }

        return email;
        })
    )
}

export function restaurarEmail(id, setEmails) {
    setEmails(emailsAtuais =>
        emailsAtuais.map(email => {
        if (email.id === id) {
            return {
            ...email,
            pastaAnterior: null,
            pasta: email.pastaAnterior
            };
        }

        return email;
        })
    )
}

export function removerArquivado(id, setEmails) {
    setEmails(emailsAtuais => 
        emailsAtuais.map(email => {
            if (email.id === id) {
                return {
                    ...email,
                    pastaAnterior: null,
                    pasta: email.pastaAnterior
                }
            }

            return email;
        })
    )
}

export function arquivarEmails(id, setEmails) {
    setEmails(emailsAtuais =>
        emailsAtuais.map(email => {
        if (email.id === id) {
            return {
            ...email,
            pastaAnterior: email.pasta,
            pasta: "Arquivados"
            };
        }

        return email;
        })
    )
}

export function alternarImportante(id, setEmails) {
    setEmails(emailsAtuais =>
        emailsAtuais.map(email => {
            if (email.id === id) {
                return {
                    ...email,
                    importante: !email.importante
                };
            }

            return email;
        })
    );
}