import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { initiatePayment } from '../routes/jobRoutes';
import { set, clear } from 'idb-keyval';
import { useLocation } from 'react-router-dom';
import { convertBase64ToFile } from '../utils/images';


export const PublishJob = () => {

    const navigate = useNavigate();
    
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        location: '',
        company: '',
        salary: '',
        requirements: '',
        phone: '',
        email: '',
        website: '',
    });

    const { state } = useLocation();

    const [profileImage, setProfileImage] = useState(null);
    const [instagramImage, setInstagramImage] = useState(null);
    const [profilePreview, setProfilePreview] = useState(null);
    const [instagramPreview, setInstagramPreview] = useState(null);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleProfileChange = (event) => {
        const file = event.target.files[0];
        // setProfileImage(file);
        if (file) {
            // setProfilePreview(URL.createObjectURL(file));
            const image = URL.createObjectURL(file);
            navigate('/crop', { state: { image: image, type: 'profile', from: 'publish' } });
        }
    };
    
    const handleInstagramChange = (event) => {
        const file = event.target.files[0];
        // setInstagramImage(file);
        if (file) {
            // setInstagramPreview(URL.createObjectURL(file));
            const image = URL.createObjectURL(file);
            navigate('/crop', { state: { image: image, type: 'instagram', from: 'publish' } });
        }
    };

    useEffect(() => {
        // Recuperar la vista previa de la imagen de perfil
        const profileBase64 = localStorage.getItem('profileBase64');
        const profileToFile = convertBase64ToFile(profileBase64, 'profilePreview.jpg');//convertimos la imagen nuevamente a un archivo
        if (profileBase64) {
            setProfileImage(profileToFile);
            setProfilePreview(profileBase64);
        }
    
        // Recuperar la vista previa de la imagen de Instagram
        const instagramBase64 = localStorage.getItem('instagramBase64');
        const instagramToFile = convertBase64ToFile(instagramBase64, 'instagramPreview.jpg');//convertimos la imagen nuevamente a un archivo
        if (instagramBase64) {
            setInstagramImage(instagramToFile);
            setInstagramPreview(instagramBase64);
        }
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();
    
        const formDataWithFile = {
            title: formData.title,
            description: formData.description,
            location: formData.location,
            company: formData.company,
            salary: formData.salary,
            requirements: formData.requirements,
            phone: formData.phone,
            email: formData.email,
            website: formData.website,
        };
    
        // Guardar las imágenes en IndexedDB usando idb-keyval
        if (profileImage) {
            await set('profileImage', profileImage); // Guarda el profileImage
            formDataWithFile.profileImage = profileImage.name; // alguna referencia
        }
    
        if (instagramImage) {
            await set('instagramImage', instagramImage); // Guarda el instagramImage
            formDataWithFile.instagramImage = instagramImage.name; //alguna referencia
        }
    
        try {
            // Guardar los datos del formulario en localStorage
            localStorage.setItem('formDataWithFile', JSON.stringify(formDataWithFile));
    
            // Iniciar el proceso de pago
            const paymentResponse = await initiatePayment();
    
            if (paymentResponse) {
                // Redirigir al link de pago
                location.assign(paymentResponse);
            } else {
                console.error('Error al procesar el pago');
                clear();
                localStorage.clear();
            }

        } catch (error) {
            console.error('Error al publicar el trabajo:', error);
        }

    };

    const volverOnClick = () => {
        localStorage.clear();
        navigate('/');
    };
    

    return (
        <div className="flex flex-col items-center p-4">
            <div className='flex flex-row justify-between mb-8 w-full md:w-3/4 lg:w-1/2'>
            <h1 className="text-2xl font-bold">Publicar Trabajo</h1>
            <button onClick={volverOnClick} className='bg-black text-white font-bold py-2 px-4 rounded-2xl focus:outline-none focus:shadow-outline'>Volver</button>
            </div>

            <form onSubmit={handleSubmit} className="w-full max-w-md">

                <div id="profile" className="mb-4 flex flex-row justify-between">
                    <div className="flex flex-col items-start">
                        <label className="block text-sm font-bold mb-2" htmlFor="profile">
                            Imagen de la empresa (opcional)
                        </label>
                        <label className="flex items-center justify-center bg-black text-white font-bold py-2 px-4 rounded-2xl cursor-pointer transition-transform transform active:scale-95">
                            Elegir Archivo
                            <input
                                type="file"
                                id="profileImage"
                                name="profileImage"
                                onChange={handleProfileChange}
                                className="hidden"
                            />
                        </label>
                    </div>
                        {/* Vista previa de la imagen */}
                        {profilePreview && (
                            <img
                                src={profilePreview}
                                alt="Vista previa"
                                className="w-24 h-24 rounded-full border border ml-4"
                            />
                        )}
                </div>

                <div id="instagram" className="mb-4">
                    <label className="block text-sm font-bold mb-2" htmlFor="instagram">
                        Imagen de instagram (opcional)
                    </label>
                    <p className="text-sm mb-2 text-gray-500">Se republicara junto a la descripcion en nuestra cuenta de instagram tamaño maximo 800 x 800 pixeles.</p>
                    <div className="items-center justify-between">
                        <label className="flex items-center justify-center bg-black text-white font-bold py-2 px-4 rounded-2xl cursor-pointer transition-transform transform active:scale-95">
                            Elegir Archivo
                            <input
                                type="file"
                                id="instagramImage"
                                name="instagramImage"
                                onChange={handleInstagramChange}
                                className="hidden"
                            />
                        </label>
                        {/* Vista previa de la imagen */}
                        {instagramPreview && (
                            <img
                                src={instagramPreview}
                                alt="Vista previa"
                                className="w-full mt-4"
                            />
                        )}
                    </div>
                </div>

                <div id="title" className="mb-4">
                    <label className="block text-sm font-bold mb-2" htmlFor="title">
                        Posicion
                    </label>
                    <input
                        placeholder='Ej: Electricista'
                        type="text"
                        id="title"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        className="appearance-none border rounded-2xl w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        required
                    />
                </div>

                <div id="description" className="mb-4">
                    <label className="block text-sm font-bold mb-2" htmlFor="description">
                        Descripción
                    </label>
                    <textarea
                        placeholder='Ej: Estamos en la búsqueda de un electricista calificado para unirse a nuestro equipo en Montevideo.

El candidato ideal debe contar con experiencia en instalaciones eléctricas residenciales y comerciales, y estar familiarizado con la normativa eléctrica vigente.

Responsabilidades:
Realizar instalaciones y reparaciones eléctricas en hogares y comercios.
Diagnosticar y solucionar problemas eléctricos.
Cumplir con las normativas de seguridad eléctrica en todos los trabajos.
Instalación de cableado, enchufes, interruptores, y sistemas de iluminación.
Mantenimiento preventivo de sistemas eléctricos.

Ofrecemos:
Sueldo competitivo de hasta $40,000 UYU mensuales.
Oportunidades de crecimiento dentro de la empresa.
Ambiente laboral seguro y profesional.
Contacto: Envíanos tu CV y pretensiones salariales a empleos@empresa.com o comunícate al +598 98765432 para más detalles.'
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        className=" appearance-none border rounded-2xl w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        rows="20"
                        required
                    ></textarea>
                </div>

                <div id="location" className="mb-4">
                    <label className="block text-sm font-bold mb-2" htmlFor="location">
                        Ubicación
                    </label>
                    <input
                        placeholder='Ej: Maldonado, Montevideo, etc'
                        type="text"
                        id="location"
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                        className="appearance-none border rounded-2xl w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        required
                    />
                </div>

                <div id="company" className="mb-4">
                    <label className="block text-sm font-bold mb-2" htmlFor="company">
                        Empresa
                    </label>
                    <input
                        placeholder='Ej: Turboelectric S.A'
                        type="text"
                        id="company"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        className="appearance-none border rounded-2xl w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        required
                    />
                </div>

                <div id="salary" className="mb-4">
                    <label className="block text-sm font-bold mb-2" htmlFor="salary">
                        Salario
                    </label>
                    <input
                        placeholder='Ej: 40000 (solo numeros)'
                        type="text"
                        id="salary"
                        name="salary"
                        value={formData.salary}
                        onChange={handleChange}
                        className="appearance-none border rounded-2xl w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        required
                    />
                </div>

                <div id="requirements" className="mb-4">
                    <label className="block text-sm font-bold mb-2" htmlFor="requirements">
                        Requisitos
                    </label>
                    <textarea
                        placeholder='Ej: Experiencia comprobable de al menos 3 años como electricista.
Conocimiento de planos eléctricos y herramientas del sector.
Capacidad para trabajar de manera independiente y en equipo.
Licencia y certificación de electricista vigente.
Vehículo propio (preferible).'
                        id="requirements"
                        name="requirements"
                        value={formData.requirements}
                        onChange={handleChange}
                        className="appearance-none border rounded-2xl w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        rows="10"
                        required
                    ></textarea>
                </div>

                <div id="phone" className="mb-4">
                    <label className="block text-sm font-bold mb-2" htmlFor="phone">
                        Whatsapp (opcional)
                    </label>
                    <input
                        placeholder='Ej: 098765432 (solo numeros)'
                        type="text"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="appearance-none border rounded-2xl w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>

                <div id="email" className="mb-4">
                    <label className="block text-sm font-bold mb-2" htmlFor="email">
                        Correo Electrónico
                    </label>
                    <input
                        placeholder='Ej: turboelectric@gmail.com'
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="appearance-none border rounded-2xl w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        required
                    />
                </div>

                <div id="website" className="mb-4">
                    <label className="block text-sm font-bold mb-2" htmlFor="website">
                        Sitio Web (opcional)
                    </label>
                    <input
                        placeholder='Ej: www.turboelectric.com'
                        type="text"
                        id="website"
                        name="website"
                        value={formData.website}
                        onChange={handleChange}
                        className="appearance-none border rounded-2xl w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>

                <div id="submit" className='flex flex-col items-center justify-center p-6'>
                    <p className='text-gray-400 mb-4 text-center'>Las publicaciones tienen un costo de $100 c/u</p>
                <button
                    type="submit"
                    className="bg-black text-white font-bold py-2 px-4 rounded-2xl focus:outline-none focus:shadow-outline transition-transform transform active:scale-95"
                >
                    Publicar
                </button>
                </div>
            </form>
            

        </div>
    );
};

