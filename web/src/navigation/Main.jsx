import { Routes, Route } from "react-router-dom";
import * as Screens from "../screens"

function NavigationRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Screens.HomeScreen />} />
      <Route path="/register" element={<Screens.HomeScreen />} />
      <Route path="/services" element={<Screens.ListServicesScreen />} />
      <Route path="/services/:id" element={<Screens.DetailServiceScreen />} />
      <Route path="/services/create" element={<Screens.CreateServiceScreen />} />
      <Route path="/orders" element={<Screens.HomeScreen />} />
      <Route path="/orders/:id" element={<Screens.HomeScreen />} />
      <Route path="/orders/create" element={<Screens.HomeScreen />} />
      <Route path="/user/:nickname" element={<Screens.HomeScreen />} />
    </Routes>
  )
}

export default NavigationRoutes;