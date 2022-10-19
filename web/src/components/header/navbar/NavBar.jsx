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
      <IconContext.Provider value={{color: "black"}}>
        <div className="navbar fixed-top">
          <Link to="/" className="menu-bars">
            <FaIcons.FaBars onClick={onClickLeft}/>
          </Link>
          <Link to="#" className="menu-bars">
            <HiIcons.HiUserCircle onClick={onClickRight}/>
          </Link>
        </div>
        <nav className={stateLeft ? "nav-menu-left active" : "nav-menu-left"}>
          <ul className="nav-menu-items" onClick={onClickLeft}>
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
          <ul className="nav-menu-items">
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
