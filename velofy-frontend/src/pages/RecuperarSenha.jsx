import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../services/api';
import { Mail, Lock, Calendar, KeyRound, ArrowLeft, AlertCircle } from 'lucide-react';

export function RecuperarSenha() {
  const [email, setEmail] = useState('');
  const [dataNascimento, setDataNascimento] = useState('');
  const [novaSenha, setNovaSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  
  const [mensagem, setMensagem] = useState({ tipo: '', texto: '' });
  const [enviando, setEnviando] = useState(false);
  const navigate = useNavigate();

  const handleRecuperar = async (e) => {
    e.preventDefault();
    setMensagem({ tipo: '', texto: '' });

    if (novaSenha !== confirmarSenha) {
      setMensagem({ tipo: 'erro', texto: 'As senhas não coincidem!' });
      return;
    }

    try {
      setEnviando(true);
      
      const payload = {
        email,
        dataNascimento,
        novaSenha
      };

      await api.put('/cadastros/recuperar-senha', payload);
      
      setMensagem({ tipo: 'sucesso', texto: 'Sua senha foi redefinida com sucesso! Redirecionando para o login...' });
      
      setTimeout(() => {
        navigate('/');
      }, 2000);

    } catch (error) {
      console.error(error);
      const msgErro = error.response?.data || 'Erro ao processar. Verifique os dados fornecidos.';
      setMensagem({ tipo: 'erro', texto: msgErro });
    } finally {
      setEnviando(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        
        <div style={styles.header}>
          <h1 style={styles.logo}>Velofy</h1>
          <h2 style={styles.title}>Recuperar Senha</h2>
          <p style={styles.subtitle}>Confirme seus dados cadastrais para definir uma nova senha.</p>
        </div>

        {mensagem.texto && (
          <div style={{
            ...styles.alertBox,
            backgroundColor: mensaje.tipo === 'sucesso' ? 'rgba(0, 230, 118, 0.1)' : 'rgba(239, 68, 68, 0.1)',
            borderColor: mensagem.tipo === 'sucesso' ? '#00e676' : '#ef4444',
            color: mensagem.tipo === 'sucesso' ? '#00e676' : '#ef4444'
          }}>
            <AlertCircle size={16} />
            <span>{mensagem.texto}</span>
          </div>
        )}

        <form onSubmit={handleRecuperar} style={styles.form}>
          
          <div style={styles.inputGroup}>
            <label style={styles.label}>
              <Mail size={14} color="var(--texto-secundario)" /> Seu E-mail
            </label>
            <input 
              type="email" 
              placeholder="seu_email@email.com" 
              value={email} 
              onChange={e => setEmail(e.target.value)} 
              required 
              disabled={enviando}
              style={styles.input} 
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>
              <Calendar size={14} color="var(--texto-secundario)" /> Confirmar Data de Nascimento
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
              <Lock size={14} color="var(--texto-secundario)" /> Nova Senha
            </label>
            <input 
              type="password" 
              placeholder="••••••••" 
              value={novaSenha} 
              onChange={e => setNovaSenha(e.target.value)} 
              required 
              disabled={enviando}
              style={styles.input} 
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>
              <Lock size={14} color="var(--texto-secundario)" /> Confirmar Nova Senha
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

          <button type="submit" disabled={enviando} style={{...styles.button, opacity: enviando ? 0.6 : 1}}>
            {enviando ? 'Validando...' : 'Redefinir Senha'} <KeyRound size={18} />
          </button>
        </form>

        <div style={styles.footer}>
          <Link to="/" style={styles.backLink}>
            <ArrowLeft size={16} /> Voltar para o Login
          </Link>
        </div>

      </div>
    </div>
  );
}

// Reutilizando os seus mesmos estilos consolidados para manter o design system idêntico
const styles = {
  container: { display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', backgroundColor: '#0a0a0a', padding: '40px 20px', fontFamily: 'sans-serif' },
  card: { backgroundColor: '#0f0f0f', padding: '40px', borderRadius: '16px', border: '1px solid #1f1f1f', width: '100%', maxWidth: '440px', boxShadow: '0 8px 32px rgba(0,0,0,0.4)' },
  header: { textAlign: 'center', marginBottom: '25px' },
  logo: { color: '#00e676', fontSize: '30px', fontWeight: 'bold', margin: '0 0 5px 0', letterSpacing: '-1px' },
  title: { fontSize: '20px', color: '#fff', margin: '0 0 5px 0', fontWeight: '600' },
  subtitle: { color: '#666', fontSize: '13px', margin: 0 },
  form: { display: 'flex', flexDirection: 'column', gap: '18px' },
  inputGroup: { display: 'flex', flexDirection: 'column', gap: '6px' },
  label: { color: '#fff', fontSize: '13px', fontWeight: '500', display: 'flex', alignItems: 'center', gap: '6px' },
  input: { padding: '12px 14px', borderRadius: '8px', border: '1px solid #1f1f1f', backgroundColor: '#141414', color: '#fff', fontSize: '15px', outline: 'none' },
  button: { display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', padding: '14px', backgroundColor: '#00e676', color: '#121212', border: 'none', borderRadius: '25px', fontWeight: 'bold', fontSize: '16px', cursor: 'pointer', marginTop: '10px' },
  footer: { borderTop: '1px solid #1f1f1f', marginTop: '25px', paddingTop: '20px', textAlign: 'center' },
  backLink: { display: 'inline-flex', alignItems: 'center', gap: '8px', color: '#666', textDecoration: 'none', fontSize: '14px' },
  alertBox: { display: 'flex', alignItems: 'center', gap: '10px', padding: '12px 16px', borderRadius: '8px', border: '1px solid', fontSize: '14px', marginBottom: '20px', lineHeight: '1.4' }
};