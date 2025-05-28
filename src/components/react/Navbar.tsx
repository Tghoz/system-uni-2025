import { useState } from "react";
import { BellIcon, SettingIcon, UserIcon } from "../../icons/HeaderIcons";


interface NavbarProps {
  username?: string; // Definimos la prop
}

export default function Navbar({ username }: NavbarProps)  {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="backdrop-blur-md bg-white/30 border border-white/40 shadow-md rounded-xl m-4 px-6 py-3 flex flex-wrap justify-between items-center">
      {/* Logo + Bienvenida */}
      <div className="flex flex-col md:flex-row md:items-center gap-1 md:gap-4">
        <div className="text-xl font-bold text-gray-800">MyFunds</div>
        {username && (
          <div className="text-sm text-gray-600 hidden md:block">
            Bienvenido a MyFunds, <span className="font-semibold">{username}</span>
          </div>
        )}
      </div>

      {/* Botón hamburguesa - móvil */}
      <button
        className="block md:hidden text-gray-700 hover:text-gray-900 transition-all"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle menu"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          {menuOpen ? (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          ) : (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          )}
        </svg>
      </button>

      {/* Menú de navegación */}
      <ul
        className={`${
          menuOpen ? "block" : "hidden"
        } w-full md:w-auto md:flex md:gap-6 text-gray-700 text-sm font-medium mt-3 md:mt-0`}
      >
        <li className="hover:text-gray-900 transition-all cursor-pointer">Inicio</li>
        <li className="hover:text-gray-900 transition-all cursor-pointer">Planificación</li>
        <li className="hover:text-gray-900 transition-all cursor-pointer">Actividades</li>
        <li className="hover:text-gray-900 transition-all cursor-pointer">Contacto</li>
      </ul>

      {/* Iconos */}
      <div className="flex items-center gap-4 text-gray-700 mt-3 md:mt-0">
        <button className="hover:text-gray-900 transition-all">
          <SettingIcon h={22} w={22} />
        </button>
        <button className="hover:text-gray-900 transition-all">
          <BellIcon h={22} w={22} />
        </button>
        <div className="h-9 w-9 flex items-center justify-center rounded-full bg-gray-800 text-white">
          <UserIcon h={18} w={18} />
        </div>
      </div>
    </nav>
  );
}