import React, { useState, useEffect } from 'react';
import { ArrowRightLeft, Plus, ArrowUpRight, ArrowDownRight, Calendar, Tag, Wallet, AlertCircle } from 'lucide-react';
import api from '../services/api';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';

export function TransacoesGlobal() {
  // Lista de categorias oficiais mapeadas do data.sql (t_tipocategoria)
  const categorias = [
    { id: 1, nome: 'Lazer / Entretenimento' },
    { id: 2, nome: 'Contas / Boletos' },
    { id: 3, nome: 'Investimentos' },
    { id: 4, nome: 'Saúde / Bem-estar' },
    { id: 5, nome: 'Educação' },
    { id: 6, nome: 'Outros' }
  ];

  // Estados
  const [contas, setContas] = useState([]);
  const [transacoes, setTransacoes] = useState([]);
  const [loading, setLoading] = useState(true);

  // Estados do Formulário
  const [contaSelecionada, setContaSelecionada] = useState('');
  const [tipoTransacao, setTipoTransacao] = useState('D'); // D -> Débito (Despesa), C -> Crédito (Receita)
  const [categoriaSelecionada, setCategoriaSelecionada] = useState('6');
  const [descricao, setDescricao] = useState('');
  const [valor, setValor] = useState('');

  const [erro, setErro] = useState('');
  const [sucesso, setSucesso] = useState(false);

  // Carrega os dados iniciais do banco
  const carregarDados = async () => {
    try {
      const idUsuario = localStorage.getItem('usuarioId') || 1;
      
      // 1. Busca as contas do usuário para carregar o <select>
      const respostaContas = await api.get(`/contas/usuario/${idUsuario}`);
      setContas(respostaContas.data);
      
      if (respostaContas.data.length > 0) {
        if (!contaSelecionada) setContaSelecionada(respostaContas.data[0].id);

        // 2. Busca o histórico de transações usando a conta principal como ponto de partida
        // (No seu back-end legado, a busca é por ID de conta. Passamos a ID da primeira)
        const idContaPrincipal = respostaContas.data[0].id;
        const respostaTransacoes = await api.get(`/transacoes/conta/${idContaPrincipal}`);
        
        // Ordena para exibir as mais recentes no topo
        const ordenadas = respostaTransacoes.data.sort((a, b) => b.id - a.id);
        setTransacoes(ordenadas);
      }
    } catch (err) {
      console.error("Erro ao carregar dados de movimentações", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    carregarDados();
  }, []);

  const handleSalvarTransacao = async (e) => {
    e.preventDefault();
    setErro('');
    setSucesso(false);

    if (!contaSelecionada || !descricao || !valor) {
      setErro('Preencha todos os campos obrigatórios.');
      return;
    }

    // Monta o objeto de acordo com os relacionamentos do JPA no Java
    const novaTransacao = {
      conta: { id: Number(contaSelecionada) },
      tipoTransacao: { id: tipoTransacao === 'C' ? 2 : 1 }, // 1 para Débito, 2 para Crédito
      tipoCategoria: { id: Number(categoriaSelecionada) },
      descricao: descricao.toUpperCase(),
      valor: parseFloat(valor),
      status: 'A'
    };

    try {
      // Dispara o POST para o controller do Java salvar e atualizar o saldo da conta
      await api.post('/transacoes', novaTransacao);
      
      setSucesso(true);
      setDescricao('');
      setValor('');
      
      // Recarrega o extrato atualizado
      carregarDados();
    } catch (err) {
      setErro(err.response?.data || 'Erro ao lançar movimentação.');
    }
  };

  return (
    <div style={{ backgroundColor: '#0a0a0a', minHeight: '100vh', display: 'flex', flexDirection: 'column', fontFamily: 'Arial, sans-serif' }}>
      <Navbar />

      <div style={{ padding: '32px 24px', boxSizing: 'border-box', flex: 1, maxWidth: '1200px', margin: '0 auto', width: '100%', color: '#fff' }}>
        
        {/* TÍTULO DA TELA */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '32px' }}>
          <ArrowRightLeft size={24} color="#00e676" />
          <h1 style={{ margin: 0, fontSize: '22px', fontWeight: '700' }}>Movimentações & Extrato</h1>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>
          
          {/* COLUNA ESQUERDA: FORMULÁRIO DE LANÇAMENTO */}
          <div style={{ backgroundColor: '#0f0f0f', padding: '24px', borderRadius: '12px', border: '1px solid #1f1f1f', height: 'fit-content' }}>
            <h2 style={{ margin: '0 0 20px 0', fontSize: '18px', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Plus size={20} color="#00e676" /> Nova Transação
            </h2>

            {erro && (
              <div style={{ backgroundColor: 'rgba(239, 68, 68, 0.1)', border: '1px solid #ef4444', padding: '12px', borderRadius: '6px', color: '#ef4444', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px', fontSize: '14px' }}>
                <AlertCircle size={16} /> {erro}
              </div>
            )}

            {sucesso && (
              <div style={{ backgroundColor: 'rgba(0, 230, 118, 0.1)', border: '1px solid #00e676', padding: '12px', borderRadius: '6px', color: '#00e676', marginBottom: '16px', fontSize: '14px' }}>
                ✨ Transação efetuada e saldo atualizado!
              </div>
            )}

            <form onSubmit={handleSalvarTransacao}>
              
              {/* Seleção de Conta */}
              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', marginBottom: '6px', fontSize: '14px', color: '#aaa' }}>Conta Relacionada</label>
                <select
                  value={contaSelecionada}
                  onChange={(e) => setContaSelecionada(e.target.value)}
                  style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #2a2a2a', backgroundColor: '#141414', color: '#fff' }}
                >
                  {contas.length === 0 && <option value="">Nenhuma conta encontrada</option>}
                  {contas.map(c => (
                    <option key={c.id} value={c.id}>{c.nomeInstituicao} (R$ {c.saldoAtual?.toFixed(2)})</option>
                  ))}
                </select>
              </div>

              {/* Tipo: Receita ou Despesa */}
              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', marginBottom: '6px', fontSize: '14px', color: '#aaa' }}>Tipo de Movimentação</label>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  <button
                    type="button"
                    onClick={() => setTipoTransacao('D')}
                    style={{ padding: '12px', borderRadius: '8px', border: '1px solid #2a2a2a', backgroundColor: tipoTransacao === 'D' ? 'rgba(239, 68, 68, 0.15)' : '#141414', color: tipoTransacao === 'D' ? '#ef4444' : '#666', fontWeight: '700', cursor: 'pointer', borderColor: tipoTransacao === 'D' ? '#ef4444' : '#2a2a2a' }}
                  >
                    Despesa (-)
                  </button>
                  <button
                    type="button"
                    onClick={() => setTipoTransacao('C')}
                    style={{ padding: '12px', borderRadius: '8px', border: '1px solid #2a2a2a', backgroundColor: tipoTransacao === 'C' ? 'rgba(0, 230, 118, 0.15)' : '#141414', color: tipoTransacao === 'C' ? '#00e676' : '#666', fontWeight: '700', cursor: 'pointer', borderColor: tipoTransacao === 'C' ? '#00e676' : '#2a2a2a' }}
                  >
                    Receita (+)
                  </button>
                </div>
              </div>

              {/* Categoria */}
              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', marginBottom: '6px', fontSize: '14px', color: '#aaa' }}>Categoria</label>
                <select
                  value={categoriaSelecionada}
                  onChange={(e) => setCategoriaSelecionada(e.target.value)}
                  style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #2a2a2a', backgroundColor: '#141414', color: '#fff' }}
                >
                  {categorias.map(cat => (
                    <option key={cat.id} value={cat.id}>{cat.nome}</option>
                  ))}
                </select>
              </div>

              {/* Descrição */}
              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', marginBottom: '6px', fontSize: '14px', color: '#aaa' }}>Descrição do Lançamento</label>
                <input
                  type="text"
                  placeholder="Ex: Supermercado, Salário Velofy"
                  value={descricao}
                  onChange={(e) => setDescricao(e.target.value)}
                  required
                  style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #2a2a2a', backgroundColor: '#141414', color: '#fff', boxSizing: 'border-box' }}
                />
              </div>

              {/* Valor */}
              <div style={{ marginBottom: '24px' }}>
                <label style={{ display: 'block', marginBottom: '6px', fontSize: '14px', color: '#aaa' }}>Valor (R$)</label>
                <input
                  type="number"
                  step="0.01"
                  placeholder="0,00"
                  value={valor}
                  onChange={(e) => setValor(e.target.value)}
                  required
                  style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #2a2a2a', backgroundColor: '#141414', color: '#fff', boxSizing: 'border-box' }}
                />
              </div>

              <button type="submit" style={{ width: '100%', backgroundColor: '#00e676', color: '#000', padding: '14px', borderRadius: '8px', border: 'none', fontWeight: '700', cursor: 'pointer' }}>
                Lançar na Conta
              </button>
            </form>
          </div>

          {/* COLUNA DIREITA: HISTÓRICO / EXTRATO COMPLETO */}
          <div style={{ backgroundColor: '#0f0f0f', padding: '24px', borderRadius: '12px', border: '1px solid #1f1f1f', display: 'flex', flexDirection: 'column' }}>
            <h2 style={{ margin: '0 0 20px 0', fontSize: '18px', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <ArrowRightLeft size={20} color="#00e676" /> Extrato Consolidado
            </h2>

            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {loading ? (
                <p style={{ color: '#666', fontSize: '14px', textAlign: 'center', margin: 'auto' }}>Buscando extrato...</p>
              ) : transacoes.length > 0 ? (
                transacoes.map(t => {
                  const ehReceita = t.tipoTransacao?.id === 2;
                  return (
                    <div key={t.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px', borderRadius: '8px', backgroundColor: '#141414', border: '1px solid #222' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <div style={{ padding: '8px', borderRadius: '50%', backgroundColor: ehReceita ? 'rgba(0, 230, 118, 0.1)' : 'rgba(239, 68, 68, 0.1)', display: 'flex' }}>
                          {ehReceita ? <ArrowUpRight size={16} color="#00e676" /> : <ArrowDownRight size={16} color="#ef4444" />}
                        </div>
                        <div>
                          <h4 style={{ margin: '0 0 4px 0', fontSize: '14px', fontWeight: '600' }}>{t.descricao}</h4>
                          <div style={{ display: 'flex', gap: '12px', fontSize: '11px', color: '#555' }}>
                            <span style={{ display: 'flex', alignItems: 'center', gap: '2px' }}><Wallet size={10} /> {t.conta?.nomeInstituicao}</span>
                            <span style={{ display: 'flex', alignItems: 'center', gap: '2px' }}><Calendar size={10} /> {t.dataTransacao ? new Date(t.dataTransacao).toLocaleDateString('pt-BR') : 'Hoje'}</span>
                          </div>
                        </div>
                      </div>
                      <span style={{ fontWeight: '700', fontSize: '15px', color: ehReceita ? '#00e676' : '#ef4444' }}>
                        {ehReceita ? '+' : '-'} R$ {t.valor?.toFixed(2)}
                      </span>
                    </div>
                  );
                })
              ) : (
                <div style={{ textAlign: 'center', padding: '48px 0', color: '#666', margin: 'auto' }}>
                  <ArrowRightLeft size={40} style={{ marginBottom: '12px', opacity: 0.2 }} />
                  <p style={{ margin: 0, fontSize: '14px' }}>Nenhuma movimentação lançada nessa carteira.</p>
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