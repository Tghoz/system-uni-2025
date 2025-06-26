import { CiGrid41 } from "react-icons/ci";
import { CiSettings } from "react-icons/ci";
import { CiClock2 } from "react-icons/ci";
import { CiCoinInsert } from "react-icons/ci";
import { CiCalculator1 } from "react-icons/ci";


export const NavData = [
  {
    title: "Dashboart",
    icon: <CiGrid41 size={25} />,
    url: "/",
  },
  {
    title: "Historial",
    icon: <CiClock2 size={25}/>,
    url: "/historial",
  },
  {
    title: "Ajustes ",
    icon: <CiSettings size={25}/>,
    url: "/ajustes",
  },
  {
    title: "Cuentas",
    icon: <CiCoinInsert size={25}/>,
    url: "/cuentas",
  },

  {
    title: "Planes",
    icon: <CiCalculator1 size={25}/>,
    url: "/planes",
  },
];



export const TitleData = [
  {
    title: "My Finances",
    img: "/img/Logo.png",
  },
];

