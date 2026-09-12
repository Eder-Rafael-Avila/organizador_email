import './index.scss';
import Logo from '../../assets/logo.png';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

export default function Header() {

    const [conta, setConta] = useState(null);
    const [carregandoConta, setCarregandoConta] = useState(true);
    const [erroConta, setErroConta] = useState(false);
    const { search } = useLocation();

    useEffect(() => {
        const controlador = new AbortController();
        let novaTentativa;

        async function carregarConta() {
            setCarregandoConta(true);
            setErroConta(false);

            try {
                const resposta = await fetch(
                    "http://localhost:7070/auth/google/conta",
                    {
                        cache: "no-store",
                        signal: controlador.signal
                    }
                );

                if (!resposta.ok) {
                    throw new Error(`Falha ao consultar a conta: ${resposta.status}`);
                }

                const dados = await resposta.json();
                setConta(dados);

            } catch (erro) {
                if (erro.name !== 'AbortError') {
                    console.error(
                        'Não foi possível carregar a conta conectada.',
                        erro
                    );

                    setConta({
                        conectado: false,
                        email: null
                    });

                    setErroConta(true);
                }

            } finally {
                if (!controlador.signal.aborted) {
                    setCarregandoConta(false);
                }
            }
        }

        carregarConta();

        if (new URLSearchParams(search).has('contaAtualizada')) {
            novaTentativa = window.setTimeout(carregarConta, 500);
        }

        return () => {
            controlador.abort();
            window.clearTimeout(novaTentativa);
        };
    }, [search]);

    return (
        <header className='comp-header'>
            <div className='imagem'>
                <img src={Logo} />
            </div>

            <div className='slogan'>
                <h1>Mailly</h1>
                <p>Organize seus e-mails. Simplifique seu dia.</p>
            </div>

            <div className='conta'>
                {carregandoConta && <span className='conta-mensagem'>Verificando conta...</span>}

                {!carregandoConta && conta?.conectado && (
                    <>
                        <div className='conta-identidade'>
                            <span className='conta-avatar' aria-hidden='true'>
                                {conta.email?.charAt(0).toUpperCase()}
                            </span>
                            <div className='conta-detalhes'>
                                <span className='conta-status'>Conta conectada</span>
                                <p title={conta.email}>{conta.email}</p>
                            </div>
                        </div>

                        <button onClick={() => {
                            window.location.href = "http://localhost:7070/auth/google/logout";
                        }} aria-label='Trocar conta Google'>
                            <span aria-hidden='true'>↻</span>
                            <span>Trocar de conta</span>
                        </button>
                    </>
                )}

                {!carregandoConta && !conta?.conectado && (
                    <span className='conta-mensagem'>
                        {erroConta ? 'Conta indisponível' : 'Nenhuma conta conectada'}
                    </span>
                )}

            </div>
        </header>
    );
}