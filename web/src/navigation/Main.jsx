import { Routes, Route } from "react-router-dom";
import * as Screens from "../screens"

function NavigationRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Screens.HomeScreen />} />
      <Route path="/register" element={<Screens.HomeScreen />} />
      <Route path="/services" element={<Screens.HomeScreen />} />
      <Route path="/services/:id" element={<Screens.HomeScreen />} />
      <Route path="/services/create" element={<Screens.HomeScreen />} />
      <Route path="/orders" element={<Screens.HomeScreen />} />
      <Route path="/orders/:id" element={<Screens.HomeScreen />} />
      <Route path="/orders/create" element={<Screens.HomeScreen />} />
      <Route path="/user/:nickname" element={<Screens.HomeScreen />} />
    </Routes>
  )
}

export default NavigationRoutes;