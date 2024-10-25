import { MdAlternateEmail } from 'react-icons/md'; // Icono de correo
import { FaWhatsapp } from 'react-icons/fa'; // Icono de WhatsApp
import { TbWorldWww } from 'react-icons/tb'; // Icono de Globe
import { IoPaperPlaneOutline } from 'react-icons/io5';

const ContactButtons = ({ email, phone, website, title, description, requirements }) => {

    const areaCode = "+598"; // Código de área para Uruguay
    const formattedPhone = typeof phone === 'string' ? areaCode + phone.replace(/^0/, '').replace(/\D/g, '') : '';
    const filteredDescription = description.replace(/Accede a mas trabajos como este en https:\/\/yochambeo.com/g, '')

    const handleShare = () => {
        if (navigator.share) {
            navigator.share({
                title: `Interés en el trabajo: ${title}`,
                text: `Mirá este trabajo: ${title}\n\nDescripcion:\n${filteredDescription}\n\nRequisitos:\n${requirements}\n\nPodes enviar tu cv a ${email}`,
            }).catch(console.error);
        } else {
            alert("Tu navegador no soporta la funcionalidad de compartir.");
        }
    };

    return (
        <div className=" flex space-x-6 items-center justify-center mb-2 mt-4">
            {email && (
                <a
                    href={`mailto:${email}?subject=Interés en el trabajo: ${title}`}
                    className="text-red-500"
                    title="Email"
                >
                    <MdAlternateEmail className="text-4xl" />
                </a>
            )}
            {phone && (
                <a
                    href={`https://wa.me/${formattedPhone}?text=Hola, estoy interesado en el trabajo de: ${title}`}
                    className="text-green-400"
                    title="Whatsapp"
                >
                    <FaWhatsapp className="text-4xl" />
                </a>
            )}
            {website && (
                <a
                    href={`http://${website}`}
                    className=""
                    title='Visitar sitio web'
                >
                    <TbWorldWww className="text-4xl" />
                </a>
            )}
            <button title="Compartir" onClick={handleShare} className="text-black">
                <IoPaperPlaneOutline className="text-3xl" />
            </button>
        </div>
    );
};

export default ContactButtons;

