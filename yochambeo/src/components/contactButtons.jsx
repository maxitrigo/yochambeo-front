import { AiOutlineMail } from 'react-icons/ai'; // Icono de correo
import { FaWhatsapp } from 'react-icons/fa'; // Icono de WhatsApp

const ContactButtons = ({ email, phone, title }) => {
    if (!email || !phone || !title) {
        return null; // Agregar un chequeo para evitar errores si faltan props
    }

    return (
        <div className="mt-4 flex space-x-2 items-center justify-center mb-2">
            <a
                href={`mailto:${email}?subject=Interés en el trabajo: ${title}`}
                className="items-center bg-rose-500 text-white font-semibold py-2 px-2 rounded-full"
            > <AiOutlineMail className="text-4xl" />
            </a>
            <a
                href={`https://wa.me/${phone.replace(/\D/g, '')}?text=Hola, estoy interesado en el trabajo de: ${title}`}
                className="items-center bg-green-400 text-white font-semibold py-2 px-2 rounded-full"
            > <FaWhatsapp className="text-4xl" /> </a>
        </div>
    );
};

export default ContactButtons;