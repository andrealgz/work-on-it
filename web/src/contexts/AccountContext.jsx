import { createContext, useState } from "react";

export const AccountContext = createContext();

function AccountContextProvider({ children }) {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));

  function login(user) {
    setUser(user);
    localStorage.setItem("user", JSON.stringify(user))
  }

  const value = { user, setUser: login };

  return <AccountContext.Provider value={value}>{children}</AccountContext.Provider>;
}

export default AccountContextProvider;