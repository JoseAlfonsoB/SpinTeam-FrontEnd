const AUTH_API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';
const SESSION_API_URL = import.meta.env.VITE_SESSION_API_URL || 'http://localhost:4000';

const getHeaders = () => {
  const token = localStorage.getItem('token');
  const headers = {
    'Content-Type': 'application/json',
    'ngrok-skip-browser-warning': 'true', // Salta la pantalla de advertencia de ngrok para llamadas API
  };
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  return headers;
};

// Función auxiliar para no repetir la lógica del fetch
const makeRequest = async (url, options) => {
  const response = await fetch(url, options);
  const data = await response.json();
  
  if (!response.ok) {
    throw new Error(data.message || 'Ha ocurrido un error en la solicitud');
  }
  return data;
};

export const api = {
  // Ahora acepta un tercer parámetro opcional: baseURL
  async post(path, body, baseURL = AUTH_API_URL) {
    return makeRequest(`${baseURL}${path}`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(body),
    });
  },

  async get(path, baseURL = AUTH_API_URL) {
    return makeRequest(`${baseURL}${path}`, {
      method: 'GET',
      headers: getHeaders(),
    });
  }
};;

export const registerUser = (userData) => api.post('/api/auth/register', userData);
export const loginUser = (credentials) => api.post('/api/auth/login', credentials);
export const getMe = () => api.get('/api/auth/me');
export const logoutUser = () => api.post('/api/auth/logout', {});

export const createSessionService = (sessionData) => api.post('/api/sessions/create', sessionData, SESSION_API_URL);
export const getMySessionsService = () => api.get('/api/sessions/my-sessions', SESSION_API_URL);
export const getSessionByCodeService = (code) => api.get(`/api/sessions/room/${code}`, SESSION_API_URL);

// Añade esta línea al final del archivo
export const generateTeamsService = (code) => api.post(`/api/sessions/room/${code}/generate`, {}, SESSION_API_URL);