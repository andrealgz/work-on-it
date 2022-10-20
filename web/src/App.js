import "./App.css";
import NavigationRoutes from "./navigation/NavigationRoutes";
import { NavBar } from "./components";
import { useState } from "react";

function App() {
  const [sideBarLeft, setSidebarLeft] = useState(false);
  const [sideBarRight, setSidebarRight] = useState(false);

  const showSideBarLeft = (status = undefined) => setSidebarLeft(status === undefined ? !sideBarLeft : status);
  const showSideBarRight = (status = undefined) => setSidebarRight(status === undefined ? !sideBarRight : status);

  return (
    <>
      <NavBar stateLeft={sideBarLeft} onClickLeft={showSideBarLeft} stateRight={sideBarRight} onClickRight={showSideBarRight}/>
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
