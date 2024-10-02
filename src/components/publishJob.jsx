import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { initiatePayment } from '../routes/jobRoutes';
import { set } from 'idb-keyval';

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

    const [isOpen, setIsOpen] = useState(false);

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
        setProfileImage(file);
        if (file) {
            setProfilePreview(URL.createObjectURL(file));
        }
    };
    
    const handleInstagramChange = (event) => {
        const file = event.target.files[0];
        setInstagramImage(file);
        if (file) {
            setInstagramPreview(URL.createObjectURL(file));
        }
    };

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
            formDataWithFile.profileImage = profileImage.name; // O alguna referencia que necesites
        }
    
        if (instagramImage) {
            await set('instagramImage', instagramImage); // Guarda el instagramImage
            formDataWithFile.instagramImage = instagramImage.name; // O alguna referencia que necesites
        }
    
        // try {
        //     // Guardar los datos del formulario en localStorage
        //     localStorage.setItem('formDataWithFile', JSON.stringify(formDataWithFile));
    
        //     // Iniciar el proceso de pago
        //     const paymentResponse = await initiatePayment();
    
        //     if (paymentResponse) {
        //         // Redirigir al link de pago
        //         window.location.href = paymentResponse;
        //     } else {
        //         console.error('Error al procesar el pago');
        //     }

        // } catch (error) {
        //     console.error('Error al publicar el trabajo:', error);
        // }

        //sin proceso de pago
        try {
            // Guardar los datos del formulario en localStorage
            localStorage.setItem('formDataWithFile', JSON.stringify(formDataWithFile));
            
            // Redirigir a la página de éxito
            window.location.href = '/success'; // Ajusta la ruta según sea necesario
        } catch (error) {
            console.error('Error al enviar el trabajo sin pagar:', error);
        }


    };
    

    return (
        <div className="flex flex-col items-center p-6">
            
            <h1 className="text-4xl font-bold mb-4 text-purple-700">Publicar Trabajo</h1>

            <form onSubmit={handleSubmit} className="w-full max-w-md">

                <div id="profile" className="mb-4">
                    <label className="block text-purple-700 text-sm font-bold mb-2" htmlFor="profile">
                        Imagen de la empresa (opcional)
                    </label>
                    <div className="flex items-center justify-between">
                        <label className="flex items-center justify-center bg-purple-700 text-white font-bold py-2 px-4 rounded-lg cursor-pointer">
                            Elegir Archivo
                            <input
                                type="file"
                                id="profileImage"
                                name="profileImage"
                                onChange={handleProfileChange}
                                className="hidden"
                            />
                        </label>
                        {/* Vista previa de la imagen */}
                        {profilePreview && (
                            <img
                                src={profilePreview}
                                alt="Vista previa"
                                className="w-24 h-24 rounded-full border-2 border-purple-700 ml-4"
                            />
                        )}
                    </div>
                </div>

                <div id="instagram" className="mb-4">
                    <label className="block text-purple-700 text-sm font-bold mb-2" htmlFor="instagram">
                        Imagen de instagram (opcional)
                    </label>
                    <div className="items-center justify-between">
                        <label className="flex items-center justify-center bg-purple-700 text-white font-bold py-2 px-4 rounded-lg cursor-pointer">
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
                                className="w-full mt-4 border-2 border-purple-700"
                            />
                        )}
                    </div>
                </div>

                <div id="title" className="mb-4">
                    <label className="block text-purple-700 text-sm font-bold mb-2" htmlFor="title">
                        Posicion
                    </label>
                    <input
                        placeholder='Ej: Electricista'
                        type="text"
                        id="title"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        className="appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        required
                    />
                </div>

                <div id="description" className="mb-4">
                    <label className="block text-purple-700 text-sm font-bold mb-2" htmlFor="description">
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
                        className=" appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        rows="20"
                        required
                    ></textarea>
                </div>

                <div id="location" className="mb-4">
                    <label className="block text-purple-700 text-sm font-bold mb-2" htmlFor="location">
                        Ubicación
                    </label>
                    <input
                        placeholder='Ej: Maldonado, Montevideo, etc'
                        type="text"
                        id="location"
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                        className="appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        required
                    />
                </div>

                <div id="company" className="mb-4">
                    <label className="block text-purple-700 text-sm font-bold mb-2" htmlFor="company">
                        Empresa
                    </label>
                    <input
                        placeholder='Ej: Turboelectric S.A'
                        type="text"
                        id="company"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        className="appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        required
                    />
                </div>

                <div id="salary" className="mb-4">
                    <label className="block text-purple-700 text-sm font-bold mb-2" htmlFor="salary">
                        Salario
                    </label>
                    <input
                        placeholder='Ej: 40000 (solo numeros)'
                        type="text"
                        id="salary"
                        name="salary"
                        value={formData.salary}
                        onChange={handleChange}
                        className="appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        required
                    />
                </div>

                <div id="requirements" className="mb-4">
                    <label className="block text-purple-700 text-sm font-bold mb-2" htmlFor="requirements">
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
                        className="appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        rows="10"
                        required
                    ></textarea>
                </div>

                <div id="phone" className="mb-4">
                    <label className="block text-purple-700 text-sm font-bold mb-2" htmlFor="phone">
                        Whatsapp (opcional)
                    </label>
                    <input
                        placeholder='Ej: 098765432 (solo numeros)'
                        type="text"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>

                <div id="email" className="mb-4">
                    <label className="block text-purple-700 text-sm font-bold mb-2" htmlFor="email">
                        Correo Electrónico
                    </label>
                    <input
                        placeholder='Ej: turboelectric@gmail.com'
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        required
                    />
                </div>

                <div id="website" className="mb-4">
                    <label className="block text-purple-700 text-sm font-bold mb-2" htmlFor="website">
                        Sitio Web (opcional)
                    </label>
                    <input
                        placeholder='Ej: www.turboelectric.com'
                        type="text"
                        id="website"
                        name="website"
                        value={formData.website}
                        onChange={handleChange}
                        className="appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>

                <div id="submit" className='flex justify-between'>
                <button
                    type="submit"
                    className="bg-purple-700 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline"
                >
                    Pagar Y Publicar Trabajo
                </button>

                <Link to="/" className='bg-purple-700 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline'>Volver</Link>
                </div>
            </form>
            

        </div>
    );
};

