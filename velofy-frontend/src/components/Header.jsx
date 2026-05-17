import { Link, useNavigate } from 'react-router-dom';
import { CreditCard, TrendingUp, Bell, User, LogOut } from 'lucide-react';

export function Header() {
  const navigate = useNavigate();
  const usuarioLogado = JSON.parse(localStorage.getItem('@Velofy:user') || '{}');

  const handleLogout = () => {
    localStorage.removeItem('@Velofy:user');
    navigate('/');
  };

  return (
    <header style={styles.header}>
      <div style={styles.navContainer}>
        <Link to="/dashboard" style={styles.logo}>Velofy</Link>
        <div style={styles.menuLinks}>
          <Link to="/dashboard" style={styles.link}><CreditCard size={18} /> Contas</Link>
          <Link to="/investimentos" style={styles.link}><TrendingUp size={18} /> Investimentos</Link>
          <Link to="/notificacoes" style={styles.link}><Bell size={18} /> Notificações</Link>
          <Link to="/perfil" style={styles.link}><User size={18} /> Meu Perfil</Link>
        </div>
      </div>
      <div style={styles.userSection}>
        <span style={styles.username}>Olá, {usuarioLogado.nome?.split(' ')[0] || 'Usuário'}</span>
        <button onClick={handleLogout} style={styles.btnLogout}>
          <LogOut size={16} /> Sair
        </button>
      </div>
    </header>
  );
}

const styles = {
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: 'var(--bg-card)', padding: '0 40px', height: '70px', borderBottom: '1px solid var(--borda)' },
  navContainer: { display: 'flex', alignItems: 'center', gap: '40px' },
  logo: { color: 'var(--verde-velofy)', fontSize: '24px', fontWeight: 'bold', textDecoration: 'none', letterSpacing: '-0.5px' },
  menuLinks: { display: 'flex', gap: '25px' },
  link: { color: 'var(--texto-secundario)', textDecoration: 'none', fontWeight: '500', fontSize: '15px', display: 'flex', alignItems: 'center', gap: '8px', transition: 'color 0.2s' },
  userSection: { display: 'flex', alignItems: 'center', gap: '20px' },
  username: { color: 'var(--texto-secundario)', fontSize: '14px' },
  btnLogout: { display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 16px', backgroundColor: 'transparent', color: 'var(--erro)', border: '1px solid var(--erro)', borderRadius: '20px', cursor: 'pointer', fontWeight: 'bold', fontSize: '14px', transition: 'all 0.2s' }
};