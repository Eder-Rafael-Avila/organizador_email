import { BrowserRouter, Routes, Route } from 'react-router-dom';

import ErrorPage from './pages/ErrorPage';
import Home from './pages/Home'

export default function Router() {
    return ( 
        <BrowserRouter>
            <Routes>
                <Route path='/' element={ <Home /> } />

                <Route path='*' element={ <ErrorPage /> } />
            </Routes>
        </BrowserRouter>
    )
}