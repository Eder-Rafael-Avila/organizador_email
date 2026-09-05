import './index.scss'

export default function EmailItem({ remetente, assunto, preview }) {

    return (
        <div className='comp-emailItem'>
            <h3><strong>{remetente}</strong></h3>
            <span>{assunto}</span>
            <p>{preview}</p>
        </div>
    );
}