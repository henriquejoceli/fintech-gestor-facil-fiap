import axios from 'axios';

const hostname = window.location.hostname;
let backendURL = 'http://localhost:8080/api';

if (hostname.includes('github.dev')) {
  const codespaceId = hostname.split('-5173.')[0]; 
  backendURL = `https://${codespaceId}-8080.app.github.dev/api`;
}

const api = axios.create({
  baseURL: backendURL,
});

export default api;