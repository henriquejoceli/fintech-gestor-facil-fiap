import axios from 'axios';

// Detecta onde o front-end está rodando
const hostname = window.location.hostname;
let backendURL = 'http://localhost:8080/api'; // URL Padrão para Desenvolvimento Local (PC)

// Se estiver rodando dentro do GitHub Codespaces, monta a URL do proxy dinamicamente
if (hostname.includes('github.dev')) {
  // Pega o ID do Codespaces (ex: organic-guacamole-v66x5vvqrrpfxp96)
  const codespaceId = hostname.split('-5173.')[0]; 
  backendURL = `https://${codespaceId}-8080.app.github.dev/api`;
}

const api = axios.create({
  baseURL: backendURL,
});

export default api;