import { createContext, useState, useEffect } from "react";
import * as Services from "../services/Main"

export const AccountContext = createContext();

function AccountContextProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    Services
      .getProfile()
      .then(user => setUser(user))
      .catch(() => setUser(null));
  }, []);

  const value = { user, setUser };

  if (user === null) {
    return <></>;
  }

  return <AccountContext.Provider value={value}>{children}</AccountContext.Provider>;
}

export default AccountContextProvider;