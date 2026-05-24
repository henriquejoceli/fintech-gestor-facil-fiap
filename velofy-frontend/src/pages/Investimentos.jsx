import React, { useState, useEffect } from 'react';
import { TrendingUp, Plus, Briefcase, AlertCircle, Wallet } from 'lucide-react';
import api from '../services/api';
import { Navbar } from '../components/Navbar.jsx';
import { Footer } from '../components/Footer.jsx';

export default function Investimentos() {
  // Estados Dinâmicos vindos do Java
  const [contas, setContas] = useState([]);
  const [investimentos, setInvestimentos] = useState([]);
  const [tiposAtivos, setTiposAtivos] = useState([]);
  
  // Estados do Formulário
  const [contaSelecionada, setContaSelecionada] = useState('');
  const [tipoSelecionado, setTipoSelecionado] = useState('');
  const [nomeAtivo, setNomeAtivo] = useState('');
  const [valorAplicado, setValorAplicado] = useState('');
  const [taxaRendimento, setTaxaRendimento] = useState('');
  
  const [erro, setErro] = useState('');
  const [sucesso, setSucesso] = useState(false);

  useEffect(() => {
    async function carregarDadosIniciais() {
      try {
        const idUsuario = localStorage.getItem('usuarioId') || 1;
        
        // 1. Busca os tipos de investimentos dinâmicos da t_tipoinvestimento
        const respostaTipos = await api.get('/tipos-investimento');
        setTiposAtivos(respostaTipos.data);
        if (respostaTipos.data.length > 0) {
          setTipoSelecionado(respostaTipos.data[0].id);
        }

        // 2. Busca as contas do usuário
        const respostaContas = await api.get(`/contas/usuario/${idUsuario}`);
        setContas(respostaContas.data);

        if (respostaContas.data.length > 0) {
          // 2. Ele pega a PRIMEIRA conta da lista (ex: ID 1) e joga no select
          setContaSelecionada(respostaContas.data[0].id);
          
          // 3. Ele busca os investimentos dessa PRIMEIRA conta
          carregarInvestimentos(respostaContas.data[0].id);
        }
      } catch (err) {
        console.error("Erro ao carregar dados iniciais de investimentos", err);
      }
    }
    carregarDadosIniciais();
  }, []);

  const carregarInvestimentos = async (idConta) => {
    try {
      const resposta = await api.get(`/investimentos/conta/${idConta}`);
      
      console.log("INVESTIMENTOS VINDOS DO JAVA:", resposta.data);
      
      setInvestimentos(resposta.data);
    } catch (err) {
      console.error("Erro ao buscar investimentos", err);
    }
  };

  const handleMudarConta = (idConta) => {
    setContaSelecionada(idConta);
    carregarInvestimentos(idConta);
  };

  const handleSalvarInvestimento = async (e) => {
    e.preventDefault();
    setErro('');
    setSucesso(false);

    if (!contaSelecionada || !nomeAtivo || !valorAplicado) {
      setErro('Preencha todos os campos obrigatórios.');
      return;
    }

    const novaMovimentacao = {
      investimento: {
        conta: { id: Number(contaSelecionada) },
        tipoInvestimento: { id: Number(tipoSelecionado) },
        nomeInvestimento: nomeAtivo.toUpperCase(),
        tipoCriacao: 'M',
        status: 'A'
      },
      valor: parseFloat(valorAplicado),
      tipoMovimentacao: 'E' 
    };

    try {
      await api.post('/investimentos/movimentar', novaMovimentacao);
      
      setSucesso(true);
      setNomeAtivo('');
      setValorAplicado('');
      setTaxaRendimento('');
      
      carregarInvestimentos(contaSelecionada);

    } catch (err) {
      console.error("Erro ao registrar investimento:", err);
      const mensagemErro = err.response?.data && typeof err.response.data === 'object'
        ? err.response.data.message || err.response.data.error || 'Erro interno'
        : err.response?.data || 'Erro ao registrar investimento.';
      setErro(mensagemErro);
    }
  };

  return (
    <div style={{ backgroundColor: '#0a0a0a', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar />

      <div style={{ padding: '32px 24px', boxSizing: 'border-box', flex: 1, maxWidth: '1200px', margin: '0 auto', width: '100%' }}>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '32px' }}>
          <TrendingUp size={24} color="#00e676" />
          <h1 style={{ margin: 0, fontSize: '22px', fontWeight: '700', color: '#fff' }}>Meus Investimentos</h1>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>
          
          {/* FORMULÁRIO */}
          <div style={{ backgroundColor: '#0f0f0f', padding: '24px', borderRadius: '12px', border: '1px solid #1f1f1f' }}>
            <h2 style={{ margin: '0 0 20px 0', fontSize: '18px', fontWeight: '600', color: '#fff', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Plus size={20} color="#00e676" /> Novo Aporte
            </h2>

            {erro && (
              <div style={{ backgroundColor: 'rgba(239, 68, 68, 0.1)', border: '1px solid #ef4444', padding: '12px', borderRadius: '6px', color: '#ef4444', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px', fontSize: '14px' }}>
                <AlertCircle size={16} /> {erro}
              </div>
            )}

            {sucesso && (
              <div style={{ backgroundColor: 'rgba(0, 230, 118, 0.1)', border: '1px solid #00e676', padding: '12px', borderRadius: '6px', color: '#00e676', marginBottom: '16px', fontSize: '14px' }}>
                ✨ Aporte realizado e log de auditoria gerado com sucesso!
              </div>
            )}

            <form onSubmit={handleSalvarInvestimento}>
              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', marginBottom: '6px', fontSize: '14px', color: '#aaa' }}>Selecione a Origem (Conta)</label>
                <select
                  value={contaSelecionada}
                  onChange={(e) => handleMudarConta(e.target.value)}
                  style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #2a2a2a', backgroundColor: '#141414', color: '#fff' }}
                >
                  {contas.length === 0 && <option value="">Nenhuma conta encontrada</option>}
                  {contas.map(c => (
                    <option key={c.id} value={c.id}>{c.nomeInstituicao} - Saldo: R$ {c.saldoAtual?.toFixed(2)}</option>
                  ))}
                </select>
              </div>

              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', marginBottom: '6px', fontSize: '14px', color: '#aaa' }}>Categoria do Ativo</label>
                <select
                  value={tipoSelecionado}
                  onChange={(e) => setTipoSelecionado(e.target.value)}
                  style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #2a2a2a', backgroundColor: '#141414', color: '#fff' }}
                >
                  {tiposAtivos.map(t => (
                    <option key={t.id} value={t.id}>{t.descricao}</option>
                  ))}
                </select>
              </div>

              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', marginBottom: '6px', fontSize: '14px', color: '#aaa' }}>Nome do Ativo / Papel</label>
                <input
                  type="text"
                  placeholder="Ex: CDB POS-FIXADO ITAU"
                  value={nomeAtivo}
                  onChange={(e) => setNomeAtivo(e.target.value)}
                  required
                  style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #2a2a2a', backgroundColor: '#141414', color: '#fff', boxSizing: 'border-box' }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '24px' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '6px', fontSize: '14px', color: '#aaa' }}>Valor Aplicado</label>
                  <input
                    type="number"
                    step="0.01"
                    placeholder="0,00"
                    value={valorAplicado}
                    onChange={(e) => setValorAplicado(e.target.value)}
                    required
                    style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #2a2a2a', backgroundColor: '#141414', color: '#fff', boxSizing: 'border-box' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '6px', fontSize: '14px', color: '#aaa' }}>Rentabilidade (% a.a.)</label>
                  <input
                    type="number"
                    step="0.01"
                    placeholder="Ex: 10.5"
                    value={taxaRendimento}
                    onChange={(e) => setTaxaRendimento(e.target.value)}
                    style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #2a2a2a', backgroundColor: '#141414', color: '#fff', boxSizing: 'border-box' }}
                  />
                </div>
              </div>

              <button type="submit" style={{ width: '100%', backgroundColor: '#00e676', color: '#000', padding: '14px', borderRadius: '8px', border: 'none', fontWeight: '700', cursor: 'pointer' }}>
                Confirmar Aplicação
              </button>
            </form>
          </div>

          {/* CARTEIRA ATIVA */}
          <div style={{ backgroundColor: '#0f0f0f', padding: '24px', borderRadius: '12px', border: '1px solid #1f1f1f', display: 'flex', flexDirection: 'column' }}>
            <h2 style={{ margin: '0 0 20px 0', fontSize: '18px', fontWeight: '600', color: '#fff', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Briefcase size={20} color="#00e676" /> Carteira Ativa
            </h2>

            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {investimentos.length > 0 ? (
                investimentos.map(inv => (
                  <div key={inv.id} style={{ padding: '16px', borderRadius: '8px', border: '1px solid #2a2a2a', display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#141414' }} >
                    <div>
                      <h4 style={{ margin: '0 0 4px 0', fontSize: '15px', color: '#fff', fontWeight: '600' }}>{inv.nomeInvestimento}</h4>
                      <span style={{ fontSize: '12px', color: '#aaa', display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <span style={{ backgroundColor: '#1f1f1f', padding: '2px 8px', borderRadius: '4px', fontSize: '11px', color: '#00e676', marginRight: '4px' }}>
                          {inv.tipoInvestimento?.descricao || 'Ativo'}
                        </span>
                        <Wallet size={12} color="#00e676" style={{ marginLeft: '4px' }} /> Retorno: {inv.taxaRendimento}% a.a.
                      </span>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <span style={{ fontSize: '11px', color: '#666', display: 'block' }}>Total Alocado</span>
                      <span style={{ fontWeight: '700', color: '#00e676', fontSize: '16px' }}>R$ {inv.valorAplicado?.toFixed(2)}</span>
                    </div>
                  </div>
                ))
              ) : (
                <div style={{ textAlign: 'center', padding: '48px 0', color: '#666', margin: 'auto' }}>
                  <Briefcase size={40} style={{ marginBottom: '12px', opacity: 0.2 }} />
                  <p style={{ margin: 0, fontSize: '14px' }}>Nenhum ativo alocado nesta conta ainda.</p>
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
      <Footer />
    </div>
  );
}