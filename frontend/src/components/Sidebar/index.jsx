import './index.scss'

import SidebarItem from '../SidebarItem'

export default function Sidebar({ pastaSelecionada, aoSelecionarPasta, emails }) {

    const quantidadePorPasta = nome => {
        if (nome === "Importantes") {
            return emails.filter(email => email.importante).length;
        }

        return emails.filter(email => email.pasta === nome).length;
    };

    const pastas = [
        {
            nome: "Entrada",
            icone: "fa-solid fa-right-to-bracket",
            quantidade: quantidadePorPasta("Entrada")
        },
        {
            nome: "Importantes",
            icone: "fa-solid fa-circle-exclamation",
            quantidade: quantidadePorPasta("Importantes")
        },
        {
            nome: "Arquivados",
            icone: "fa-solid fa-box-archive",
            quantidade: quantidadePorPasta("Arquivados")
        },
        {
            nome: "Lixeira",
            icone: "fa-solid fa-trash",
            quantidade: quantidadePorPasta("Lixeira")
        },
        {
            nome: "Assist AI",
            icone: "fa-solid fa-robot",
            quantidade: null
        }
    ]

    return (
        <aside className='comp-sidebar'>
            <h2> Menu </h2>

            <nav>
                {
                    pastas.map((pasta, pos) => (
                        <SidebarItem 
                            key={pos}
                            nome={pasta.nome}
                            icone={pasta.icone}
                            quantidade={pasta.quantidade}
                            aoClicar={() => aoSelecionarPasta(pasta.nome)}
                            selecionada={pastaSelecionada === pasta.nome}
                        />
                    ))
                }
            </nav>
        </aside>
    );
}