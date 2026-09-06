import './index.scss'

import SidebarItem from '../SidebarItem'

export default function Sidebar({ pastaSelecionada, aoSelecionarPasta }) {

    const pastas = [
        {
            nome: "Entrada",
            icone: "fa-solid fa-right-to-bracket",
            quantidade: 1
        },
        {
            nome: "Importantes",
            icone: "fa-solid fa-circle-exclamation",
            quantidade: 2
        },
        {
            nome: "Arquivados",
            icone: "fa-solid fa-box-archive",
            quantidade: 5
        },
        {
            nome: "Lixeira",
            icone: "fa-solid fa-trash",
            quantidade: 4
        },
        {
            nome: "Assist AI",
            icone: "fa-solid fa-robot",
            quantidade: ""
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