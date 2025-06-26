import { CiBellOn } from "react-icons/ci";
import { CiSearch } from "react-icons/ci";

const Navbar = ({title = "Overview", nameUser = "invitado"}) => {
  return (
    <nav className="flex items-center justify-between  text-white w-full ">
      {/* Left section: Overview title */}
      <div className="flex items-center">
        <h1 className="text-5xl font-abel">{title}</h1>
      </div>


      <div className="flex-grow flex justify-center">
        <div className="relative flex items-center bg-gray-700 rounded-md px-4 py-2 w-full max-w-lg">
          <CiSearch size={25} className="mr-10" />
          <input
            type="text"
            placeholder="Search here..."
            className="bg-transparent outline-none text-white placeholder-gray-400 w-full"
          />
        </div>
      </div>

      {/* Right section: Icons and profile picture */}
      <div className="flex items-center space-x-4 mr-20">

        {/* Bell icon */}
        <div className="flex items-center justify-center w-10 h-10 bg-gray-700 rounded-full cursor-pointer hover:bg-gray-600 transition duration-200 mx-5">
          <CiBellOn size={30} />
        </div>

        {/* Profile picture */}
        <div className="dropdown dropdown-end">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar w-15">
            <div className="rounded-full">
              <img
                src="https://img.daisyui.com/images/profile/demo/yellingcat@192.webp" />
            </div>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
            <li> 
              <a className="justify-between">
                {nameUser}
              </a>
            </li>
            <li><a>Settings</a></li>
            <li><a>Logout</a></li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;