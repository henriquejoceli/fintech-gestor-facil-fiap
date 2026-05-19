import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Login } from './pages/Login';
import { Cadastro } from './pages/Cadastro';
import { Dashboard } from './pages/Dashboard';
import { TransacoesGlobal } from './pages/TransacoesGlobal';
import { Perfil } from './pages/Perfil';
import { RecuperarSenha } from './pages/RecuperarSenha';
import Contas from './pages/Contas';
import Notificacoes from './pages/Notificacoes';
import Investimentos from './pages/Investimentos';
import { NotFound } from './pages/NotFound';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/recuperar-senha" element={<RecuperarSenha />} />
                <Route path="/cadastro" element={<Cadastro />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/contas" element={<Contas />} />
                <Route path="/transacoes" element={<TransacoesGlobal />} />
                <Route path="/perfil" element={<Perfil />} />
                <Route path="/notificacoes" element={<Notificacoes />} />
                <Route path="/investimentos" element={<Investimentos />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </Router>
    );
}

export default App;