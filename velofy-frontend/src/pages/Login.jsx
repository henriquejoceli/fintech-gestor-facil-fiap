import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../services/api';
import { LogIn, Mail, Lock } from 'lucide-react';

export function Login() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await api.post('/cadastros/login', { email, senha });

      localStorage.setItem('@Velofy:user', JSON.stringify(response.data));

      alert(`Boas vindas, ${response.data.nome}!`);
      navigate('/dashboard');
    } catch (error) {
      alert("E-mail ou senha incorretos.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        
        {/* LOGO E HEADER */}
        <div style={styles.header}>
          <h1 style={styles.logo}>Velofy</h1>
          <h2 style={styles.title}>Boas vindas!</h2>
          <p style={styles.subtitle}>Acesse sua conta para controlar suas finanças.</p>
        </div>

        {/* FORMULÁRIO */}
        <form onSubmit={handleLogin} style={styles.form}>
          
          <div style={styles.inputGroup}>
            <label style={styles.label}>
              <Mail size={14} color="var(--texto-secundario)" /> E-mail
            </label>
            <input
              type="email"
              placeholder="exemplo@email.com"
              required
              onChange={e => setEmail(e.target.value)}
              style={styles.input}
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>
              <Lock size={14} color="var(--texto-secundario)" /> Senha
            </label>
            <input
              type="password"
              placeholder="••••••••"
              required
              onChange={e => setSenha(e.target.value)}
              style={styles.input}
            />
          </div>

          <Link to="/recuperar-senha" style={styles.forgotPassword}>
            Esqueceu sua senha?
          </Link>

          <button type="submit" disabled={loading} style={styles.btnSubmit}>
            {loading ? (
              'Carregando...'
            ) : (
              <>
                Entrar <LogIn size={18} />
              </>
            )}
          </button>
        </form>

        {/* LINK PARA CRIAR CONTA */}
        <div style={styles.footer}>
          <p style={{ color: 'var(--texto-secundario)', margin: 0 }}>
            Ainda não tem conta?{' '}
            <Link to="/cadastro" style={styles.registerLink}>
              Cadastre-se
            </Link>
          </p>
        </div>

      </div>
    </div>
  );
}

const styles = {
  container: { display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', backgroundColor: 'var(--bg-principal)', padding: '20px', fontFamily: 'sans-serif' },
  card: { backgroundColor: 'var(--bg-card)', padding: '40px', borderRadius: '16px', border: '1px solid var(--borda)', width: '100%', maxWidth: '420px', boxShadow: '0 8px 32px rgba(0,0,0,0.4)' },
  header: { textAlign: 'center', marginBottom: '30px' },
  logo: { color: 'var(--verde-velofy)', fontSize: '32px', fontWeight: 'bold', margin: '0 0 10px 0', letterSpacing: '-1px' },
  title: { fontSize: '22px', color: 'var(--texto-principal)', margin: '0 0 5px 0', fontWeight: '600' },
  subtitle: { color: 'var(--texto-secundario)', fontSize: '14px', margin: 0 },
  form: { display: 'flex', flexDirection: 'column', gap: '20px' },
  inputGroup: { display: 'flex', flexDirection: 'column', gap: '8px' },
  label: { color: 'var(--texto-principal)', fontSize: '14px', fontWeight: '500', display: 'flex', alignItems: 'center', gap: '6px' },
  input: { padding: '14px', borderRadius: '8px', border: '1px solid var(--borda)', backgroundColor: 'var(--bg-input)', color: 'var(--texto-principal)', fontSize: '16px', outline: 'none', transition: 'border-color 0.2s' },
  forgotPassword: { color: 'var(--texto-secundario)', fontSize: '13px', textDecoration: 'none', textAlign: 'right', transition: 'color 0.2s', alignSelf: 'flex-end' },
  btnSubmit: { display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', padding: '14px', backgroundColor: 'var(--verde-velofy)', color: '#121212', border: 'none', borderRadius: '25px', fontWeight: 'bold', fontSize: '16px', cursor: 'pointer', transition: 'opacity 0.2s', marginTop: '10px' },
  footer: { borderTop: '1px solid var(--borda)', marginTop: '30px', paddingTop: '20px', textAlign: 'center', fontSize: '14px' },
  registerLink: { color: 'var(--verde-velofy)', textDecoration: 'none', fontWeight: 'bold', transition: 'color 0.2s' }
};