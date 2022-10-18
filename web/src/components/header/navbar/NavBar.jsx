import { useState, useContext } from "react";
import { AccountContext } from "../../../contexts/AccountContext";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as HiIcons from "react-icons/hi";
import { IconContext } from "react-icons";
import { Link } from "react-router-dom";
import * as Services from "../../../services/Main";

import { SlideBar } from "../slide-bar/SlideBar";

import "./NavBar.css"

function NavBar() {
  const { user, setUser } = useContext(AccountContext);

  const [sideBarLeft, setSidebarLeft] = useState(false);
  const [SideBarRight, setSidebarRight] = useState(false);

  const showSideBarLeft = () => setSidebarLeft(!sideBarLeft);
  const showSideBarRight = () => setSidebarRight(!SideBarRight);

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
      <IconContext.Provider value={{color: "#fff"}}>
        <div className="navbar fixed-top">
          <Link to="/" className="menu-bars">
            <FaIcons.FaBars onClick={showSideBarLeft}/>
          </Link>
          <Link to="#" className="menu-bars">
            <HiIcons.HiUserCircle onClick={showSideBarRight}/>
          </Link>
        </div>
        <nav className={sideBarLeft ? "nav-menu-left active" : "nav-menu-left"}>
          <ul className="nav-menu-items" onClick={showSideBarLeft}>
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
        <nav className={SideBarRight ? "nav-menu-right active" : "nav-menu-right"}>
          <ul className="nav-menu-items">
            <li className="navbar-toggle" onClick={showSideBarRight}>
              <Link to="#" className="menu-bars" >
                <AiIcons.AiOutlineClose />
              </Link>
            </li>
            {
              user ? 
              (
                <>
                  <li className="navbar-toggle mx-3">
                    <FaIcons.FaUser />
                    <span><Link className="menu-bars-login" to={`/users/me`}>{user.nickname}</Link></span>
                  </li>
                  <li className="nav-text mx-3">
                    <AiIcons.AiFillTool />
                    <span><Link className="menu-bars-login" to={`/services/me`}>Gestionar tus servicios</Link></span>
                  </li>
                  <li className="nav-text mx-3">
                    <AiIcons.AiFillTool />
                    <span><Link className="menu-bars-login" to={`/services/create`}>Crear un servicios</Link></span>
                  </li>
                  <li className="navbar-toggle mx-3">
                    <button className="btn btn-primary" onClick={handleClick}>Logout</button>
                  </li>
                </>
              ) : 
              <li className="navbar-toggle d-flex justify-content-center">
                  <Link to="/account" className="mx-1"> Registrate </Link> o <Link to="/account" className="mx-1"> Conéctate</Link>
              </li>
            }
            
          </ul>
        </nav>
      </IconContext.Provider>
    </>
  )
}

export default NavBar
