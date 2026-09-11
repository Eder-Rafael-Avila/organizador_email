import './index.scss'
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { restaurarEmail, arquivarEmails, excluirEmail, marcarComoLido, marcarComoNaoLido, alternarImportante, removerArquivado } from '../../utils/acoesEmails'

import Header from '../../components/Header'
import Sidebar from '../../components/Sidebar'
import EmailList from '../../components/EmailList'
import EmailViewer from '../../components/EmailViewer'

export default function Home() {
  
  const [pastaSelecionada, setPastaSelecionada] = useState("Entrada");
  const [emailSelecionado, setEmailSelecionado] = useState(null);
  
  const [emails, setEmails] = useState([]);
  const [carregandoEmails, setCarregandoEmails] = useState(true);
  const [erroEmails, setErroEmails] = useState(false);
  const { search } = useLocation();
  
  const emailsFiltrados = emails.filter(
    email => {
      if (pastaSelecionada === "Importantes") {
        return email.importante === true;
      }
      
      return email.pasta === pastaSelecionada;
  });
    
  const emailAtual = emailsFiltrados.find(
    (email) => email.id === emailSelecionado
  );

  useEffect(() => {
      const controlador = new AbortController();
      let novaTentativa;

      async function carregarEmails() {
          setCarregandoEmails(true);
          setErroEmails(false);

          try {
            const resposta = await fetch(
              "http://localhost:7070/gmail/emails",
              {
                cache: "no-store",
                signal: controlador.signal
              }
            );

            if (!resposta.ok) {
              throw new Error(`Falha ao consultar os e-mails: ${resposta.status}`);
            }

            const dados = await resposta.json();

            if (!Array.isArray(dados)) {
              throw new Error('A API não retornou uma lista de e-mails.');
            }

            setEmails(dados);
          } catch (erro) {
            if (erro.name !== 'AbortError') {
              console.error('Não foi possível carregar os e-mails.', erro);
              setEmails([]);
              setErroEmails(true);
            }
          } finally {
            if (!controlador.signal.aborted) {
              setCarregandoEmails(false);
            }
          }
      }

      carregarEmails();
      window.addEventListener('focus', carregarEmails);
      window.addEventListener('pageshow', carregarEmails);

      if (new URLSearchParams(search).has('contaAtualizada')) {
        novaTentativa = window.setTimeout(carregarEmails, 500);
      }

      return () => {
        controlador.abort();
        window.removeEventListener('focus', carregarEmails);
        window.removeEventListener('pageshow', carregarEmails);
        window.clearTimeout(novaTentativa);
      };
  }, [search]);

  return (
      <div className='page-home'>
          <Header />

          <div className='layout'>
            <Sidebar 
              pastaSelecionada={pastaSelecionada}
              aoSelecionarPasta={setPastaSelecionada}
              emails={emails}
            />

            <main aria-busy={carregandoEmails}>
              {erroEmails && (
                <p role='alert'>Não foi possível carregar os e-mails da conta conectada.</p>
              )}

              <div className='email-layout'>

                <EmailList 
                  aoSelecionarEmail={setEmailSelecionado}
                  emails={emailsFiltrados}
                  todosOsEmails={emails}
                  setEmails={setEmails}
                  emailSelecionado={emailSelecionado}
                  aoMarcarComoLido={marcarComoLido}
                  pastaSelecionada={pastaSelecionada}
                />

                <EmailViewer 
                  email={emailAtual}
                  aoArquivar={arquivarEmails}
                  aoRemoverArquivado={removerArquivado}
                  aoExcluir={excluirEmail}
                  aoRestaurar={restaurarEmail}
                  aoMarcarComoNaoLido={marcarComoNaoLido}
                  aoAlternarImportante={alternarImportante}
                  emails={emails}
                  setEmails={setEmails}
                  pastaSelecionada={pastaSelecionada}
                />
              </div>
            </main>
          </div>
      </div>
  )
}
