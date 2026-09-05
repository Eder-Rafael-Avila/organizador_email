import './index.scss'

import Header from '../../components/Header'
import Sidebar from '../../components/Sidebar'
import EmailList from '../../components/EmailList'

export default function Home() {

  return (
      <div className='page-home'>
          <Header />

          <div className='layout'>
            <Sidebar />

            <main>
              <EmailList />
            </main>
          </div>
      </div>
  )
}
