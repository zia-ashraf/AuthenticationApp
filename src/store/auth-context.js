import { useState } from "react";
import React from "react";

const AuthContext = React.createContext({
  token: "",
  isLoggedIn: true,
  login: (token) => {},
  logout: () => {},
});
// this is generally set here so that we define the general shape of our constext and get better auto-completion later

export const AuthContextProvider = (props) => {
  const [token, setToken] = useState(null);
  const userIsLoggedIn = !!token;
  console.log(userIsLoggedIn);
  const loginHandler = (token) => {
    setToken(token);
  };
  const logoutHandler = () => {
    setToken(null);
  };
  const contextValue = {
    token: token,
    isLoggedIn: userIsLoggedIn,
    login: loginHandler,
    logout: logoutHandler,
  };
  console.log(contextValue.isLoggedIn);
  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

// export const AuthContextProvider=AuthContextProvider;

export default AuthContext;
