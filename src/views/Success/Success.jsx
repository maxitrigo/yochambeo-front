import { useLocation, useNavigate } from 'react-router-dom';
import { sendFilesToCreateJob } from '../../utils/sendFilesToCreateJob'; // Ajusta la ruta según donde esté tu función
import { useEffect } from 'react';

export const Success = ({ createJob }) => {
    const location = useLocation();
    const navigate = useNavigate();

    // //con proceso de pago
    // useEffect(() => {
    //     const params = new URLSearchParams(location.search);
    //     const paymentStatus = params.get('collection_status');

    //     if (paymentStatus === 'approved') {
    //         // 1. Llamar a sendFilesToCreateJob cuando el pago sea aprobado
    //         sendFilesToCreateJob(createJob)
    //             .then(() => {
    //                 // Redirigir a la página principal después de 5 segundos
    //                 const timeout = setTimeout(() => {
    //                     navigate('/'); 
    //                 }, 5000);
                    
    //                 // Limpiar el timeout si el componente se desmonta
    //                 return () => clearTimeout(timeout);
    //             })
    //             .catch((error) => {
    //                 console.error('Error en el proceso después del pago:', error);
    //             });
    //     } else {
    //         console.log('Pago no aprobado');
    //         // Redirigir inmediatamente si el pago no fue aprobado
    //         navigate('/');
    //     }
    // }, [location, navigate, createJob]);

        // sin proceso de pago
        useEffect(() => {
            // 1. Llamar a sendFilesToCreateJob sin comprobar el estado del pago
            sendFilesToCreateJob(createJob)
                .then(() => {
                    // 2. Redirigir a la página principal después de 3 segundos
                    setTimeout(() => {
                        navigate('/');
                    }, 3000);
                })
                .catch((error) => {
                    console.error('Error al enviar el trabajo:', error);
                });
        }, [navigate, createJob]);

    return (
        <div className='flex flex-col items-center justify-center h-screen'>
            <h1 className='text-2xl font-bold'>Publicación Exitosa</h1>
            <p className='text-lg'>Gracias por tu pago.</p>
            <p className='text-4xl'>❤️‍🔥</p>
        </div>
    );
};
