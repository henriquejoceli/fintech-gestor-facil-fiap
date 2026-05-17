import { useNavigate } from 'react-router-dom';

export function NotFound() {
    const navigate = useNavigate();

    return (
        <div style={styles.container}>
            <h1 style={styles.errorCode}>404</h1>
            <h2 style={styles.title}>Ops! Página não encontrada</h2>
            <p style={styles.text}>A página que você está procurando não existe ou foi movida.</p>
            <button onClick={() => navigate('/')} style={styles.button}>
                Voltar para o Login
            </button>
        </div>
    );
}

const styles = {
    container: { display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', backgroundColor: '#121212', color: '#f5f5f5', fontFamily: 'sans-serif', padding: '20px', textAlign: 'center' },
    errorCode: { fontSize: '120px', color: '#00d094', margin: '0', fontWeight: 'bold', letterSpacing: '4px' },
    title: { fontSize: '24px', marginBottom: '10px' },
    text: { color: '#94a3b8', marginBottom: '30px', maxWidth: '400px' },
    button: { padding: '14px 28px', backgroundColor: '#00d094', color: '#121212', border: 'none', borderRadius: '25px', fontWeight: 'bold', fontSize: '16px', cursor: 'pointer', transition: 'opacity 0.2s' }
};