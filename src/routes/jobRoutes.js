import axios from 'axios';

const API_URL = 'https://api.yochambeo.com';
// const API_URL = 'http://localhost:3000';

export const getAllJobs = async (page = 1) => {
  const limit = 20; // O el número que desees
  const response = await axios.get(`${API_URL}/jobs?page=${page}&limit=${limit}`);
  return response.data;
};

export const createJob = async (formData, token) => {
    try {
        // Llamada a la API para crear un trabajo con el token en el header
        const response = await axios.post(`${API_URL}/jobs`, formData, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
    } catch (error) {
        if (error.response) {
            // El servidor respondió con un código de estado diferente a 2xx
            console.error('Error en la respuesta del servidor:', error.response.data);
            alert(`Error: ${error.response.data.message || 'Error desconocido'}`);
        } else if (error.request) {
            // La solicitud fue realizada, pero no se recibió respuesta
            console.error('No se recibió respuesta del servidor:', error.request);
            alert('No se recibió respuesta del servidor.');
        } else {
            // Algo salió mal al configurar la solicitud
            console.error('Error al configurar la solicitud:', error.message);
            alert('Error al enviar la solicitud.');
        }
        throw error;
    }
};

export const createJobAdmin = async (formData, token) => {
    try {
        
        // Llamada a la API para crear un trabajo con el token en el header
        const response = await axios.post(`${API_URL}/auth/publish`, formData, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        alert('Trabajo creado exitosamente');
    } catch (error) {
        if (error.response) {
            // El servidor respondió con un código de estado diferente a 2xx
            console.error('Error en la respuesta del servidor:', error.response.data);
            alert(`Error: ${error.response.data.message || 'Error desconocido'}`);
        } else if (error.request) {
            // La solicitud fue realizada, pero no se recibió respuesta
            console.error('No se recibió respuesta del servidor:', error.request);
            alert('No se recibió respuesta del servidor.');
        } else {
            // Algo salió mal al configurar la solicitud
            console.error('Error al configurar la solicitud:', error.message);
            alert('Error al enviar la solicitud.');
        }
        throw error;
    }
};

export const initiatePayment = async () => {
  const response = await fetch(`${API_URL}/mercadopago/create-preference`, { method: 'POST'});
  const data = await response.json();

  // Guardar el token en localStorage
  localStorage.setItem('token', data.token);

  // Devolver ruta para redireccionar a Mercado Pago
  return data.init_point;
}


