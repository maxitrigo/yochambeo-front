import { get } from 'idb-keyval';
import { createJob } from '../routes/jobRoutes';

export const sendFilesToCreateJob = async () => {
    // 1. Recuperar los datos del formulario de localStorage
    const storedFormData = JSON.parse(localStorage.getItem('formDataWithFile'));
    
    // 2. Recuperar imágenes de IndexedDB
    const profileImage = await get('profileImage'); // Aquí se asume que has guardado 'profileImage' en IndexedDB
    const instagramImage = await get('instagramImage'); // Aquí se asume que has guardado 'instagramImage' en IndexedDB

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
        formDataWithFile.append('files', profileImage); // Asegúrate de que profileImage sea un archivo
    }

    if (instagramImage) {
        formDataWithFile.append('files', instagramImage); // Asegúrate de que instagramImage sea un archivo
    }

    // 6. Llamar a la función createJob con el FormData
    try {
        await createJob(formDataWithFile);
        console.log('Trabajo creado con éxito');
    } catch (error) {
        console.error('Error al crear el trabajo:', error);
    }
};
