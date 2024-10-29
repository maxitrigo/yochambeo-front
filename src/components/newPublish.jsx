import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createJobAdmin } from '../routes/jobRoutes';
import { convertBase64ToFile } from '../utils/images';


export const NewPublish = () => {

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

    const inputData = [
        {
            label: "Posicion",
            name: "title",
            type: "text",
            placeholder: "Ej. Electricista",
            id: "Posicion"
        },
        {
            label: "Empresa",
            name: "company",
            type: "text",
            placeholder: "Ej. Google",
            id: "Empresa"
        },
        {
            label: "Salario",
            name: "salary",
            type: "text",
            placeholder: "Ej. 1000",
            id: "Salario"
        },
        {
            label: "Whatsapp (Opcional)",
            name: "phone",
            type: "text",
            placeholder: "Ej. 123456789",
            id: "Whatsapp"
        },
        {
            label: "Email (Opcional)",
            name: "email",
            type: "text",
            placeholder: "Ej. 123456789",
            id: "Email"
        },
        {
            label: "Sitio Web (Opcional)",
            name: "website",
            type: "text",
            placeholder: "Ej. https://tusitio.com",
            id: "Sitio Web"
        },
        {
            label: "Ubicación",
            name: "location",
            type: "text",
            placeholder: "Ej. Montevideo, Maldonado",
            id: "Ubicación"
        }
    ]
    const textareaData = [
        {
            label: "Descripción",
            name: "description",
            type: "text",
            placeholder: "Escribir...",
            id: "Descripción",
        },
        {
            label: "Requisitos",
            name: "requirements",
            type: "text",
            placeholder: "Escribir...",
            id: "Requisitos",
        }
    ]

    const imagesData = [
        {
            label: "Imagen de perfil (Opcional)",
            name: "Imagen de perfil",
            type: "file",
            id: "Imagen de perfil",
            value: profileImage,
            src: profilePreview,
            alt: "Imagen de perfil",
            className: "w-24 h-24 rounded-full border border ml-4"
        },
        {
            label: "Imagen de Instagram (Opcional)",
            name: "Imagen de Instagram",
            type: "file",
            id: "Imagen de Instagram",
            value: instagramImage,
            src: instagramPreview,
            alt: "Imagen de Instagram",
            className: "w-full mt-4 rounded-2xl border border-gray-200"

        }
    ]

    const handleChange = (event) => {
        const {name, value} = event.target
        setFormData({
            ...formData,
            [name]: value,
        })
    }

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

    const handleSubmit = async (event) => {
        event.preventDefault();
    
        const formDataWithFile = new FormData();

        // Agregar los campos del formulario al formData
        formDataWithFile.append('title', formData.title);
        const fullDescription = `${formData.description}\nAccede a mas trabajos como este en https://yochambeo.com`;
        formDataWithFile.append('description', fullDescription);
        formDataWithFile.append('location', formData.location);
        formDataWithFile.append('company', formData.company);
        formDataWithFile.append('salary', formData.salary);
        formDataWithFile.append('requirements', formData.requirements);
        formDataWithFile.append('phone', formData.phone);
        formDataWithFile.append('email', formData.email);
        formDataWithFile.append('website', formData.website);
        
        
    
        if (profileImage) {
            formDataWithFile.append('profileImage', profileImage); // Asegúrate de que profileImage sea un archivo
        }
    
        if (instagramImage) {
            formDataWithFile.append('instagramImage', instagramImage); // Asegúrate de que instagramImage sea un archivo
        }

        //sin proceso de pago
        try {
            const token = localStorage.getItem('token');
            
            createJobAdmin(formDataWithFile, token);
        } catch (error) {
            console.error('Error al enviar el trabajo sin pagar:', error);
        }


    };

    const cleanOnClick = () => {
        localStorage.clear();
        setInstagramPreview(null)
        setProfilePreview(null)
        navigate('/');
    };
    
    return (
        <div className="flex flex-col items-center p-4">
            <div className='flex flex-row justify-between w-full mb-8 md:w-1/2'>
            <h1 className="text-2xl font-bold">Publicar Trabajo</h1>
            <button onClick={cleanOnClick} className='bg-black text-white font-bold py-2 px-4 rounded-2xl focus:outline-none focus:shadow-outline'>Limpiar</button>
            </div>
            <form onSubmit={handleSubmit} className="w-full max-w-md">
                {imagesData.map((element) => {
                    return (
                        <div key={element.id} className="flex flex-col items-center mb-4">
                        <div className="mb-4">
                            <label className="block text-sm font-bold mb-2">{element.label}</label>
                            <label className="flex items-center justify-center bg-black text-white font-bold py-2 px-4 rounded-2xl cursor-pointer transition-transform transform active:scale-95">Elegir imagen<input type={element.type} id={element.id} name={element.name} onChange={element.name === 'Imagen de perfil' ? handleProfileChange : handleInstagramChange} className="hidden"/></label>
                        </div> {element.src && <img src={element.src} alt={element.alt} className={element.className} />}
                        </div>
                    )
                })}
                {inputData.map((element) => {
                    return (
                        <div key={element.id} className="mb-4">
                            <label className="block text-sm font-bold mb-2">{element.label}</label>
                            <input className="appearance-none border rounded-2xl w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type={element.type} placeholder={element.placeholder} id={element.id} name={element.name} onChange={handleChange} value={formData[element.name]}/>
                        </div>
                    )
                })}
                {textareaData.map((element) => {
                    return (
                        <div key={element.id} className="mb-4">
                            <label className="block text-sm font-bold mb-2">{element.label}</label>
                            <textarea className="appearance-none border rounded-2xl w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" rows="10" type={element.type} placeholder={element.placeholder} id={element.id} name={element.name} onChange={handleChange} value={formData[element.name]}/>
                        </div>
                    )
                })}
                <div className='flex flex-col items-center justify-center p-6'>
                    <button className="bg-black text-white font-bold py-2 px-4 rounded-2xl focus:outline-none focus:shadow-outline transition-transform transform active:scale-95" type="submit">Publicar</button>
                </div>
            </form>
        </div>
    );
};