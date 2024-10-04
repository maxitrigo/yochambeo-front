import { useState } from "react"
import ContactButtons from "./contactButtons"


export const ListCards = ({  imgUrl,  title,  company,  location,  salary,  createdAt, description, website, email, phone, requirements,  }) => {
    const [isOpen, setIsOpen] = useState(false)
    const togleDetails = () => {
        setIsOpen(!isOpen)
    }

  return (
    <div className="">
    <div onClick={togleDetails} className="flex justify-between items-center border-t pt-1 pb-1 w-full">



      <div className="w-1/4 bg-gray-100 rounded-full flex items-center justify-center border ml-2 mr-2">
      {imgUrl ? (
          <img src={imgUrl} alt={company} className="w-full h-full rounded-full object-cover" />
      ) : (
          <span className=" text-2xl font-bold">Ych</span>
      )}
      </div>

      <div className="w-full">

        <div className="w-1/2">

          <h1 className="text-l font-bold">{title}</h1>
          <p className="text-sm">{company}</p>

          <div className="flex flex-row justify-start items-center w-full">
            <div className="flex flex-row justify-start items-center mr-2">
            <p className="text-sm">🌎</p>
            <p className="text-sm text-gray-500">{location}</p>
            </div>
            <div className="flex flex-row justify-start items-center">
            <p className="text-sm font-bold mr-1"> $ </p>
            <p className="text-sm text-gray-500">{salary}</p>
            </div>
          </div>

        </div>

      </div>


      <div className="flex flex-row justify-end items-center w-1/4 mr-2">
        <p className="text-sm text-gray-500">{createdAt}</p>
        <p className="text-sm text-gray-500">📌</p>
      </div>

    </div>
      {isOpen && (
        <div onClick={togleDetails} className="mt-2 p-4 border-t">
          <p className="font-bold text-lg mb-2 mt-2">Descripción:</p>
          <p>{description}</p>
          <p className="font-bold text-lg mb-2 mt-4">Requisitos:</p>
          <p>{requirements}</p>
          <p className="font-bold text-lg mt-4">Ubicación:</p>
          <p>{location}</p>
          <p className="font-bold text-lg mt-4">Salario: </p>
          <p>{salary}</p>
          <ContactButtons email={email} phone={phone} website={website} title={title} />
        </div>
      )}
    </div>
  );
};
