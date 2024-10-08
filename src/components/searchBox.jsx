import React from 'react';

export const SearchBox = ({ searchTerm, setSearchTerm }) => {
  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="w-full flex justify-center">
      <input
        type="text"
        value={searchTerm}
        onChange={handleInputChange}
        placeholder="Busca, por puesto, lugar, empresa."
        className="border rounded-xl w-full m-2 p-2 mt-4 mb-4"
      />
    </div>
  );
};

