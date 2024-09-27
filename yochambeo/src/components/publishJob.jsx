import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { createJob } from '../routes/jobRoutes';

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

    const [file, setFile] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setFile(file);
        if (file) {
            setImagePreview(URL.createObjectURL(file));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const formDataWithFile = new FormData();
        formDataWithFile.append('title', formData.title);
        formDataWithFile.append('description', formData.description);
        formDataWithFile.append('location', formData.location);
        formDataWithFile.append('company', formData.company);
        formDataWithFile.append('salary', formData.salary);
        formDataWithFile.append('requirements', formData.requirements);
        formDataWithFile.append('phone', formData.phone);
        formDataWithFile.append('email', formData.email);
        formDataWithFile.append('website', formData.website);
        if (file) {
            formDataWithFile.append('file', file);
        }
        createJob(formDataWithFile);
        navigate('/');
    };

    return (
        <div className="flex flex-col items-center p-6">
            <h1 className="text-4xl font-bold mb-4 text-purple-700">Publicar Trabajo</h1>
            <form onSubmit={handleSubmit} className="w-full max-w-md">
            <div className="mb-4">
                    <label className="block text-purple-700 text-sm font-bold mb-2" htmlFor="image">
                        Imagen de la empresa (opcional)
                    </label>
                    <div className="flex items-center justify-between">
                        <label className="flex items-center justify-center bg-purple-700 text-white font-bold py-2 px-4 rounded-lg cursor-pointer">
                            Elegir Archivo
                            <input
                                type="file"
                                id="image"
                                name="image"
                                onChange={handleFileChange}
                                className="hidden"
                            />
                        </label>
                        {/* Vista previa de la imagen */}
                        {imagePreview && (
                            <img
                                src={imagePreview}
                                alt="Vista previa"
                                className="w-24 h-24 rounded-full border-2 border-purple-700 ml-4"
                            />
                        )}
                    </div>
                </div>
                <div className="mb-4">
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

                <div className="mb-4">
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

                <div className="mb-4">
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

                <div className="mb-4">
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

                <div className="mb-4">
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

                <div className="mb-4">
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

                <div className="mb-4">
                    <label className="block text-purple-700 text-sm font-bold mb-2" htmlFor="phone">
                        Teléfono
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

                <div className="mb-4">
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

                <div className="mb-4">
                    <label className="block text-purple-700 text-sm font-bold mb-2" htmlFor="website">
                        Sitio Web
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

                <div className='flex justify-between'>
                <button
                    type="submit"
                    className="bg-purple-700 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline"
                >
                    Publicar Trabajo
                </button>

                <Link to="/" className='bg-purple-700 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline'>Volver</Link>
                </div>
            </form>
        </div>
    );
};

