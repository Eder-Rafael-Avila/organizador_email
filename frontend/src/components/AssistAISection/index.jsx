import './index.scss'

export default function AssistAiSection() {
    return (
        <section className='comp-assistSection'>
            <h2>Seu assistente AI</h2>

            <div className='chat-area'>
                <div className='text-bar'>
                    <input type="text" placeholder='Quais são minhas tarefas da semana?' />
                    <button>
                        Enviar
                    </button>
                </div>
            </div>
        </section>
    )
}