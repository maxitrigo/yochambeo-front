import axios from 'axios';

const API_URL = 'http://18.228.2.217:80';

export const getAllJobs = async (page = 1) => {
  const limit = 10; // O el número que desees
  const response = await axios.get(`${API_URL}/jobs?page=${page}&limit=${limit}`);
  return response.data;
};

export const createJob = async (formData) => {
    try {
        const response = await axios.post(`${API_URL}/jobs`, formData);
        //Manejo de respuesta exitosa
        console.log('Trabajo creado exitosamente:', response.data);
        // Redireccionar o hacer algo más
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
    }
};

export const initiatePayment = async () => {
  const response = await fetch(`${API_URL}/mercadopago/create-preference`, { method: 'POST'});
  const data = await response.json();
  console.log(data);
  return data.init_point;
}


