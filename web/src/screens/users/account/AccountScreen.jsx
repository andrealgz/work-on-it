import { Login, Register } from "../../../components";
import "./AccountScreen.css";

function AccountScreen() {
  return (
    <div className="d-flex justify-content-around h-100 account-screen">
      <Register />
      <Login />
    </div>
  )
}

export default AccountScreen;
