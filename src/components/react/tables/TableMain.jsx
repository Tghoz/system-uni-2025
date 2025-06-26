

import React, { useState } from 'react';
import { IoAddCircleOutline } from "react-icons/io5";
import { CiSearch } from "react-icons/ci";

export default function TableMain() {
  // Datos de ejemplo para la tabla
  const [tableData, setTableData] = useState([
    { id: 1, name: 'Cy Ganderton', job: 'Quality Control Specialist', color: 'Blue' },
    { id: 2, name: 'John Doe', job: 'Software Engineer', color: 'Green' },
    { id: 3, name: 'Jane Smith', job: 'Product Manager', color: 'Red' },
    { id: 4, name: 'Alice Johnson', job: 'Data Analyst', color: 'Yellow' },
  ]);

  // Estado para el término de búsqueda
  const [searchTerm, setSearchTerm] = useState('');

  // Función para manejar el cambio en el input de búsqueda
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  // Función para agregar un nuevo elemento (aquí solo un ejemplo básico)
  const handleAddRow = () => {
    // En una aplicación real, esto abriría un modal/formulario
    // para obtener los datos del nuevo elemento.
    // Por simplicidad, añadimos un elemento de ejemplo aquí:
    const newId = tableData.length > 0 ? Math.max(...tableData.map(item => item.id)) + 1 : 1;
    const newItem = { id: newId, name: 'Nuevo Usuario', job: 'Puesto Nuevo', color: 'Gris' };
    setTableData([...tableData, newItem]);
    alert('¡Fila agregada! (En un caso real, un formulario aparecería aquí)');
  };

  // Filtrar los datos basándose en el término de búsqueda
  const filteredData = tableData.filter(item =>
    Object.values(item).some(value =>
      String(value).toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  return (
    <div className="p-4"> {/* Añadimos un padding general */}
      <div className="flex justify-between items-center mb-4">
        {/* Barra de búsqueda */}
        <div className="relative flex items-center w-1/2">
          <input
            type="text"
            placeholder="Buscar en la tabla..."
            className="input input-bordered w-full pr-10 bg-base-200 text-base-content border-base-content/20 focus:outline-none focus:border-blue-500 rounded-md py-2 px-3"
            value={searchTerm}
            onChange={handleSearchChange}
          />
          {/* Icono de búsqueda (opcional, puedes usar un SVG o librería de iconos) */}
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 absolute right-3 text-base-content/60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>

        {/* Botón de Agregar */}
        <button
          className="btn btn-primary bg-var[--color-bg] hover:bg-var[--color-hover] text-white font-bold py-2 px-4 rounded-md shadow-md transition duration-300 ease-in-out "
          onClick={handleAddRow}
        >
            <IoAddCircleOutline size={20}/>
          Registrar
        </button>
      </div>

      <div className="overflow-x-auto rounded-box border border-base-content/5 bg-[#212121]">
        <table className="table w-full">
          {/* head */}
          <thead>
            <tr>
              <th className="text-white"></th>
              <th className="text-white">Name</th>
              <th className="text-white">Job</th>
              <th className="text-white">Favorite Color</th>
            </tr>
          </thead>
          <tbody>
            {/* Iterar sobre los datos filtrados */}
            {filteredData.length > 0 ? (
              filteredData.map((item) => (
                <tr key={item.id}>
                  <th className="text-white">{item.id}</th>
                  <td className="text-white">{item.name}</td>
                  <td className="text-white">{item.job}</td>
                  <td className="text-white">{item.color}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center text-white py-4">No se encontraron resultados.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
