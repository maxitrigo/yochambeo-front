import { useState } from "react";

export const FilterMenu = ({ setSortBy }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleSort = (sortType) => {
    setSortBy(sortType);
    setIsOpen(false); // Cerrar el menú cuando se seleccione un filtro
  };

  return (
    <div className="relative">
      <button
        className=" text-purple-700 border border-purple-700 font-bold rounded-lg py-1 px-2"
        onClick={toggleMenu}
      >
        Filtros.
      </button>

      {isOpen && (
        <div className="absolute mt-2 bg-white border  rounded shadow-lg w-48 right-0">
          <button
            className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 border-b border-gray-300"
            onClick={() => handleSort("date")}
          >
            Ordenar por fecha
          </button>
          <button
            className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
            onClick={() => handleSort("salary")}
          >
            Ordenar por salario
          </button>
        </div>
      )}
    </div>
  );
};

  