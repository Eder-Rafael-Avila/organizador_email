import './index.scss'
import { useState, useEffect } from "react";
import { restaurarEmail, arquivarEmails, excluirEmail, marcarComoLido, marcarComoNaoLido, alternarImportante } from '../../utils/acoesEmails'

import Header from '../../components/Header'
import Sidebar from '../../components/Sidebar'
import EmailList from '../../components/EmailList'
import EmailViewer from '../../components/EmailViewer'

export default function Home() {
  
  const [pastaSelecionada, setPastaSelecionada] = useState("Entrada");
  const [emailSelecionado, setEmailSelecionado] = useState(null);
  
  const [emails, setEmails] = useState([]);
  
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
      fetch("http://localhost:7070/emails")
        .then(resposta => resposta.json())
        .then(dados => {
          setEmails(dados);
        });
  }, [])

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
