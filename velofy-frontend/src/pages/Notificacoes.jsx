import React, { useState, useEffect } from 'react';
import { Bell, ShieldAlert, CheckCircle, Info, Clock, Trash2, Filter } from 'lucide-react';
import api from '../services/api';
import { Navbar } from '../components/Navbar.jsx';
import { Footer } from '../components/Footer.jsx';

export default function Notificacoes() {
  const [notificacoes, setNotificacoes] = useState([]); // Começa vazio conforme pedido
  const [filtro, setFiltro] = useState('todas');
  const [loading, setLoading] = useState(true);

  // Carrega as ocorrências reais da tabela t_ocorrenciacadastro via API
  useEffect(() => {
    async function carregarNotificacoes() {
      try {
        const idUsuario = localStorage.getItem('usuarioId') || 1;
        
        // Primeiro buscamos as contas do usuário para saber de quais IDs monitorar os logs
        const respostaContas = await api.get(`/contas/usuario/${idUsuario}`);
        
        if (respostaContas.data.length > 0) {
          // Exemplo pegando os logs da primeira conta vinculada do usuário
          // No futuro, você pode dar um Promise.all para varrer todas as contas se preferir
          const idConta = respostaContas.data[0].id;
          
          // Endpoint que busca os logs de auditoria de uma conta específica
          const respostaLogs = await api.get(`/ocorrencias-cadastro/conta/${idConta}`);
          
          // Mapeia os dados do banco adicionando ícones e cores dinâmicas baseados nos IDs (6, 7, 8, 9)
          const logsFormatados = respostaLogs.data.map(log => {
            let configVisual = {
              tipo: 'info',
              icone: <Info size={20} color="#3b82f6" />,
              corBorda: '#3b82f6'
            };

            // Regra baseada nos novos inserts que você adicionou na t_tipoocorrenciacadastro
            if (log.tipoOcorrenciaCadastro?.id === 6 || log.tipoOcorrenciaCadastro?.id === 7) {
              configVisual = {
                tipo: 'sucesso',
                icone: <CheckCircle size={20} color="#00e676" />,
                corBorda: '#00e676'
              };
            } else if (log.tipoOcorrenciaCadastro?.id === 8 || log.tipoOcorrenciaCadastro?.id === 9) {
              configVisual = {
                tipo: 'atualizacao',
                icone: <ShieldAlert size={20} color="#f59e0b" />,
                corBorda: '#f59e0b'
              };
            }

            return {
              id: log.id,
              tipo: configVisual.tipo,
              titulo: log.tipoOcorrenciaCadastro?.descricao || 'Notificação do Sistema',
              mensagem: log.descricao,
              data: new Date(log.dataCadastro).toLocaleString('pt-BR'),
              icone: configVisual.icone,
              corBorda: configVisual.corBorda
            };
          });

          setNotificacoes(logsFormatados);
        }
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
      // Caso queira dar o delete físico no H2/Oracle quando o usuário clicar na lixeira
      // await api.delete(`/ocorrencias-cadastro/${id}`);
      setNotificacoes(notificacoes.filter(n => n.id !== id));
    } catch (err) {
      console.error("Erro ao deletar notificação", err);
    }
  };

  const notificacoesFiltradas = filtro === 'todas' 
    ? notificacoes 
    : notificacoes.filter(n => n.tipo === filtro);

  return (
    <div style={{ backgroundColor: '#0a0a0a', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* HEADER INTEGRADO */}
      <Navbar />

      {/* CONTEÚDO PRINCIPAL */}
      <div style={{ padding: '32px 24px', boxSizing: 'border-box', flex: 1, maxWidth: '900px', margin: '0 auto', width: '100%', color: '#fff' }}>
        
        {/* HEADER INTERNO COM FILTRO */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <Bell size={24} color="#00e676" />
            <h1 style={{ margin: 0, fontSize: '22px', fontWeight: '700' }}>Notificações</h1>
          </div>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Filter size={16} color="#666" />
            <select 
              value={filtro}
              onChange={(e) => setFiltro(e.target.value)}
              style={{ padding: '8px 12px', borderRadius: '8px', border: '1px solid #2a2a2a', backgroundColor: '#141414', color: '#fff', fontSize: '14px' }}
            >
              <option value="todas">Todas</option>
              <option value="sucesso">Novos Cadastros</option>
              <option value="atualizacao">Atualizações / Deletes</option>
            </select>
          </div>
        </div>

        {/* LISTA DINÂMICA */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {loading ? (
            <div style={{ textAlign: 'center', padding: '48px 0', color: '#666' }}>Sincronizando feed...</div>
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
                  position: 'relative',
                  alignItems: 'start'
                }}
              >
                <div style={{ marginTop: '2px' }}>
                  {n.icone}
                </div>

                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                    <h3 style={{ margin: 0, fontSize: '15px', color: '#fff', fontWeight: '600' }}>
                      {n.titulo}
                    </h3>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#666', fontSize: '12px' }}>
                      <Clock size={12} />
                      {n.data}
                    </div>
                  </div>
                  <p style={{ margin: 0, fontSize: '14px', color: '#aaa', lineHeight: '1.5' }}>
                    {n.mensagem}
                  </p>
                </div>

                <button 
                  onClick={() => limparNotificacao(n.id)}
                  style={{ 
                    background: 'none', 
                    border: 'none', 
                    color: '#444', 
                    cursor: 'pointer',
                    padding: '6px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: '50%',
                    transition: 'all 0.2s'
                  }}
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
              <p style={{ margin: 0, fontSize: '14px' }}>Nenhum log ou alerta pendente no momento.</p>
            </div>
          )}
        </div>

        <p style={{ textAlign: 'center', marginTop: '40px', fontSize: '11px', color: '#444' }}>
          Logs de auditoria sincronizados via T_OCORRENCIACADASTRO.
        </p>
      </div>

      {/* FOOTER INTEGRADO */}
      <Footer />
    </div>
  );
}