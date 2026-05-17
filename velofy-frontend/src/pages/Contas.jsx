import React, { useState, useEffect } from 'react';
import { Plus, Building, Wallet, AlertCircle, Landmark } from 'lucide-react';
import api from '../services/api';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';

export default function Contas() { // Alterado para export default para segurança de rota
  const [contas, setContas] = useState([]);
  const [nomeInstituicao, setNomeInstituicao] = useState('');
  const [saldoInicial, setSaldoInicial] = useState('');
  const [tipoConta, setTipoConta] = useState('CORRENTE');
  
  const [erro, setErro] = useState('');
  const [sucesso, setSucesso] = useState(false);

  const carregarContas = async () => {
    try {
      const idUsuario = localStorage.getItem('usuarioId') || 1;
      const resposta = await api.get(`/contas/usuario/${idUsuario}`);
      
      // TRAVA DE SEGURANÇA: Garante que só vai atualizar o estado se for uma lista real
      if (resposta.data && Array.isArray(resposta.data)) {
        setContas(resposta.data);
      } else {
        setContas([]);
      }
    } catch (err) {
      console.error("Erro ao carregar contas", err);
      setContas([]); // Evita que a tela quebre se a API falhar
    }
  };

  useEffect(() => {
    carregarContas();
  }, []);

  const handleCadastrarConta = async (e) => {
    e.preventDefault();
    setErro('');
    setSucesso(false);

    if (!nomeInstituicao || !saldoInicial) {
      setErro('Preencha todos os campos obrigatórios.');
      return;
    }

    const novaConta = {
      usuario: { id: Number(localStorage.getItem('usuarioId') || 1) },
      nomeInstituicao: nomeInstituicao.toUpperCase(),
      saldoAtual: parseFloat(saldoInicial),
      tipoConta: { id: tipoConta === 'PJ' ? 2 : 1 }, 
      status: 'A'
    };

    try {
      await api.post('/contas', novaConta);
      setSucesso(true);
      setNomeInstituicao('');
      setSaldoInicial('');
      carregarContas();
    } catch (err) {
      setErro(err.response?.data || 'Erro ao cadastrar conta.');
    }
  };

  return (
    <div style={{ backgroundColor: '#0a0a0a', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar />

      <div style={{ padding: '32px 24px', boxSizing: 'border-box', flex: 1, maxWidth: '1200px', margin: '0 auto', width: '100%', color: '#fff' }}>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '32px' }}>
          <Landmark size={24} color="#00e676" />
          <h1 style={{ margin: 0, fontSize: '22px', fontWeight: '700' }}>Gerenciar Contas</h1>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>
          
          {/* FORMULÁRIO */}
          <div style={{ backgroundColor: '#0f0f0f', padding: '24px', borderRadius: '12px', border: '1px solid #1f1f1f' }}>
            <h2 style={{ margin: '0 0 20px 0', fontSize: '18px', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Plus size={20} color="#00e676" /> Nova Conta Bancária
            </h2>

            {erro && (
              <div style={{ backgroundColor: 'rgba(239, 68, 68, 0.1)', border: '1px solid #ef4444', padding: '12px', borderRadius: '6px', color: '#ef4444', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px', fontSize: '14px' }}>
                <AlertCircle size={16} /> {erro}
              </div>
            )}

            {sucesso && (
              <div style={{ backgroundColor: 'rgba(0, 230, 118, 0.1)', border: '1px solid #00e676', padding: '12px', borderRadius: '6px', color: '#00e676', marginBottom: '16px', fontSize: '14px' }}>
                ✨ Conta vinculada com sucesso!
              </div>
            )}

            <form onSubmit={handleCadastrarConta}>
              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', marginBottom: '6px', fontSize: '14px', color: '#aaa' }}>Nome da Instituição (Banco)</label>
                <input
                  type="text"
                  placeholder="Ex: NUBANK, ITAU, BRADESCO"
                  value={nomeInstituicao}
                  onChange={(e) => setNomeInstituicao(e.target.value)}
                  required
                  style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #2a2a2a', backgroundColor: '#141414', color: '#fff', boxSizing: 'border-box' }}
                />
              </div>

              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', marginBottom: '6px', fontSize: '14px', color: '#aaa' }}>Tipo de Conta</label>
                <select
                  value={tipoConta}
                  onChange={(e) => setTipoConta(e.target.value)}
                  style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #2a2a2a', backgroundColor: '#141414', color: '#fff' }}
                >
                  <option value="PF">Pessoa Física (PF)</option>
                  <option value="PJ">Pessoa Jurídica (PJ)</option>
                </select>
              </div>

              <div style={{ marginBottom: '24px' }}>
                <label style={{ display: 'block', marginBottom: '6px', fontSize: '14px', color: '#aaa' }}>Saldo Inicial (R$)</label>
                <input
                  type="number"
                  step="0.01"
                  placeholder="0,00"
                  value={saldoInicial}
                  onChange={(e) => setSaldoInicial(e.target.value)}
                  required
                  style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #2a2a2a', backgroundColor: '#141414', color: '#fff', boxSizing: 'border-box' }}
                />
              </div>

              <button type="submit" style={{ width: '100%', backgroundColor: '#00e676', color: '#000', padding: '14px', borderRadius: '8px', border: 'none', fontWeight: '700', cursor: 'pointer' }}>
                Adicionar Conta
              </button>
            </form>
          </div>

          {/* LISTA DE CONTAS COM VERIFICAÇÃO */}
          <div style={{ backgroundColor: '#0f0f0f', padding: '24px', borderRadius: '12px', border: '1px solid #1f1f1f', display: 'flex', flexDirection: 'column' }}>
            <h2 style={{ margin: '0 0 20px 0', fontSize: '18px', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Building size={20} color="#00e676" /> Minhas Contas
            </h2>

            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {contas && contas.length > 0 ? (
                contas.map(c => (
                  <div key={c.id} style={{ padding: '16px', borderRadius: '8px', border: '1px solid #2a2a2a', display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#141414' }}>
                    <div>
                      <h4 style={{ margin: '0 0 4px 0', fontSize: '15px', fontWeight: '600' }}>{c.nomeInstituicao}</h4>
                      <span style={{ fontSize: '12px', color: '#666' }}>
                        Tipo: {c.tipoConta && typeof c.tipoConta === 'object' ? c.tipoConta.descricao : 'CONTA CORRENTE'}
                      </span>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <span style={{ fontSize: '11px', color: '#666', display: 'block' }}>Saldo Disponível</span>
                      <span style={{ fontWeight: '700', color: '#00e676', fontSize: '16px' }}>R$ {c.saldoAtual?.toFixed(2)}</span>
                    </div>
                  </div>
                ))
              ) : (
                <div style={{ textAlign: 'center', padding: '48px 0', color: '#666', margin: 'auto' }}>
                  <Wallet size={40} style={{ marginBottom: '12px', opacity: 0.2 }} />
                  <p style={{ margin: 0, fontSize: '14px' }}>Nenhuma conta cadastrada ainda.</p>
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