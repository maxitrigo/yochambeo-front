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
        <span className="text-black text-3xl font-bold">{imgUrl ? imgUrl : company.charAt(0)}</span>
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
        <div className="mt-2 p-2 border border-gray-300 rounded-md">
          <p>Descripción: {description}</p>
          <p>Requisitos: {requirements}</p>
          <p>Ubicación: {location}</p>
          <p>Salario: {salary}</p>
          <ContactButtons email={email} phone={phone} title={title} />
        </div>
      )}
    </div>
  );
};
