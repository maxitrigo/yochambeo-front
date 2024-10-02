import { useState } from "react"
import ContactButtons from "./contactButtons"


export const ListCards = ({  imgUrl,  title,  company,  location,  salary,  createdAt, description, website, email, phone, requirements,  }) => {
    const [isOpen, setIsOpen] = useState(false)
    const togleDetails = () => {
        setIsOpen(!isOpen)
    }

  return (
    <div className="">
    <div onClick={togleDetails} className="flex justify-between items-center border-t border-gray-300 pt-1 pb-1 w-full pr-4 pl-4">


      <div className="w-20 h-14 bg-gray-100 rounded-full flex items-center justify-center border-2 border-gray-300 mr-4">
      {imgUrl ? (
          <img src={imgUrl} alt={company} className="w-full h-full rounded-full object-cover" />
      ) : (
          <span className="text-purple-700 text-2xl font-bold">Ych</span>
      )}
      </div>


      <div className="w-full">

        <div className="">

          <h1 className="text-l font-bold">{title}</h1>
          <p className="text-sm">{company}</p>

          <div className="flex flex-row justify-start items-center">
            <p className="text-sm text-gray-500 mr-2">🌎 {location}</p>
            <p className="text-sm text-gray-500">💲{salary}</p>
          </div>

        </div>

      </div>


      <div className="flex flex-row justify-start items-center">
        <p className="text-sm text-gray-500">{createdAt} 📌</p>
      </div>

    </div>
      {isOpen && (
        <div onClick={togleDetails} className="mt-2 p-4  border border-gray-300 bg-gray-100">
          <p className="font-bold text-lg mb-2 mt-2 text-purple-700">Descripción:</p>
          <p>{description}</p>
          <p className="font-bold text-lg mb-2 mt-4 text-purple-700">Requisitos:</p>
          <p>{requirements}</p>
          <p className="font-bold text-lg mt-4 text-purple-700">Ubicación:</p>
          <p>{location}</p>
          <p className="font-bold text-lg mt-4 text-purple-700">Salario: </p>
          <p>{salary}</p>
          <ContactButtons email={email} phone={phone} website={website} title={title} />
        </div>
      )}
    </div>
  );
};
