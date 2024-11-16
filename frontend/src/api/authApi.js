import axios from 'axios';


const api = axios.create({
  baseURL: 'http://localhost:5000/api/auth', 
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const { response } = error;
    if (response) {
      console.error(`API Error: ${response.status} - ${response.data.message}`);
    } else {
      console.error('Network Error');
    }
    return Promise.reject(error);
  }
);

export default api;
