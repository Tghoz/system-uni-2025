import React from 'react'

import { SearchIcon, BellIcon, SettingIcon, UserIcon } from "../../icons/HeaderIcons"


//  {/*   className="h-5 w-5 text-gray-400 m-3"  */}

// quitar el "mb-10 del div principal y dar el pargen en el layout"

export default function Header() {
  return (
  
      <div className="flex items-center justify-end mx-20 mb-10 ">
        {/* Contenedor del buscador */}
        <div className="flex items-center bg-white rounded-lg overflow-hidden flex-1 max-w-2xs mx-16 px-5 text-gray-500">
          <SearchIcon h={20} w={20} />
          <input
            type="text"
            placeholder="Search"
            className="flex-1 px-4 py-2 outline-none"
          />
        </div>

        {/* Iconos y avatar */}
        <div className="flex items-center space-x-4 ml-4 gap-2">
          {/* Icono de configuración */}
          <button className="relative text-gray-400 hover:text-gray-600 ">
            <SettingIcon h={25} w={25} />
          </button>

          {/* Icono de notificación */}
          <button className="relative text-gray-400 hover:text-gray-600 ">
            <BellIcon h={25} w={25} />
          </button>

          {/* Avatar */}
          <div className="relative">
            <div className="h-12 w-12 rounded-full bg-gray-700 text-white flex items-center justify-center font-medium text-sm">
              <UserIcon h={20} w={20} />
            </div>
          </div>
        </div>
      </div>

  )
}
