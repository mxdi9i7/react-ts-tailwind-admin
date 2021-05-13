import axios from 'axios';
const apiUrl = process.env.REACT_APP_API_URL;

const customAxios = axios.create({
  baseURL: apiUrl,
  timeout: 10000,
});

customAxios.interceptors.request.use((config) => {
  const token = getLocalToken();
  if (token) {
    config.headers.common.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const getLocalToken = (): string => {
  const localToken = localStorage.getItem('state.authToken');
  if (localToken) {
    const cleanedToken = localToken.replaceAll('"', '');
    return cleanedToken;
  }
  return '';
};

export const clearToken = () => {
  localStorage.removeItem('state.authToken');
};

export default customAxios;
