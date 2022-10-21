import * as AiIcons from "react-icons/ai";
import * as IoIcons from "react-icons/io";
import * as FaIcons from "react-icons/fa";
import * as MdIcons from "react-icons/md";
import * as GiIcons from "react-icons/gi";
import * as BiIcons from "react-icons/bi";

export const SlideBar = [
  {
    title: "Todos los servicios",
    path: "/services",
    icon: <BiIcons.BiWorld />,
    cName: "nav-text"
  },
  {
    title: "Albañil",
    path: "/services/construction-worker",
    icon: <IoIcons.IoMdConstruct />,
    cName: "nav-text"
  },
  {
    title: "Fontaneria",
    path: "/services/plumber",
    icon: <MdIcons.MdPlumbing />,
    cName: "nav-text"
  },
  {
    title: "Electricista",
    path: "/services/electrician",
    icon: <GiIcons.GiElectric />,
    cName: "nav-text"
  },
  {
    title: "Carpintero",
    path: "/services/carpenter",
    icon: <MdIcons.MdCarpenter />,
    cName: "nav-text"
  },
  {
    title: "Pintor",
    path: "/services/painter",
    icon: <AiIcons.AiFillFormatPainter />,
    cName: "nav-text"
  },
  {
    title: "Bricolaje",
    path: "/services/diy",
    icon: <FaIcons.FaTools />,
    cName: "nav-text"
  },
  {
    title: "Mecatrónico",
    path: "/services/mechatronic",
    icon: <GiIcons.GiMechanicalArm />,
    cName: "nav-text"
  }
]
