import './index.scss'

export default function SidebarItem({ nome, icone, quantidade, aoClicar, selecionada }) {

    return (
        <button className={`comp-sidebarItem ${selecionada ? 'selecionada' : ''}`} onClick={aoClicar}>
            <i className={icone} />
            <span>{nome}</span>
            <span>{quantidade}</span>
        </button>
    )
}