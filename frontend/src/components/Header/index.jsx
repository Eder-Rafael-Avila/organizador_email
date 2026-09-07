import './index.scss'
import Logo from '../../assets/logo.png'

export default function Header() {

    return (
        <header className='comp-header'>
            <div className='imagem'>
                <img src={Logo} />
            </div>

            <div className='slogan'>
                <h1>Mailly</h1>
                <p>Organize seus e-mails. Simplifique seu dia.</p>
            </div>
        </header>
    );
}