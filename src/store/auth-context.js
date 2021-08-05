import { useState } from "react";
import React from "react";

const AuthContext = React.createContext({
  token: "",
  isLoggedIn: true,
  login: (token) => {},
  logout: () => {},
});
// this is generally set here so that we define the general shape of our constext and get better auto-completion later

const calculateRemainingTime = (expirationTime) => {
  const currentTime = new Date().getTime();
  const adjExpirationTime = new Date(expirationTime).getTime();
  const remainingDuration = adjExpirationTime - currentTime;
  return remainingDuration;
};

export const AuthContextProvider = (props) => {
  const initialToken = localStorage.getItem("token");
  const [token, setToken] = useState(initialToken);

  const userIsLoggedIn = !!token;
  console.log(userIsLoggedIn);

  const logoutHandler = () => {
    setToken(null);
    localStorage.removeItem("token");
  };
  const loginHandler = (token, expirationTime) => {
    setToken(token);
    localStorage.setItem("token", token);

    const remainingTime = calculateRemainingTime(expirationTime);
    setTimeout(logoutHandler, remainingTime); //to execute logouthandler in remaining time
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
