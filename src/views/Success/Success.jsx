import { useLocation, useNavigate } from 'react-router-dom';
import { sendFilesToCreateJob } from '../../utils/sendFilesToCreateJob'; // Ajusta la ruta según donde esté tu función
import { useEffect } from 'react';
import { useState } from 'react';

export const Success = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);

    //con proceso de pago
    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const paymentStatus = params.get('collection_status');

        if (paymentStatus === 'approved') {

            //Recuperar el token de localStorage
            const token = localStorage.getItem('token')

            // Iniciar el loader
            setLoading(true);

            //Llamar a sendFilesToCreateJob cuando el pago sea aprobado
            sendFilesToCreateJob(token)
                .then(() => {
                    // Redirigir a la página principal después de 3 segundos
                    const timeout = setTimeout(() => {
                        // navigate('/'); 
                    }, 2000);
                    
                    // Limpiar el timeout si el componente se desmonta
                    return () => clearTimeout(timeout);
                })
                .catch((error) => {
                    console.error('Error en el proceso después del pago:', error);
                });
        } else {
            localStorage.clear();
            console.log('Pago no aprobado');
            // Redirigir inmediatamente si el pago no fue aprobado
            // navigate('/');
        }
    }, [location, navigate]);

    return (
        <div className='flex flex-col items-center justify-center h-screen'>
            {loading ? ( // Mostrar el loader si está cargando
                <div className="loader"></div> // Aquí va el loader
            ) : (
                <>
                    <h1 className='text-2xl font-bold'>Publicación Exitosa</h1>
                    <p className='text-lg'>Gracias por confiar.</p>
                    <p className='text-4xl'>❤️‍🔥</p>
                </>
            )}
        </div>
    );
};
