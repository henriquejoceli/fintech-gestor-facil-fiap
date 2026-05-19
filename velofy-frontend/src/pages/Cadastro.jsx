import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../services/api';
import { User, Mail, Lock, Calendar, Smile, UserPlus, ArrowLeft, AlertCircle } from 'lucide-react';

export function Cadastro() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [dataNascimento, setDataNascimento] = useState('');
  const [genero, setGenero] = useState('');
  
  // 🎯 NOVOS ESTADOS: Gerenciamento de mensagens embutidas na tela (Sem alerts!)
  const [mensagem, setMensagem] = useState({ tipo: '', texto: '' });
  const [enviando, setEnviando] = useState(false);
  
  const navigate = useNavigate();

  const handleCadastro = async (e) => {
    e.preventDefault();
    setMensagem({ tipo: '', texto: '' });

    // Validação se as senhas batem
    if (senha !== confirmarSenha) {
      setMensagem({ tipo: 'erro', texto: 'As senhas não coincidem! Por favor, verifique a senha digitada.' });
      setConfirmarSenha(''); 
      return; 
    }

    try {
      setEnviando(true);
      const novoUsuario = {
        nome,
        email,
        senha,
        dataNascimento,
        tipoGenero: { id: Number(genero) }
      };

      // 1. Faz o cadastro no banco
      const response = await api.post('/cadastros', novoUsuario);
      
      // 2. Mensagem visual de sucesso
      setMensagem({ tipo: 'sucesso', texto: 'Conta criada com sucesso!' });

      // 3. LOGA AUTOMATICAMENTE: Salva os dados retornados pelo Java na sessão do navegador
      localStorage.setItem('@Velofy:user', JSON.stringify(response.data));

      // 4. Redireciona diretamente para o Dashboard após 1.5 segundos (tempo para o usuário ler a mensagem)
      setTimeout(() => {
        navigate('/dashboard');
      }, 1500);

    } catch (error) {
      console.error(error);
      const msgErro = error.response?.data && typeof error.response.data === 'string'
        ? error.response.data
        : 'Erro ao cadastrar! Por favor, verifique os dados ou tente outro e-mail.';
      setMensagem({ tipo: 'erro', texto: msgErro });
    } finally {
      setEnviando(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        
        {/* CABEÇALHO DO CARD */}
        <div style={styles.header}>
          <h1 style={styles.logo}>Velofy</h1>
          <h2 style={styles.title}>Criar Nova Conta</h2>
          <p style={styles.subtitle}>Preencha os campos abaixo para iniciar sua jornada.</p>
        </div>

        {/* 🎯 ÁREA DE MENSAGENS PERSONALIZADAS DA INTERFACE */}
        {mensagem.texto && (
          <div style={{
            ...styles.alertBox,
            backgroundColor: mensagem.tipo === 'sucesso' ? 'rgba(0, 230, 118, 0.1)' : 'rgba(239, 68, 68, 0.1)',
            borderColor: mensagem.tipo === 'sucesso' ? '#00e676' : '#ef4444',
            color: CabecarioCor(mensagem.tipo)
          }}>
            <AlertCircle size={16} />
            <span>{mensagem.texto}</span>
          </div>
        )}

        {/* FORMULÁRIO */}
        <form onSubmit={handleCadastro} style={styles.form}>
          
          <div style={styles.inputGroup}>
            <label style={styles.label}>
              <User size={14} color="var(--texto-secundario)" /> Nome
            </label>
            <input 
              type="text" 
              placeholder="Seu nome completo" 
              value={nome} 
              onChange={e => setNome(e.target.value)} 
              required 
              disabled={enviando}
              style={styles.input} 
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>
              <Mail size={14} color="var(--texto-secundario)" /> E-mail
            </label>
            <input 
              type="type" 
              placeholder="seu_email@email.com.br" 
              value={email} 
              onChange={e => setEmail(e.target.value)} 
              required 
              disabled={enviando}
              style={styles.input} 
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>
              <Lock size={14} color="var(--texto-secundario)" /> Criar senha
            </label>
            <input 
              type="password" 
              placeholder="••••••••" 
              value={senha} 
              onChange={e => setSenha(e.target.value)} 
              required 
              disabled={enviando}
              style={styles.input} 
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>
              <Lock size={14} color="var(--texto-secundario)" /> Confirmar senha
            </label>
            <input 
              type="password" 
              placeholder="••••••••" 
              value={confirmarSenha} 
              onChange={e => setConfirmarSenha(e.target.value)} 
              required 
              disabled={enviando}
              style={styles.input} 
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>
              <Calendar size={14} color="var(--texto-secundario)" /> Data de nascimento
            </label>
            <input 
              type="date" 
              value={dataNascimento} 
              onChange={e => setDataNascimento(e.target.value)} 
              required 
              disabled={enviando}
              style={styles.input} 
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>
              <Smile size={14} color="var(--texto-secundario)" /> Gênero
            </label>
            <select 
              value={genero} 
              onChange={e => setGenero(e.target.value)} 
              required 
              disabled={enviando}
              style={styles.input}
            >
              <option value="" disabled>Selecione o gênero</option>
              <option value="1">Masculino</option>
              <option value="2">Feminino</option>
              <option value="3">Não Binário</option>
              <option value="4">Prefiro não informar</option>
              <option value="5">Outros</option>
            </select>
          </div>

          <button type="submit" disabled={enviando} style={{...styles.button, opacity: enviando ? 0.6 : 1}}>
            {enviando ? 'Processando...' : 'Concluir Cadastro'} <UserPlus size={18} />
          </button>
        </form>

        {/* RODAPÉ DO CARD */}
        <div style={styles.footer}>
          <Link to="/" style={styles.backLink}>
            <ArrowLeft size={16} /> Já tem conta? Voltar para o Login
          </Link>
        </div>

      </div>
    </div>
  );
}

// Função rápida de apoio para as cores das fontes das mensagens
function CabecarioCor(tipo) {
  return tipo === 'sucesso' ? '#00e676' : '#ef4444';
}

const styles = {
  container: { display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', backgroundColor: 'var(--bg-principal)', padding: '40px 20px', fontFamily: 'sans-serif' },
  card: { backgroundColor: 'var(--bg-card)', padding: '40px', borderRadius: '16px', border: '1px solid var(--borda)', width: '100%', maxWidth: '440px', boxShadow: '0 8px 32px rgba(0,0,0,0.4)' },
  header: { textAlign: 'center', marginBottom: '25px' },
  logo: { color: 'var(--verde-velofy)', fontSize: '30px', fontWeight: 'bold', margin: '0 0 5px 0', letterSpacing: '-1px' },
  title: { fontSize: '20px', color: 'var(--texto-principal)', margin: '0 0 5px 0', fontWeight: '600' },
  subtitle: { color: 'var(--texto-secundario)', fontSize: '13px', margin: 0 },
  form: { display: 'flex', flexDirection: 'column', gap: '18px' },
  inputGroup: { display: 'flex', flexDirection: 'column', gap: '6px' },
  label: { color: 'var(--texto-principal)', fontSize: '13px', fontWeight: '500', display: 'flex', alignItems: 'center', gap: '6px' },
  input: { padding: '12px 14px', borderRadius: '8px', border: '1px solid var(--borda)', backgroundColor: 'var(--bg-input)', color: 'var(--texto-principal)', fontSize: '15px', outline: 'none' },
  button: { display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', padding: '14px', backgroundColor: 'var(--verde-velofy)', color: '#121212', border: 'none', borderRadius: '25px', fontWeight: 'bold', fontSize: '16px', cursor: 'pointer', marginTop: '10px', transition: 'opacity 0.2s' },
  footer: { borderTop: '1px solid var(--borda)', marginTop: '25px', paddingTop: '20px', textAlign: 'center' },
  backLink: { display: 'inline-flex', alignItems: 'center', gap: '8px', color: 'var(--texto-secundario)', textDecoration: 'none', fontSize: '14px', transition: 'color 0.2s' },
  // Estilo adicionado para a caixa de alertas embutida
  alertBox: { display: 'flex', alignItems: 'center', gap: '10px', padding: '12px 16px', borderRadius: '8px', border: '1px solid', fontSize: '14px', marginBottom: '20px', lineHeight: '1.4' }
};