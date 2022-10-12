import React, { useState } from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as HiIcons from "react-icons/hi";
import { IconContext } from "react-icons"
import { Link } from "react-router-dom";

import { SlideBar } from "../slide-bar/SlideBar";

import "./NavBar.css"

function NavBar() {
  const [sideBarLeft, setSidebarLeft] = useState(false);
  const [SideBarRight, setSidebarRight] = useState(false);

  const showSideBarLeft = () => setSidebarLeft(!sideBarLeft);
  const showSideBarRight = () => setSidebarRight(!SideBarRight);
  return (
    <>
      <IconContext.Provider value={{color: "#fff"}}>
        <div className="navbar">
          <Link to="#" className="menu-bars">
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
            <li className="navbar-toggle">
              <Link to="#" className="menu-bars" >
                <AiIcons.AiOutlineClose onClick={showSideBarRight}/>
              </Link>
            </li>
            <form className="mx-5 text-white mt-5">
              <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">Email</label>
                <input name="email" type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
              </div>
              <div className="mb-3">
                <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                <input name="password" type="password" className="form-control" id="exampleInputPassword1" />
              </div>
              <button type="submit" className="btn btn-primary" onClick={showSideBarRight}>Login</button>
            </form>
          </ul>
        </nav>
      </IconContext.Provider>
    </>
  )
}

export default NavBar
