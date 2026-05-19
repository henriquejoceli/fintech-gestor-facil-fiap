import React, { useState, useEffect } from 'react';
import { Wallet, TrendingUp, ArrowUpRight, ArrowDownRight, Clock, Building, Landmark } from 'lucide-react';
import api from '../services/api';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';

export function Dashboard() {
  // 🎯 RECUPERA OS DADOS DO USUÁRIO LOGADO DIRETO DA SESSÃO
  const usuarioLogado = JSON.parse(localStorage.getItem('@Velofy:user') || '{}');

  // Estados para dados dinâmicos do banco
  const [contas, setContas] = useState([]);
  const [investimentos, setInvestimentos] = useState([]);
  const [ultimasTransacoes, setUltimasTransacoes] = useState([]);
  const [loading, setLoading] = useState(true);

  // Totais calculados
  const [totalBancos, setTotalBancos] = useState(0);
  const [totalInvestido, setTotalInvestido] = useState(0);

  // 🎯 COMPORTAMENTO DO NOME: Prioriza o Nome Social se ele estiver preenchido no banco
  const nomeExibicao = usuarioLogado.nomeSocial || usuarioLogado.nome || 'Usuário';

  useEffect(() => {
    async function carregarDashboard() {
      try {
        // Usa o ID dinâmico vindo da sessão unificada
        const idUsuario = usuarioLogado.id || 1;

        // 1. Busca as contas bancárias do usuário
        const respuestaContas = await api.get(`/contas/usuario/${idUsuario}`);
        const listaContas = respuestaContas.data;
        setContas(listaContas);

        // Calcula o saldo somado dos bancos
        const saldoBancosSomado = listaContas.reduce((acc, conta) => acc + (conta.saldoAtual || 0), 0);
        setTotalBancos(saldoBancosSomado);

        // 2. Busca os investimentos e as transações se houver contas cadastradas
        if (listaContas.length > 0) {
          const idContaPrincipal = listaContas[0].id;
          
          const respuestaInvestimentos = await api.get(`/investimentos/conta/${idContaPrincipal}`);
          setInvestimentos(respuestaInvestimentos.data);
          
          const saldoInvestidoSomado = respuestaInvestimentos.data.reduce((acc, inv) => acc + (inv.valorAplicado || 0), 0);
          setTotalInvestido(saldoInvestidoSomado);

          // 3. Busca o histórico de transações da conta
          const respuestaTransacoes = await api.get(`/transacoes/conta/${idContaPrincipal}`);
          const ordenadas = respuestaTransacoes.data.sort((a, b) => b.id - a.id);
          setUltimasTransacoes(ordenadas.slice(0, 5));
        }
      } catch (err) {
        console.error("Erro ao carregar dados consolidados do dashboard", err);
      } finally {
        setLoading(false);
      }
    }

    carregarDashboard();
  }, [usuarioLogado.id]);

  return (
    <div style={{ backgroundColor: '#0a0a0a', minHeight: '100vh', display: 'flex', flexDirection: 'column', fontFamily: 'Arial, sans-serif' }}>
      {/* HEADER NAVBAR GLOBAL */}
      <Navbar />

      {/* CONTEÚDO DO DASHBOARD */}
      <div style={{ padding: '32px 24px', boxSizing: 'border-box', flex: 1, maxWidth: '1200px', margin: '0 auto', width: '100%', color: '#fff' }}>
        
        {/* BOAS-VINDAS CUSTOMIZADO */}
        <div style={{ marginBottom: '32px' }}>
          {/* 🎯 SEU NOME DINÂMICO IMPLANTADO AQUI COM SUCESSO! */}
          <h1 style={{ margin: '0 0 4px 0', fontSize: '24px', fontWeight: '700' }}>
            Olá, <span style={{ color: '#00e676' }}>{nomeExibicao}</span>!
          </h1>
          <p style={{ margin: 0, fontSize: '14px', color: '#666' }}>Visão unificada das suas contas e patrimônio alocado.</p>
        </div>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '48px 0', color: '#666' }}>Sincronizando carteiras...</div>
        ) : (
          <>
            {/* CARDS DE SALDO SUPERIORES */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px', marginBottom: '32px' }}>
              
              {/* CARD 1: PATRIMÔNIO TOTAL */}
              <div style={{ backgroundColor: '#0f0f0f', padding: '24px', borderRadius: '12px', border: '1px solid #1f1f1f' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                  <span style={{ fontSize: '14px', color: '#aaa', fontWeight: '500' }}>Patrimônio Líquido</span>
                  <Landmark size={20} color="#00e676" />
                </div>
                <h2 style={{ margin: 0, fontSize: '28px', fontWeight: '700', color: '#00e676' }}>
                  R$ {(totalBancos + totalInvestido).toFixed(2)}
                </h2>
              </div>

              {/* CARD 2: TOTAL EM CONTAS CORRENTES */}
              <div style={{ backgroundColor: '#0f0f0f', padding: '24px', borderRadius: '12px', border: '1px solid #1f1f1f' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                  <span style={{ fontSize: '14px', color: '#aaa', fontWeight: '500' }}>Saldo em Contas</span>
                  <Wallet size={20} color="#3b82f6" />
                </div>
                <h2 style={{ margin: 0, fontSize: '24px', fontWeight: '700', color: '#fff' }}>
                  R$ {totalBancos.toFixed(2)}
                </h2>
              </div>

              {/* CARD 3: TOTAL INVESTIDO */}
              <div style={{ backgroundColor: '#0f0f0f', padding: '24px', borderRadius: '12px', border: '1px solid #1f1f1f' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                  <span style={{ fontSize: '14px', color: '#aaa', fontWeight: '500' }}>Total Alocado</span>
                  <TrendingUp size={20} color="#a855f7" />
                </div>
                <h2 style={{ margin: 0, fontSize: '24px', fontWeight: '700', color: '#fff' }}>
                  R$ {totalInvestido.toFixed(2)}
                </h2>
              </div>

            </div>

            {/* SEÇÃO DO MEIO: DISTRIBUIÇÃO DE SALDOS E CARTEIRAS */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '24px', marginBottom: '32px' }}>
              
              {/* SUB-CARD ESQUERDO: CONTAS BANCÁRIAS */}
              <div style={{ backgroundColor: '#0f0f0f', padding: '24px', borderRadius: '12px', border: '1px solid #1f1f1f' }}>
                <h3 style={{ margin: '0 0 20px 0', fontSize: '16px', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Building size={18} color="#3b82f6" /> Saldos por Instituição
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {contas.length > 0 ? (
                    contas.map(c => (
                      <div key={c.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px', borderRadius: '8px', backgroundColor: '#141414', border: '1px solid #222' }}>
                        <span style={{ fontSize: '14px', fontWeight: '500' }}>{c.nomeInstituicao}</span>
                        <span style={{ fontSize: '14px', fontWeight: '700', color: '#fff' }}>R$ {c.saldoAtual?.toFixed(2)}</span>
                      </div>
                    ))
                  ) : (
                    <p style={{ color: '#666', fontSize: '13px', margin: 0 }}>Nenhuma conta vinculada.</p>
                  )}
                </div>
              </div>

              {/* SUB-CARD DIREITO: ALOCAÇÃO DE ATIVOS */}
              <div style={{ backgroundColor: '#0f0f0f', padding: '24px', borderRadius: '12px', border: '1px solid #1f1f1f' }}>
                <h3 style={{ margin: '0 0 20px 0', fontSize: '16px', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <TrendingUp size={18} color="#a855f7" /> Alocação de Investimentos
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {investimentos.length > 0 ? (
                    investimentos.map(inv => (
                      <div key={inv.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px', borderRadius: '8px', backgroundColor: '#141414', border: '1px solid #222' }}>
                        <span style={{ fontSize: '14px', fontWeight: '500' }}>{inv.nomeInvestimento}</span>
                        <span style={{ fontSize: '14px', fontWeight: '700', color: '#00e676' }}>R$ {inv.valorAplicado?.toFixed(2)}</span>
                      </div>
                    ))
                  ) : (
                    <p style={{ color: '#666', fontSize: '13px', margin: 0 }}>Nenhum capital investido ainda.</p>
                  )}
                </div>
              </div>

            </div>

            {/* SEÇÃO INFERIOR: ÚLTIMAS TRANSAÇÕES DETALHADAS */}
            <div style={{ backgroundColor: '#0f0f0f', padding: '24px', borderRadius: '12px', border: '1px solid #1f1f1f' }}>
              <h3 style={{ margin: '0 0 20px 0', fontSize: '16px', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Clock size={18} color="#00e676" /> Últimas Movimentações
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {ultimasTransacoes.length > 0 ? (
                  ultimasTransacoes.map(t => {
                    const isReceita = t.tipoTransacao?.id === 2;
                    return (
                      <div key={t.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px', borderRadius: '8px', backgroundColor: '#141414', border: '1px solid #222' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                          <div style={{ padding: '8px', borderRadius: '50%', backgroundColor: isReceita ? 'rgba(0, 230, 118, 0.1)' : 'rgba(239, 68, 68, 0.1)', display: 'flex' }}>
                            {isReceita ? <ArrowUpRight size={18} color="#00e676" /> : <ArrowDownRight size={18} color="#ef4444" />}
                          </div>
                          <div>
                            <h4 style={{ margin: '0 0 4px 0', fontSize: '14px', fontWeight: '600', color: '#fff' }}>{t.descricao}</h4>
                            <div style={{ display: 'flex', gap: '12px', fontSize: '12px', color: '#666' }}>
                              <span>Origem: <strong>{t.conta?.nomeInstituicao || 'Conta'}</strong></span>
                              <span>Data: {t.dataTransacao ? new Date(t.dataTransacao).toLocaleDateString('pt-BR') : 'Hoje'}</span>
                            </div>
                          </div>
                        </div>
                        <span style={{ fontSize: '15px', fontWeight: '700', color: isReceita ? '#00e676' : '#ef4444' }}>
                          {isReceita ? '+' : '-'} R$ {t.valor?.toFixed(2)}
                        </span>
                      </div>
                    );
                  })
                ) : (
                  <div style={{ textAlign: 'center', padding: '32px 0', color: '#666' }}>
                    Nenhuma movimentação financeira registrada recentemente.
                  </div>
                )}
              </div>
            </div>
          </>
        )}
      </div>

      {/* FOOTER GLOBAL */}
      <Footer />
    </div>
  );
}