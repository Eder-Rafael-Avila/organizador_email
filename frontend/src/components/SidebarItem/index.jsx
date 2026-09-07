import './index.scss'

export default function SidebarItem({ nome, icone, quantidade, aoClicar, selecionada }) {

    return (
        <button className={`comp-sidebarItem ${nome === 'Assist AI' ? 'assist-ai' : ''} ${selecionada ? 'selecionada' : ''}`} onClick={aoClicar}>
            <i className={icone} />
            <span>{nome}</span>
            {quantidade !== null && <span className='qtd'>{quantidade}</span>}
        </button>
    )
}