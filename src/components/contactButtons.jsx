import { MdAlternateEmail } from 'react-icons/md'; // Icono de correo
import { FaWhatsapp } from 'react-icons/fa'; // Icono de WhatsApp
import { TbWorldWww } from 'react-icons/tb'; // Icono de Globe

const ContactButtons = ({ email, phone, website, title }) => {

    const areaCode = "+598"; // Código de área para Uruguay
    const formattedPhone = typeof phone === 'string' ? areaCode + phone.replace(/^0/, '').replace(/\D/g, '') : '';

    return (
        <div className=" flex space-x-6 items-center justify-center mb-2 mt-4">
            {email && (
                <a
                    href={`mailto:${email}?subject=Interés en el trabajo: ${title}`}
                    className="text-red-500"
                >
                    <MdAlternateEmail className="text-4xl" />
                </a>
            )}
            {phone && (
                <a
                    href={`https://wa.me/${formattedPhone}?text=Hola, estoy interesado en el trabajo de: ${title}`}
                    className="text-green-400"
                >
                    <FaWhatsapp className="text-4xl" />
                </a>
            )}
            {website && (
                <a
                    href={`http://${website}`}
                    className=""
                >
                    <TbWorldWww className="text-4xl" />
                </a>
            )}
        </div>
    );
};

export default ContactButtons;

