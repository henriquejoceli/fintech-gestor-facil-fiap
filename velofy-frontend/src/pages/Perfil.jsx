import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import api from '../services/api';

export function Perfil() {
    const navigate = useNavigate();
    const usuarioLogado = JSON.parse(localStorage.getItem('@Velofy:user') || '{}');

    const [nome, setNome] = useState(usuarioLogado.nome || '');
    const [email, setEmail] = useState(usuarioLogado.email || '');
    const [senha, setSenha] = useState('');

    useEffect(() => {
        if (!usuarioLogado.id) navigate('/');
    }, []);

    const handleAtualizarPerfil = async (e) => {
        e.preventDefault();
        try {
            const dadosAtualizados = { nome, email };
            if (senha) dadosAtualizados.senha = senha; // Só envia a senha se o usuário digitou uma nova

            const response = await api.put(`/cadastros/${usuarioLogado.id}`, dadosAtualizados);

            // Atualiza o localStorage com os novos dados do perfil
            localStorage.setItem('@Velofy:user', JSON.stringify(response.data));
            alert("Perfil atualizado com sucesso!");
        } catch (error) {
            console.error(error);
            alert("Erro ao atualizar perfil.");
        }
    };

    const handleDeletarConta = async () => {
        const confirmar = window.confirm("ATENÇÃO: Deseja realmente desativar o seu perfil no Velofy? Esta ação não pode ser desfeita.");
        if (confirmar) {
            try {
                await api.delete(`/cadastros/${usuarioLogado.id}`);
                alert("Sua conta foi inativada. Esperamos ver você de volta em breve!");
                localStorage.removeItem('@Velofy:user');
                navigate('/');
            } catch (error) {
                console.error(error);
                alert("Erro ao inativar conta.");
            }
        }
    };

    return (
        <div style={{ backgroundColor: '#121212', minHeight: '100vh', color: '#f5f5f5', fontFamily: 'sans-serif' }}>
            <Navbar />
            <div style={{ padding: '40px', maxWidth: '600px', margin: '0 auto' }}>
                <div style={{ backgroundColor: '#1e1e1e', padding: '30px', borderRadius: '12px', border: '1px solid #2d2d2d' }}>
                    <h2 style={{ color: '#00d094', marginBottom: '10px' }}>Configurações do Perfil</h2>
                    <p style={{ color: '#94a3b8', fontSize: '14px', marginBottom: '25px' }}>Gerencie seus dados de acesso ou encerre sua conta no Velofy.</p>

                    <form onSubmit={handleAtualizarPerfil} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                        <input type="text" placeholder="Nome Completo" value={nome} onChange={e => setNome(e.target.value)} required style={styles.input} />
                        <input type="email" placeholder="E-mail de Acesso" value={email} onChange={e => setEmail(e.target.value)} required style={styles.input} />
                        <input type="password" placeholder="Nova Senha (deixe em branco para não alterar)" value={senha} onChange={e => setSenha(e.target.value)} style={styles.input} />

                        <button type="submit" style={styles.btnSalvar}>Salvar Alterações</button>
                    </form>

                    <div style={{ borderTop: '1px solid #2d2d2d', marginTop: '30px', paddingTop: '20px' }}>
                        <h4 style={{ color: '#ef4444', margin: '0 0 10px 0' }}>Zona de Perigo</h4>
                        <p style={{ color: '#94a3b8', fontSize: '14px', marginBottom: '15px' }}>Ao desativar sua conta, você perderá o acesso aos seus extratos e carteiras.</p>
                        <button onClick={handleDeletarConta} style={styles.btnDeletar}>Inativar Meu Perfil</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

const styles = {
    input: { padding: '12px', borderRadius: '8px', border: '1px solid #333', backgroundColor: '#262626', color: '#fff', fontSize: '16px' },
    btnSalvar: { padding: '14px', backgroundColor: '#00d094', color: '#121212', border: 'none', borderRadius: '25px', fontWeight: 'bold', fontSize: '16px', cursor: 'pointer' },
    btnDeletar: { padding: '10px 20px', backgroundColor: 'transparent', color: '#ef4444', border: '1px solid #ef4444', borderRadius: '20px', cursor: 'pointer', fontWeight: 'bold' }
};