import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000'; // Cambia si es necesario

// Configurar Axios
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
});

// Interceptor para añadir el token
api.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Funciones para el servidor
export const login = async (username, password) => {
    const params = new URLSearchParams(); // Crear un formulario
    params.append("username", username);
    params.append("password", password);
  
    const { data } = await api.post('/token', params); // Enviar el formulario como body
    localStorage.setItem('token', data.access_token); // Guardar el token en el localStorage
  };
  

export const getItems = async () => {
  const { data } = await api.get('/items');
  return data.items;
};

export const createItem = async item => {
  const { data } = await api.post('/items', item);
  return data.created_item;
};

export const updateItem = async (id, item) => {
  const { data } = await api.put(`/items/${id}`, item);
  return data.updated_item;
};

export const deleteItem = async id => {
  const { data } = await api.delete(`/items/${id}`);
  return data.message;
};
