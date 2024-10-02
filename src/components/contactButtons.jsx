import { AiOutlineMail } from 'react-icons/ai'; // Icono de correo
import { FaWhatsapp } from 'react-icons/fa'; // Icono de WhatsApp
import { FaGlobe } from 'react-icons/fa'; // Icono de Globe

const ContactButtons = ({ email, phone, website, title }) => {

    const areaCode = "+598"; // Código de área para Uruguay
    const formattedPhone = typeof phone === 'string' ? areaCode + phone.replace(/^0/, '').replace(/\D/g, '') : '';

    return (
        <div className="mt-4 flex space-x-2 items-center justify-center mb-2">
            {email && (
                <a
                    href={`mailto:${email}?subject=Interés en el trabajo: ${title}`}
                    className="items-center text-red-500 font-semibold py-2 px-2"
                >
                    <AiOutlineMail className="text-4xl" />
                </a>
            )}
            {phone && (
                <a
                    href={`https://wa.me/${formattedPhone}?text=Hola, estoy interesado en el trabajo de: ${title}`}
                    className="items-center text-green-400 font-semibold py-2 px-2"
                >
                    <FaWhatsapp className="text-4xl" />
                </a>
            )}
            {website && (
                <a
                    href={`http://${website}`}
                    className="items-center text-blue-500 font-semibold py-2 px-2"
                >
                    <FaGlobe className="text-3xl" />
                </a>
            )}
        </div>
    );
};

export default ContactButtons;

