import { createJob } from '../routes/jobRoutes';
import { convertBase64ToFile } from './images';

export const sendFilesToCreateJob = async (token) => {
    // 1. Recuperar los datos del formulario de localStorage
    const storedFormData = JSON.parse(localStorage.getItem('formDataWithFile'));
    
    // 2. Recuperar imágenes de IndexedDB
    const profileBase64 = localStorage.getItem('profileBase64'); // Aquí se asume que has guardado 'profileImage' en IndexedDB
    const instagramBase64 = localStorage.getItem('instagramBase64'); // Aquí se asume que has guardado 'instagramImage' en IndexedDB
    
    const profileImage = convertBase64ToFile(profileBase64, 'profilePreview.jpg');//convertimos la imagen nuevamente a un archivo
    const instagramImage = convertBase64ToFile(instagramBase64, 'instagramPreview.jpg');//convertimos la imagen nuevamente a un archivo


    // 3. Crear un nuevo FormData para enviar
    const formDataWithFile = new FormData();
    
    // 4. Añadir datos del formulario a FormData
    if (storedFormData) {
        Object.entries(storedFormData).forEach(([key, value]) => {
            formDataWithFile.append(key, value);
        });
    }

    // 5. Agregar las imágenes a FormData
    if (profileImage) {
        formDataWithFile.append('profileImage', profileImage); // Asegúrate de que profileImage sea un archivo
    }

    if (instagramImage) {
        formDataWithFile.append('instagramImage', instagramImage); // Asegúrate de que instagramImage sea un archivo
    }

    // 6. Llamar a la función createJob con el FormData y el token.
    try {
        await createJob(formDataWithFile, token);
        console.log('Trabajo creado con éxito');
    } catch (error) {
        console.error('Error al crear el trabajo:', error);
        throw error;
    }
};
