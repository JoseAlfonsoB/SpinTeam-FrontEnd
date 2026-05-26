const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

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

export const api = {
  async post(path, body) {
    const response = await fetch(`${API_URL}${path}`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(body),
    });
    
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || 'Ha ocurrido un error en la solicitud');
    }
    
    return data;
  },

  async get(path) {
    const response = await fetch(`${API_URL}${path}`, {
      method: 'GET',
      headers: getHeaders(),
    });
    
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || 'Ha ocurrido un error en la solicitud');
    }
    
    return data;
  }
};

export const registerUser = (userData) => api.post('/api/auth/register', userData);
export const loginUser = (credentials) => api.post('/api/auth/login', credentials);
export const getMe = () => api.get('/api/auth/me');
export const logoutUser = () => api.post('/api/auth/logout', {});
