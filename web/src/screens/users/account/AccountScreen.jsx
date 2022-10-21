import { Login, Register } from "../../../components";
import "./AccountScreen.css";

function AccountScreen() {
  return (
    <div className="d-flex justify-content-evenly h-100 account-screen">
      <Login />
      <Register />
    </div>
  )
}

export default AccountScreen;
