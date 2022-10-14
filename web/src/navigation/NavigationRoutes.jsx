import { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import * as Screens from "../screens";
import { AccountContext } from "../contexts/AccountContext";

function AccountGuard({ children }) {
  const { user } = useContext(AccountContext);

  if (!user) {
    return <Navigate to="/account" />;
  }

  return children;
}

function NavigationRoutes() {
  return (
    <Routes>
      <Route path="/" element={ <Screens.HomeScreen /> } />
      <Route path="/account" element={ <Screens.AccountScreen /> } />
      <Route path="/services" element={ <Screens.ListServicesScreen /> } />
      <Route path="/services/:profession" element={ <Screens.ListServicesScreen /> } />
      <Route path="/service/:id" element={
        <AccountGuard>
          <Screens.DetailServiceScreen />
        </AccountGuard>
      } />
      <Route path="/services/create" element={
        <AccountGuard>
          <Screens.CreateServiceScreen />
        </AccountGuard>
      } />
      <Route path="/orders" element={
        <AccountGuard>
          <Screens.HomeScreen />
        </AccountGuard>
      } />
      <Route path="/orders/:id" element={
        <AccountGuard>
          <Screens.DetailOrderScreen />
        </AccountGuard>
      } />
      <Route path="/orders/create" element={
        <AccountGuard>
          <Screens.HomeScreen />
        </AccountGuard>
      } />
      <Route path="/users/:nickname" element={
        <AccountGuard>
          <Screens.ProfileScreen />
        </AccountGuard>
      } />
    </Routes>
  )
}

export default NavigationRoutes;