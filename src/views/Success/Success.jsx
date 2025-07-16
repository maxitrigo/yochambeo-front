import { useLocation, useNavigate } from 'react-router-dom';
import { sendFilesToCreateJob } from '../../utils/sendFilesToCreateJob'; // Ajusta la ruta según donde esté tu función
import { useEffect } from 'react';
import { useState } from 'react';

export const Success = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

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
                    setLoading(false);
                    // Redirigir a la página principal después de 3 segundos
                    const timeout = setTimeout(() => {
                        navigate('/'); 
                    }, 2000);
                    
                    // Limpiar el timeout si el componente se desmonta
                    return () => clearTimeout(timeout);
                })
                .catch((error) => {
                    setError(true);
                    setLoading(false);
                    console.error('Error en el proceso después del pago:', error);
                    const timeout = setTimeout(() => {
                        navigate('/'); 
                    }, 2000);
                    return () => clearTimeout(timeout);
                });
        } else {
            localStorage.clear();
            setError(true)
            console.log('Pago no aprobado');
            // Redirigir inmediatamente si el pago no fue aprobado
            navigate('/');
        }
    }, [location, navigate]);

    return (
        <div className='flex flex-col items-center justify-center h-screen'>
            {loading ? (
                <div className='flex flex-col items-center justify-center'>
                    <h1 className='text-2xl font-bold'>Publicando...</h1>
                    <div className="loader"></div>
                    <p className='text-lg'>Gracias por confiar.</p>
                    <p className='text-4xl'>❤️‍🔥</p>
                </div>
            ) : error ? (
                <div className='flex flex-col items-center justify-center'>
                    <h1 className='text-2xl font-bold text-red-500'>Error al publicar</h1>
                    <p className='text-lg'>Intentalo de nuevo más tarde.</p>
                </div>
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
