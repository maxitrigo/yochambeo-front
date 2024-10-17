import { useState } from "react"
import ContactButtons from "./contactButtons"
import { MdAttachFile } from "react-icons/md";
import { BiWorld } from "react-icons/bi";
import { LiaMoneyBillWaveSolid } from "react-icons/lia";


export const ListCards = ({  imgUrl,  title,  company,  location,  salary,  createdAt, description, website, email, phone, requirements,  }) => {
    const [isOpen, setIsOpen] = useState(false)
    const togleDetails = () => {
        setIsOpen(!isOpen)
    }

  return (
    <div className="">
    <div onClick={togleDetails} className="flex justify-between items-center border-t pt-1 pb-1 w-full">



      <div className="w-1/4 h-1/4 bg-gray-100 rounded-full flex items-center justify-center border ml-2 mr-2 overflow-hidden aspect-square">
      {imgUrl ? (
          <img src={imgUrl} alt={company} className="w-20 h-20 rounded-full object-cover aspect-square" />
      ) : (
        <div className="w-20 h-20 flex items-center justify-center rounded-full aspect-square">
          <p className="text-2xl font-bold">Y</p>
        </div>
      )}
      </div>

      <div className="w-full">

        <div className="w-1/2">

          <h1 className="text-l font-bold">{title}</h1>
          <p className="text-sm">{company}</p>

          <div className="flex flex-row justify-start items-center w-full">
            <div className="flex flex-row justify-start items-center mr-2">
            <BiWorld className="mr-1" />
            <p className="text-sm text-gray-500">{location}</p>
            </div>
            <div className="flex flex-row justify-start items-center ml-2">
            <LiaMoneyBillWaveSolid className="mr-1" />
            <p className="text-sm text-gray-500">{salary}</p>
            </div>
          </div>

        </div>

      </div>


      <div className="flex flex-row justify-end items-center w-1/4 mr-2">
        <p className="text-sm text-gray-500">{createdAt}</p>
        <MdAttachFile className="text-md text-gray-500" />
      </div>

    </div>
      {isOpen && (
        <div onClick={togleDetails} className="mt-2 p-4 border-t">
          <p className="font-bold text-lg mb-2 mt-2">Descripción:</p>
          <p>{description}</p>
          <p className="font-bold text-lg mb-2 mt-4">Requisitos:</p>
          <p>{requirements}</p>
          <div className="flex flex-row justify-start mt-4">
          <p className="font-bold text-lg">Ubicación:</p>
          <p className="ml-2 text-lg">{location}</p>
          </div>
          <div className="flex flex-row justify-start mt-4">
          <p className="font-bold text-lg">Salario: </p>
          <p className="ml-2 text-lg">${salary}</p>
          </div>
          <div className="flex flex-col justify-center items-center w-full mt-8">
            <p className="font-bold text-2xl">Postulate!</p>
            <p className="text-sm text-gray-500">Envia tu CV</p>
          </div>
          <ContactButtons email={email} phone={phone} website={website} title={title} />
        </div>
      )}
    </div>
  );
};
