import { useEffect, useState } from "react";
import React from "react";

let logoutTimer;
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
const retrieveStoredToken = () => {
  const storedToken = localStorage.getItem("token");
  const storedExpirationTime = localStorage.getItem("expirationTime");

  const remainingTime = calculateRemainingTime(storedExpirationTime);
  if (remainingTime <= 60000) {
    localStorage.removeItem("token");
    localStorage.removeItem("remainingTime");
    return null;
  }
  return {
    token: storedToken,
    duration: storedExpirationTime,
  };
};

export const AuthContextProvider = (props) => {
  const tokenData = retrieveStoredToken();
  let initialToken;
  if (tokenData) {
    initialToken = tokenData.token;
  }

  const [token, setToken] = useState(initialToken);

  const userIsLoggedIn = !!token;
  console.log(userIsLoggedIn);

  const logoutHandler = () => {
    setToken(null);
    localStorage.removeItem("token");

    if (logoutTimer) {
      clearTimeout(logoutTimer);
    }
  };
  const loginHandler = (token, expirationTime) => {
    setToken(token);
    localStorage.setItem("token", token);
    localStorage.setItem("expirationTime", expirationTime);

    const remainingTime = calculateRemainingTime(expirationTime);
    logoutTimer = setTimeout(logoutHandler, remainingTime); //to execute logouthandler in remaining time
  };

  useEffect(() => {
    if (tokenData) {
      console.log(tokenData.duration);
      logoutTimer = setTimeout(logoutHandler, tokenData.remainingTime);
    }
  }, [tokenData]);

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
