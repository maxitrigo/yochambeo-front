import axios from 'axios';

// const API_URL = 'https://api.yochambeo.com/auth';
const API_URL = 'http://localhost:3000/auth';

export const userRegister = async (email, password) => {
    try{
        const response = await axios.post(`${API_URL}/register`, {
             email, password 
            });

        const isAdmin = response.data.isAdmin
        const isLogged = response.data.isLogged

        return {isAdmin, isLogged};

    } catch (error) {
        if (error.response) {
            // El servidor respondió con un código de estado diferente a 2xx
            console.error('Error en la respuesta del servidor:', error.response.data);
        }
    }
}

export const userLogin = async (email, password) => {
    try{
        const response = await axios.post(`${API_URL}/signIn`, { email, password });
        const token = response.data.token
        const isAdmin = response.data.isAdmin
        const isLogged = response.data.isLogged

        return {token, isAdmin, isLogged};

    } catch (error) {
        if (error.response) {
            // El servidor respondió con un código de estado diferente a 2xx
            console.error('Error en la respuesta del servidor:', error.response.data);
        }
    }
}