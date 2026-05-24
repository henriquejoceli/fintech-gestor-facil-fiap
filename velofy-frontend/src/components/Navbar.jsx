import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Landmark, TrendingUp, ArrowRightLeft, Bell, User, LogOut } from 'lucide-react';

export function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };

  // Estilo base para as abas do menu
  const linkStyle = (path) => ({
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    color: location.pathname === path ? '#00e676' : '#aaa',
    textDecoration: 'none',
    fontSize: '14px',
    fontWeight: '500',
    padding: '8px 12px',
    borderRadius: '6px',
    backgroundColor: location.pathname === path ? 'rgba(0, 230, 118, 0.05)' : 'transparent',
    transition: 'all 0.2s'
  });

  return (
    <nav style={{ backgroundColor: '#0f0f0f', borderBottom: '1px solid #1f1f1f', padding: '0 24px', height: '64px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      
      {/* LOGO VELOFY */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <span style={{ color: '#00e676', fontSize: '20px', fontWeight: '800', letterSpacing: '0.5px' }}>Velofy</span>
      </div>

      {/* LINKS DA BARRA SUPERIOR ATUALIZADOS */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        
        {/* Início / Dashboard */}
        <Link to="/dashboard" style={linkStyle('/dashboard')}>
          <LayoutDashboard size={16} />
          Início
        </Link>

        {/* Contas */}
        <Link to="/contas" style={linkStyle('/contas')}>
          <Landmark size={16} />
          Contas
        </Link>

        {/* Investimentos */}
        <Link to="/investimentos" style={linkStyle('/investimentos')}>
          <TrendingUp size={16} />
          Investimentos
        </Link>

        {/* Transações */}
        <Link to="/transacoes" style={linkStyle('/transacoes')}>
          <ArrowRightLeft size={16} />
          Transações
        </Link>

        {/* Notificações */}
        <Link to="/notificacoes" style={linkStyle('/notificacoes')}>
          <Bell size={16} />
          Notificações
        </Link>

        {/* Perfil */}
        <Link to="/perfil" style={linkStyle('/perfil')}>
          <User size={16} />
          Meu Perfil
        </Link>

      </div>

      {/* SEÇÃO USUÁRIO / SAIR */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        
        <button 
          onClick={handleLogout}
          style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '6px', 
            backgroundColor: 'transparent', 
            border: '1px solid #222', 
            color: '#ef4444', 
            padding: '6px 12px', 
            borderRadius: '6px', 
            fontSize: '13px', 
            fontWeight: '600', 
            cursor: 'pointer',
            transition: 'all 0.2s'
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(239, 68, 68, 0.05)';
            e.currentTarget.style.borderColor = '#ef4444';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.backgroundColor = 'transparent';
            e.currentTarget.style.borderColor = '#222';
          }}
        >
          <LogOut size={14} />
          Sair
        </button>
      </div>

    </nav>
  );
}