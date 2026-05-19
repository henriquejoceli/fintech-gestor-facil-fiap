import React, { useState, useEffect } from 'react';
import { Bell, Clock, Trash2, Filter, Key, UserCheck, AlertTriangle, ArrowRightLeft, TrendingUp, Info, Wallet } from 'lucide-react';
import api from '../services/api';
import { Navbar } from '../components/Navbar.jsx';
import { Footer } from '../components/Footer.jsx';

export function Notificacoes() {
  const [notificacoes, setNotificacoes] = useState([]);
  const [filtro, setFiltro] = useState('todas');
  const [loading, setLoading] = useState(true);

  // 🎯 AGORA O MAPA USA A LETRA DO TIPO COMO CHAVE! Muito mais seguro.
  const CONFIG_VISUAL_POR_TIPO = {
    'C': { icone: <Key size={20} color="#3b82f6" />, cor: '#3b82f6' },
    'F': { icone: <ArrowRightLeft size={20} color="#00e676" />, cor: '#00e676' },
    'M': { icone: <Info size={20} color="#94a3b8" />, cor: '#94a3b8' },
    'S': { icone: <AlertTriangle size={20} color="#ef4444" />, cor: '#ef4444' },
    'X': { icone: <Wallet size={20} color="#a855f7" />, cor: '#a855f7' }
  };

  useEffect(() => {
    async function carregarNotificacoes() {
      try {
        const usuarioLogado = JSON.parse(localStorage.getItem('@Velofy:user') || '{}');
        const idUsuario = usuarioLogado.id || 1;
        
        // 1. Busca as contas do usuário
        const respostaContas = await api.get(`/contas/usuario/${idUsuario}`);
        const listaContas = respostaContas.data;

        if (listaContas.length > 0) {
          const idContaPrincipal = listaContas[0].id;
          
          // 2. Busca os logs da conta
          const respostaLogs = await api.get(`/api/ocorrencias-cadastro/conta/${idContaPrincipal}`);
          const dadosLogs = Array.isArray(respostaLogs.data) ? respostaLogs.data : [];
          
          const logsFormatados = dadosLogs.map(log => {
            // Pegamos a letra do tipo ('C', 'F', 'X', etc.) que vem direto do Java
            const letraTipo = log.tipoOcorrenciaCadastro?.tipo || 'M';
            
            // Pega o visual correspondente àquela letra
            const visual = CONFIG_VISUAL_POR_TIPO[letraTipo] || CONFIG_VISUAL_POR_TIPO['M'];

            // Formata o título bonitinho: Se for tudo maiúsculo do banco, transforma em Capitalizado
            const tituloFormatado = log.tipoOcorrenciaCadastro?.descricao 
              ? log.tipoOcorrenciaCadastro.descricao.charAt(0) + log.tipoOcorrenciaCadastro.descricao.slice(1).toLowerCase()
              : 'Notificação do Sistema';

            return {
              id: log.id,
              categoria: letraTipo, // Vincula a categoria à letra ('C', 'F', etc.) para o filtro do select funcionar
              titulo: tituloFormatado,
              mensagem: log.descricao,
              data: log.dataCadastro ? new Date(log.dataCadastro).toLocaleString('pt-BR') : 'Agora',
              icone: visual.icone,
              corBorda: visual.cor
            };
          });

          setNotificacoes(logsFormatados.reverse()); // Mais novos no topo
        } else {
          setNotificacoes([]);
        }
      } catch (err) {
        console.error("Erro ao carregar notificações", err);
      } finally {
        setLoading(false);
      }
    }

    carregarNotificacoes();
  }, []);

  const limparNotificacao = (id) => {
    setNotificacoes(notificacoes.filter(n => n.id !== id));
  };

  const notificacoesFiltradas = filtro === 'todas' 
    ? notificacoes 
    : notificacoes.filter(n => n.categoria === filtro);

  return (
    <div style={{ backgroundColor: '#0a0a0a', minHeight: '100vh', display: 'flex', flexDirection: 'column', fontFamily: 'sans-serif' }}>
      <Navbar />

      <div style={{ padding: '32px 24px', boxSizing: 'border-box', flex: 1, maxWidth: '900px', margin: '0 auto', width: '100%', color: '#fff' }}>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <Bell size={24} color="#00e676" />
            <h1 style={{ margin: 0, fontSize: '22px', fontWeight: '700' }}>Histórico de Atividades</h1>
          </div>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Filter size={16} color="#666" />
            <select 
              value={filtro}
              onChange={(e) => setFiltro(e.target.value)}
              style={{ padding: '8px 12px', borderRadius: '8px', border: '1px solid #2a2a2a', backgroundColor: '#141414', color: '#fff', fontSize: '14px', outline: 'none', cursor: 'pointer' }}
            >
              <option value="todas">Todas as Atividades</option>
              <option value="C">Segurança e Cadastro</option>
              <option value="X">Gestão de Carteiras / Contas</option> {/* 🎯 FILTRO ADICIONADO */}
              <option value="F">Movimentações Financeiras</option>
              <option value="S">Alertas de Sistema</option>
            </select>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {loading ? (
            <div style={{ textAlign: 'center', padding: '48px 0', color: '#666' }}>Sincronizando feed...</div>
          ) : notificacoesFiltradas.length > 0 ? (
            notificacoesFiltradas.map((n) => (
              <div 
                key={n.id} 
                style={{ 
                  display: 'flex', gap: '16px', padding: '20px', borderRadius: '12px', 
                  backgroundColor: '#0f0f0f', border: `1px solid #1f1f1f`, borderLeft: `4px solid ${n.corBorda}`,
                  boxShadow: '0 4px 6px -1px rgba(0,0,0,0.2)', alignItems: 'start'
                }}
              >
                <div style={{ marginTop: '2px' }}>{n.icone}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                    <h3 style={{ margin: 0, fontSize: '15px', color: '#fff', fontWeight: '600' }}>{n.titulo}</h3>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#666', fontSize: '12px' }}>
                      <Clock size={12} /> {n.data}
                    </div>
                  </div>
                  <p style={{ margin: 0, fontSize: '14px', color: '#aaa', lineHeight: '1.5' }}>{n.mensagem}</p>
                </div>
                <button 
                  onClick={() => limparNotificacao(n.id)}
                  style={{ background: 'none', border: 'none', color: '#444', cursor: 'pointer', padding: '6px' }}
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
              <p style={{ margin: 0, fontSize: '14px' }}>Nenhum registro encontrado para este filtro.</p>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}