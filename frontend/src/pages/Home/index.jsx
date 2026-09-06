import './index.scss'
import { useState } from "react";
import { restaurarEmail, arquivarEmails, excluirEmail, marcarComoLido, marcarComoNaoLido, alternarImportante } from '../../utils/acoesEmails'

import Header from '../../components/Header'
import Sidebar from '../../components/Sidebar'
import EmailList from '../../components/EmailList'
import EmailViewer from '../../components/EmailViewer'

export default function Home() {
  
  const [pastaSelecionada, setPastaSelecionada] = useState("Entrada");
  const [emailSelecionado, setEmailSelecionado] = useState(null);
  
  const [emails, setEmails] = useState([
    {
      id: 1,
      remetente: "Google",
      assunto: "Seu relatório mensal está disponível",
      preview: "Confira as novidades e informações da sua conta...",
      conteudo: "Olá! Seu relatório mensal já está disponível. Acesse sua conta para conferir todas as informações.",
      data: "05/09/2026",
      lido: false,
      importante: true,
      pasta: "Entrada",
      pastaAnterior: null
    },
    {
      id: 2,
      remetente: "FREI",
      assunto: "Avisos importantes do curso",
      preview: "Temos algumas informações importantes para você...",
      conteudo: "Olá! A feira de profissões 2026 está chegando e nós o aguardamos com muito carinho!",
      data: "05/09/2026",
      lido: false,
      importante: true,
      pasta: "Entrada",
      pastaAnterior: null
    },
    {
      id: 3,
      remetente: "Netflix",
      assunto: "Novidades que você pode gostar",
      preview: "Confira os lançamentos desta semana...",
      conteudo: "Devoradores de estrelas, Toy Story 5, só filme bao",
      data: "05/09/2026",
      lido: true,
      importante: false,
      pasta: "Arquivados",
      pastaAnterior: null
    }
  ]);
  
  const emailsFiltrados = emails.filter(
    email => {
      if (pastaSelecionada === "Importantes") {
        return email.importante === true;
      }
  
      return email.pasta === pastaSelecionada;
    }
  );
  
  const emailAtual = emailsFiltrados.find(
    (email) => email.id === emailSelecionado
  );

  return (
      <div className='page-home'>
          <Header />

          <div className='layout'>
            <Sidebar 
              pastaSelecionada={pastaSelecionada}
              aoSelecionarPasta={setPastaSelecionada}
            />

            <main>
              <div className='email-layout'>

                <EmailList 
                  aoSelecionarEmail={setEmailSelecionado}
                  emails={emailsFiltrados !== null ? emailsFiltrados : null}
                  setEmails={setEmails}
                  emailSelecionado={emailSelecionado}
                  aoMarcarComoLido={marcarComoLido}
                  pastaSelecionada={pastaSelecionada}
                />

                <EmailViewer 
                  email={emailAtual}
                  aoArquivar={arquivarEmails}
                  aoExcluir={excluirEmail}
                  aoRestaurar={restaurarEmail}
                  aoMarcarComoNaoLido={marcarComoNaoLido}
                  aoAlternarImportante={alternarImportante}
                  emails={emails}
                  setEmails={setEmails}
                />
              </div>
            </main>
          </div>
      </div>
  )
}
