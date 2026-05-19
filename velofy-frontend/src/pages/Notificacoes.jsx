import React, { useState, useEffect } from 'react';
import { Bell, ShieldAlert, CheckCircle, Info, Clock, Trash2, Filter, Key, UserCheck, AlertTriangle, ArrowRightLeft, TrendingUp } from 'lucide-react';
import api from '../services/api';
import { Navbar } from '../components/Navbar.jsx';
import { Footer } from '../components/Footer.jsx';

export function Notificacoes() {
  const [notificacoes, setNotificacoes] = useState([]);
  const [filtro, setFiltro] = useState('todas');
  const [loading, setLoading] = useState(true);

  const MAPA_OCORRENCIAS = {
    1: { categoria: 'seguranca', titulo: 'Alteração de Senha', icone: <Key size={20} color="#3b82f6" />, cor: '#3b82f6' },
    2: { categoria: 'seguranca', titulo: 'Tentativa de Login', icone: <UserCheck size={20} color="#3b82f6" />, cor: '#3b82f6' },
    3: { categoria: 'seguranca', titulo: 'Manutenção Cadastral', icone: <UserCheck size={20} color="#3b82f6" />, cor: '#3b82f6' },
    4: { categoria: 'sistema', titulo: 'Erro de Integração', icone: <AlertTriangle size={20} color="#ef4444" />, cor: '#ef4444' },
    5: { categoria: 'sistema', titulo: 'Ocorrência Manual', icone: <Info size={20} color="#94a3b8" />, cor: '#94a3b8' },
    6: { categoria: 'financeiro', titulo: 'Nova Transação', icone: <ArrowRightLeft size={20} color="#00e676" />, cor: '#00e676' },
    7: { categoria: 'financeiro', titulo: 'Novo Investimento', icone: <TrendingUp size={20} color="#00e676" />, cor: '#00e676' },
    8: { categoria: 'financeiro', titulo: 'Ajuste de Transação', icone: <ArrowRightLeft size={20} color="#f59e0b" />, cor: '#f59e0b' },
    9: { categoria: 'financeiro', titulo: 'Ajuste de Investimento', icone: <TrendingUp size={20} color="#f59e0b" />, cor: '#f59e0b' },
  };

  useEffect(() => {
    async function carregarNotificacoes() {
      try {
        // Puxa o usuário logado de forma unificada
        const usuarioLogado = JSON.parse(localStorage.getItem('@Velofy:user') || '{}');
        const idUsuario = usuarioLogado.id || 1;
        
        // 🎯 MELHORIA: Busca os logs diretamente atrelados ao Usuário logado
        const respostaLogs = await api.get(`/ocorrencias-cadastro/usuario/${idUsuario}`);
        
        const logsFormatados = respostaLogs.data.map(log => {
          const idTipo = log.tipoOcorrenciaCadastro?.id;
          // Pega as configurações do mapa, ou assume um padrão caso venha um ID novo
          const config = MAPA_OCORRENCIAS[idTipo] || {
            categoria: 'outros',
            titulo: log.tipoOcorrenciaCadastro?.descricao || 'Notificação',
            icone: <Info size={20} color="#94a3b8" />,
            cor: '#94a3b8'
          };

          return {
            id: log.id,
            categoria: config.categoria,
            titulo: config.titulo,
            mensagem: log.descricao,
            data: new Date(log.dataCadastro).toLocaleString('pt-BR'),
            icone: config.icone,
            corBorda: config.cor
          };
        });

        // Ordena para que os logs mais recentes (maior ID ou data) fiquem no topo
        setNotificacoes(logsFormatados.reverse());
      } catch (err) {
        console.error("Erro ao carregar logs de auditoria/notificações", err);
      } finally {
        setLoading(false);
      }
    }

    carregarNotificacoes();
  }, []);

  const limparNotificacao = async (id) => {
    try {
      // Endpoint opcional para deletar no Java se achar necessário:
      // await api.delete(`/ocorrencias-cadastro/${id}`);
      setNotificacoes(notificacoes.filter(n => n.id !== id));
    } catch (err) {
      console.error("Erro ao deletar notificação", err);
    }
  };

  // Filtra as notificações com base no select da tela
  const notificacoesFiltradas = filtro === 'todas' 
    ? notificacoes 
    : notificacoes.filter(n => n.categoria === filtro);

  return (
    <div style={{ backgroundColor: '#0a0a0a', minHeight: '100vh', display: 'flex', flexDirection: 'column', fontFamily: 'sans-serif' }}>
      <Navbar />

      <div style={{ padding: '32px 24px', boxSizing: 'border-box', flex: 1, maxWidth: '900px', margin: '0 auto', width: '100%', color: '#fff' }}>
        
        {/* HEADER INTERNO COM FILTROS AVANÇADOS */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <Bell size={24} color="#00e676" />
            <h1 style={{ margin: 0, fontSize: '22px', fontWeight: '700' }}>Central de Segurança e Atividades</h1>
          </div>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Filter size={16} color="#666" />
            <select 
              value={filtro}
              onChange={(e) => setFiltro(e.target.value)}
              style={{ padding: '8px 12px', borderRadius: '8px', border: '1px solid #2a2a2a', backgroundColor: '#141414', color: '#fff', fontSize: '14px', outline: 'none', cursor: 'pointer' }}
            >
              <option value="todas">Todas as Atividades</option>
              <option value="seguranca">Acessos e Segurança</option>
              <option value="financeiro">Movimentações Financeiras</option>
              <option value="sistema">Alertas do Sistema</option>
            </select>
          </div>
        </div>

        {/* LISTA DE CARDS */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {loading ? (
            <div style={{ textAlign: 'center', padding: '48px 0', color: '#666' }}>Sincronizando feed de auditoria...</div>
          ) : notificacoesFiltradas.length > 0 ? (
            notificacoesFiltradas.map((n) => (
              <div 
                key={n.id} 
                style={{ 
                  display: 'flex', 
                  gap: '16px', 
                  padding: '20px', 
                  borderRadius: '12px', 
                  backgroundColor: '#0f0f0f', 
                  border: `1px solid #1f1f1f`,
                  borderLeft: `4px solid ${n.corBorda}`,
                  boxShadow: '0 4px 6px -1px rgba(0,0,0,0.2)',
                  alignItems: 'start',
                  transition: 'transform 0.2s ease'
                }}
              >
                <div style={{ marginTop: '2px' }}>{n.icone}</div>

                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                    <h3 style={{ margin: 0, fontSize: '15px', color: '#fff', fontWeight: '600' }}>{n.titulo}</h3>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#666', fontSize: '12px' }}>
                      <Clock size={12} />
                      {n.data}
                    </div>
                  </div>
                  <p style={{ margin: 0, fontSize: '14px', color: '#aaa', lineHeight: '1.5' }}>{n.mensagem}</p>
                </div>

                <button 
                  onClick={() => limparNotificacao(n.id)}
                  style={{ background: 'none', border: 'none', color: '#444', cursor: 'pointer', padding: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '50%' }}
                  onMouseOver={(e) => e.currentTarget.style.color = '#ef4444'}
                  onMouseOut={(e) => e.currentTarget.style.color = '#444'}
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))
          ) : (
            <div style={{ textAlign: 'center', padding: '64px 0', color: '#666', backgroundColor: '#0f0f0f', borderRadius: '12px', border: '1px solid #1f1f1f' }}>
              <Bell size={40} style={{ marginBottom: '12px', opacity: 0.15, margin: '0 auto' }} />
              <p style={{ margin: 0, fontSize: '14px' }}>Nenhum log cadastrado para esta categoria.</p>
            </div>
          )}
        </div>

        <p style={{ textAlign: 'center', marginTop: '40px', fontSize: '11px', color: '#444' }}>
          Barramento de auditoria em conformidade com as diretrizes de segurança de dados do Velofy.
        </p>
      </div>

      <Footer />
    </div>
  );
}