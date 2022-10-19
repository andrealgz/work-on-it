import "./App.css";
import NavigationRoutes from "./navigation/NavigationRoutes";
import { NavBar } from "./components";
import { useState } from "react";

function App() {
  const [sideBarLeft, setSidebarLeft] = useState(false);
  const [SideBarRight, setSidebarRight] = useState(false);

  const showSideBarLeft = (status = undefined) => setSidebarLeft(status === undefined ? !sideBarLeft : status);
  const showSideBarRight = (status = undefined) => setSidebarRight(status === undefined ? !SideBarRight : status);

  return (
    <>
      <NavBar stateLeft={sideBarLeft} onClickLeft={showSideBarLeft} stateRight={SideBarRight} onClickRight={showSideBarRight}/>
      <div className="navigation-routes h-100" onClick={() => {
        showSideBarLeft(false);
        showSideBarRight(false);
      }}>
        <NavigationRoutes />
      </div>
    </>  
  );
}

export default App;
