import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { createJobAdmin } from '../routes/jobRoutes';
import { convertBase64ToFile } from '../utils/images';
import { useLocation } from 'react-router-dom';


export const AdminPublish = () => {

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
            navigate('/crop', { state: { image: image, type: 'profile', from: 'admin' } });
        }
    };
    
    const handleInstagramChange = (event) => {
        const file = event.target.files[0];
        // setInstagramImage(file);
        if (file) {
            // setInstagramPreview(URL.createObjectURL(file));
            const image = URL.createObjectURL(file);
            navigate('/crop', { state: { image: image, type: 'instagram', from: 'admin' } });
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
    
        const formDataWithFile = new FormData();

        // Agregar los campos del formulario al formData
        formDataWithFile.append('title', formData.title);
        formDataWithFile.append('description', formData.description);
        formDataWithFile.append('location', formData.location);
        formDataWithFile.append('company', formData.company);
        formDataWithFile.append('salary', formData.salary);
        formDataWithFile.append('requirements', formData.requirements);
        formDataWithFile.append('phone', formData.phone);
        formDataWithFile.append('email', formData.email);
        formDataWithFile.append('website', formData.website);
        
        
    
        if (profileImage) {
            formDataWithFile.append('files', profileImage); // Asegúrate de que profileImage sea un archivo
        }
    
        if (instagramImage) {
            formDataWithFile.append('files', instagramImage); // Asegúrate de que instagramImage sea un archivo
        }

        //sin proceso de pago
        try {
            const token = localStorage.getItem('token');
            
            createJobAdmin(formDataWithFile, token);
        } catch (error) {
            console.error('Error al enviar el trabajo sin pagar:', error);
        }


    };

    const volverOnClick = () => {
        setInstagramPreview(null)
        setProfilePreview(null)
    };
    

    return (
        <div className="flex flex-col items-center p-4">
            <div className='flex flex-row justify-between w-full mb-8 md:w-1/2'>
            <h1 className="text-2xl font-bold">Publicar Trabajo</h1>
            <button onClick={volverOnClick} className='bg-black text-white font-bold py-2 px-4 rounded-2xl focus:outline-none focus:shadow-outline'>Limpiar</button>
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
                        placeholder=''
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
                        placeholder=''
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