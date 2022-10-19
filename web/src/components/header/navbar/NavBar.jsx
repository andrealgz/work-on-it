import { useContext } from "react";
import { AccountContext } from "../../../contexts/AccountContext";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as HiIcons from "react-icons/hi";
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
            <FaIcons.FaBars fill="white" size={60} onClick={() => onClickLeft()}/>
          </Link>
          <Link to="/" className="menu-bars">
            <HiIcons.HiUserCircle fill="white" size={60} onClick={() => onClickRight()}/>
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
                  <li className="navbar-toggle mx-3 d-flex align-items-center">
                      <img src={user.photo} className="profile-img" alt="profile-img"/>
                      <Link className="menu-bars-login" to={`/users/me`}>{user.nickname}</Link>
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
                    <button className="menu-bars-logout" onClick={handleClick}> Desconectarme</button>
                  </li>
                </>
              ) : 
              <li className="navbar-toggle d-flex justify-content-center h-50 align-items-center">
                  <Link to="/account" className="mx-1">Registrate</Link> o <Link to="/account" className="mx-1">Conéctate</Link>
              </li>
            }
            
          </ul>
        </nav>
      </IconContext.Provider>
    </>
  )
}

export default NavBar
