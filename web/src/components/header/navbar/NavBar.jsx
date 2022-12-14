import { useContext } from "react";
import { AccountContext } from "../../../contexts/AccountContext";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as HiIcons from "react-icons/hi";
import * as RiIcons from "react-icons/ri";
import { IconContext } from "react-icons";
import { Link } from "react-router-dom";
import * as Services from "../../../services/Main";
import { SlideBar } from "../slide-bar/SlideBar";

import "./NavBar.css"

function NavBar({ stateLeft, stateRight, onClickLeft, onClickRight }) {
  const { user, setUser } = useContext(AccountContext);

  const handleClick = () =>  {
    Services
      .logout()
      .then(() => {
        localStorage.clear();
        setUser(null);
      })
      .catch(error => console.error(error))
  }

  return (
    <>
      <IconContext.Provider value={{color: "#734722"}}>
        <div className="navbar fixed-top">
          <Link to="/" className="menu-bars">
            <FaIcons.FaBars fill="white" size={40} onClick={() => onClickLeft()}/>
          </Link>
          <Link to="/" className={`menu-bars ${user?.orderSent.some(order => order.status === "done") ? "menu-bars-action-required" : ""}`}>
            <HiIcons.HiUserCircle className={user?.orderSent.some(order => order.status === "done") && "position-absolute"} fill="white" size={60} onClick={() => onClickRight()}></HiIcons.HiUserCircle>
            { user?.orderSent.some(order => order.status === "done") && <RiIcons.RiErrorWarningFill className="position-absolute" fill="red" size={20} /> }
          </Link>
        </div>
        <nav className={stateLeft ? "nav-menu-left active" : "nav-menu-left"}>
          <ul className="nav-menu-items" onClick={() => {
              onClickLeft();
              onClickRight(false)
            }}>
            {SlideBar.map((item, index) => {
              return (
                <li key={index} className={item.cName}>
                  <Link to={item.path}>
                    {item.icon}
                    <span>{item.title}</span>
                  </Link>
                </li>
              )})}
          </ul>
        </nav>
        <nav className={stateRight ? "nav-menu-right active" : "nav-menu-right"}>
          <ul className="nav-menu-items" onClick={() => {
            onClickRight();
            onClickLeft(false);
          }}>
            {
              user ? 
              (
                <>
                  <li className="navbar-toggle mx-3 mt-5">
                    <Link className="menu-bars-login" to={`/users/me`}>
                      <img src={user.photo} className="profile-img" alt="profile-img"/>
                      {user.nickname}
                      { user?.orderSent.some(order => order.status === "done") && <RiIcons.RiErrorWarningFill className="position-absolute" fill="red" size={20} /> }
                    </Link>
                  </li>
                  <li className="nav-text ms-3">
                    <AiIcons.AiFillTool />
                    <span className="w-100"><Link className="menu-bars-login" to={`/services/me`}>Gestionar tus servicios</Link></span>
                  </li>
                  <li className="nav-text ms-3">
                    <AiIcons.AiFillTool />
                    <span className="w-100"><Link className="menu-bars-login" to={`/services/create`}>Crear un servicios</Link></span>
                  </li>
                  <li className="navbar-toggle d-flex justify-content-center">
                    <AiIcons.AiOutlineLogout />
                    <button className="menu-bars-logout" onClick={handleClick}>Desconectarme</button>
                  </li>
                </>
              ) : 
              <li className="navbar-toggle d-flex justify-content-center h-50 align-items-center">
                  <Link to="/account" className="mx-1 navbar-toggle-account">Con??ctate</Link> o <Link to="/account" className="mx-1 navbar-toggle-account">Registrate</Link>
              </li>
            }
            
          </ul>
        </nav>
      </IconContext.Provider>
    </>
  )
}

export default NavBar
