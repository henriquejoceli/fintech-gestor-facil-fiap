import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import api from '../services/api';
import { createAvatar } from '@dicebear/core';
import { croodles } from '@dicebear/collection';

export function Perfil() {
    const navigate = useNavigate();
    const usuarioLogado = JSON.parse(localStorage.getItem('@Velofy:user') || '{}');

    const gerarAvatarSvg = (semente) => {
        const avatar = createAvatar(croodles, {
            seed: semente,
            backgroundColor: ['1e1e1e'],
        });
        return `data:image/svg+xml;utf8,${encodeURIComponent(avatar.toString())}`;
    };

    const AVATARES_PRE_DEFINIDOS = [
        { id: 'croodle1', url: gerarAvatarSvg('Henrique') },
        { id: 'croodle2', url: gerarAvatarSvg('Gabriel') },
        { id: 'croodle3', url: gerarAvatarSvg('Beatriz') },
        { id: 'croodle4', url: gerarAvatarSvg('Alex') }
    ];

    const [perfilAtivo, setPerfilAtivo] = useState(null);
    const [editando, setEditando] = useState(false);

    const [nome, setNome] = useState('');
    const [nomeSocial, setNomeSocial] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [fotoBase64, setFotoBase64] = useState('');

    const buscarDadosPerfil = async () => {
        if (!usuarioLogado.id) {
            navigate('/');
            return;
        }
        try {
            const response = await api.get(`/cadastros/${usuarioLogado.id}`);
            setPerfilAtivo(response.data);
            
            setNome(response.data.nome || '');
            setNomeSocial(response.data.nomeSocial || '');
            setEmail(response.data.email || '');
            setFotoBase64(response.data.fotoPerfil || '');
        } catch (error) {
            console.error("Erro ao sincronizar perfil:", error);
        }
    };

    useEffect(() => {
        buscarDadosPerfil();
    }, []);

    // Converte a imagem do PC do usuário para texto (Base64)
    const handleFotoUpload = (e) => {
        const file = e.target.files[0];
        
        if (file) {
            const limiteTamanho = 2 * 1024 * 1024; 
            
            if (file.size > limiteTamanho) {
                alert("Arquivo muito pesado! Escolha uma foto de perfil de até 2MB.");
                e.target.value = "";
                return;
            }

            const reader = new FileReader();
            reader.onloadend = () => {
                setFotoBase64(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleAtualizarPerfil = async (e) => {
        e.preventDefault();
        try {
            const dadosAtualizados = { 
                nome, 
                nomeSocial: nomeSocial.trim() === '' ? null : nomeSocial,
                email,
                fotoPerfil: fotoBase64
            };
            
            if (senha) dadosAtualizados.senha = senha;

            const response = await api.put(`/cadastros/${usuarioLogado.id}`, dadosAtualizados);

            localStorage.setItem('@Velofy:user', JSON.stringify(response.data));
            alert("Perfil updated com sucesso!");
            setEditando(false);
            buscarDadosPerfil(); 
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
            
            <div style={{ padding: '40px', maxWidth: editando ? '1100px' : '600px', margin: '0 auto', transition: 'all 0.3s ease' }}>
                
                {/* GRID DE LAYOUT FLEXÍVEL */}
                <div style={{ display: 'grid', gridTemplateColumns: editando ? '1fr 1fr' : '1fr', gap: '30px' }}>
                    
                    {/* COLUNA 1: DETALHES DO PERFIL ATUAL */}
                    <div style={{ backgroundColor: '#1e1e1e', padding: '30px', borderRadius: '12px', border: '1px solid #2d2d2d', textAlign: 'center' }}>
                        
                        {/* 🎯 ADICIONADO: Círculo de Avatar que de fato exibe a foto atual (Base64 ou SVG local) */}
                        <div style={{ width: '110px', height: '110px', borderRadius: '50%', backgroundColor: '#2d2d2d', margin: '0 auto 20px auto', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', border: '3px solid #00d094' }}>
                            {fotoBase64 ? (
                                <img src={fotoBase64} alt="Foto Perfil" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                            ) : (
                                <span style={{ fontSize: '32px', color: '#94a3b8' }}>{nome.charAt(0).toUpperCase()}</span>
                            )}
                        </div>

                        {/* TRATAMENTO DO NOME SOCIAL */}
                        {perfilAtivo?.nomeSocial ? (
                            <div>
                                <h2 style={{ color: '#00d094', margin: '0 0 4px 0' }}>{perfilAtivo.nomeSocial}</h2>
                                <p style={{ color: '#94a3b8', fontSize: '14px', margin: '0 0 20px 0' }}>({perfilAtivo.nome})</p>
                            </div>
                        ) : (
                            <h2 style={{ color: '#00d094', marginBottom: '20px' }}>{perfilAtivo?.nome}</h2>
                        )}

                        <div style={{ textAlign: 'left', display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '30px' }}>
                            <div style={styles.cardInfo}>
                                <span style={styles.cardLabel}>E-MAIL REGISTRADO</span>
                                <span>{perfilAtivo?.email}</span>
                            </div>
                            <div style={styles.cardInfo}>
                                <span style={styles.cardLabel}>DATA DE NASCIMENTO</span>
                                <span>{perfilAtivo?.dataNascimento ? new Date(perfilAtivo.dataNascimento + 'T00:00:00').toLocaleDateString('pt-BR') : '-'}</span>
                            </div>
                        </div>

                        <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
                            {!editando && (
                                <button onClick={() => setEditando(true)} style={styles.btnAlterar}>Alterar Meus Dados</button>
                            )}
                        </div>

                        <div style={{ borderTop: '1px solid #2d2d2d', marginTop: '30px', paddingTop: '20px', textAlign: 'left' }}>
                            <h4 style={{ color: '#ef4444', margin: '0 0 6px 0' }}>Zona de Perigo</h4>
                            <p style={{ color: '#94a3b8', fontSize: '13px', marginBottom: '15px' }}>Ao desativar sua conta, seus dados de extratos e carteiras ficarão congelados.</p>
                            <button onClick={handleDeletarConta} style={styles.btnDeletar}>Inativar Meu Perfil</button>
                        </div>
                    </div>

                    {/* COLUNA 2: DIV GAVETA LATERAL DE EDIÇÃO */}
                    {editando && (
                        <div style={{ backgroundColor: '#1e1e1e', padding: '30px', borderRadius: '12px', border: '1px solid #2d2d2d' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                                <h3 style={{ color: '#00d094', margin: 0 }}>Modificar Informações</h3>
                                <button onClick={() => setEditando(false)} style={{ background: 'none', border: 'none', color: '#94a3b8', fontSize: '18px', cursor: 'pointer' }}>✕</button>
                            </div>

                            <form onSubmit={handleAtualizarPerfil} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                                
                                {/* Escolha de Avatares locais + Upload de arquivos */}
                                <div>
                                    <label style={styles.inputLabel}>Foto de Perfil</label>
                                    <p style={{ margin: '0 0 10px 0', fontSize: '13px', color: '#64748b' }}>Escolha um personagem Croodles ou faça upload de um arquivo:</p>
                                    
                                    <div style={{ display: 'flex', gap: '12px', marginBottom: '16px', justifyContent: 'center', backgroundColor: '#161616', padding: '10px', borderRadius: '8px', border: '1px solid #262626' }}>
                                        {AVATARES_PRE_DEFINIDOS.map((avatar) => (
                                            <img
                                                key={avatar.id}
                                                src={avatar.url}
                                                alt="Opção de Avatar"
                                                onClick={() => setFotoBase64(avatar.url)} 
                                                style={{
                                                    width: '50px',
                                                    height: '50px',
                                                    borderRadius: '50%',
                                                    cursor: 'pointer',
                                                    backgroundColor: '#2d2d2d',
                                                    border: fotoBase64 === avatar.url ? '2px solid #00d094' : '2px solid transparent',
                                                    transition: 'all 0.2s ease',
                                                    transform: fotoBase64 === avatar.url ? 'scale(1.1)' : 'scale(1)'
                                                }}
                                            />
                                        ))}
                                    </div>

                                    <input 
                                        type="file" 
                                        accept="image/*" 
                                        onChange={handleFotoUpload} 
                                        style={{ color: '#94a3b8', fontSize: '14px', width: '100%' }} 
                                    />
                                </div>

                                <div>
                                    <label style={styles.inputLabel}>Nome Completo *</label>
                                    <input type="text" value={nome} onChange={e => setNome(e.target.value)} required style={styles.input} />
                                </div>

                                <div>
                                    <label style={styles.inputLabel}>Nome Social (Opcional)</label>
                                    <input type="text" placeholder="Como prefere ser chamado" value={nomeSocial} onChange={e => setNomeSocial(e.target.value)} style={styles.input} />
                                </div>

                                <div>
                                    <label style={styles.inputLabel}>E-mail de Acesso *</label>
                                    <input type="email" value={email} onChange={e => setEmail(e.target.value)} required style={styles.input} />
                                </div>

                                <div>
                                    <label style={styles.inputLabel}>Alterar Senha</label>
                                    <input type="password" placeholder="Digite apenas para modificar" value={senha} onChange={e => setSenha(e.target.value)} style={styles.input} />
                                </div>

                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginTop: '10px' }}>
                                    <button type="button" onClick={() => setEditando(false)} style={styles.btnCancelar}>Cancelar</button>
                                    <button type="submit" style={styles.btnSalvar}>Gravar Dados</button>
                                </div>
                            </form>
                        </div>
                    )}

                </div>
            </div>
        </div>
    );
}

const styles = {
    input: { padding: '12px', borderRadius: '8px', border: '1px solid #333', backgroundColor: '#262626', color: '#fff', fontSize: '15px', width: '100%', boxSizing: 'border-box' },
    inputLabel: { display: 'block', marginBottom: '6px', fontSize: '13px', color: '#94a3b8', fontWeight: '600' },
    cardInfo: { padding: '12px', backgroundColor: '#161616', borderRadius: '8px', border: '1px solid #262626', display: 'flex', flexDirection: 'column', gap: '4px' },
    cardLabel: { fontSize: '10px', color: '#64748b', fontWeight: 'bold' },
    btnSalvar: { padding: '14px', backgroundColor: '#00d094', color: '#121212', border: 'none', borderRadius: '25px', fontWeight: 'bold', fontSize: '15px', cursor: 'pointer' },
    btnAlterar: { padding: '12px 24px', backgroundColor: '#2d2d2d', color: '#fff', border: '1px solid #444', borderRadius: '25px', fontWeight: 'bold', fontSize: '14px', cursor: 'pointer' },
    btnCancelar: { padding: '14px', backgroundColor: 'transparent', color: '#fff', border: '1px solid #444', borderRadius: '25px', fontWeight: 'bold', fontSize: '15px', cursor: 'pointer' },
    btnDeletar: { padding: '10px 20px', backgroundColor: 'transparent', color: '#ef4444', border: '1px solid #ef4444', borderRadius: '20px', cursor: 'pointer', fontWeight: 'bold', fontSize: '13px' }
};