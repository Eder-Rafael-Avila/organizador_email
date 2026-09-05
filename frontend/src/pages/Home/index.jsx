import './index.scss'
import { useState } from "react";

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
      data: "05/09/2026",
      lido: false,
      pasta: "Entrada"
    },
    {
      id: 2,
      remetente: "FREI",
      assunto: "Avisos importantes do curso",
      preview: "Temos algumas informações importantes para você...",
      data: "05/09/2026",
      lido: false,
      pasta: "Importantes"
    },
    {
      id: 3,
      remetente: "Netflix",
      assunto: "Novidades que você pode gostar",
      preview: "Confira os lançamentos desta semana...",
      data: "05/09/2026",
      lido: true,
      pasta: "Arquivados"
    }
  ]);
  
  const emailsFiltrados = emails.filter(
    (email) => email.pasta === pastaSelecionada
  );
  
  const emailAtual = emailsFiltrados.find(
    (email) => email.id === emailSelecionado
  );

  function marcarComoLido(id) {
    setEmails(
      emails.map(email => {
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
                  emailSelecionado={emailSelecionado}
                  aoMarcarComoLido={marcarComoLido}
                />

                <EmailViewer email={emailAtual} />
              </div>
            </main>
          </div>
      </div>
  )
}
