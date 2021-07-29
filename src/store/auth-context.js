import { createContext, useState } from "react";

const AuthContext =
  createContext();
  // this is generally set here so that we define the general shape of our constext and get better auto-completion later
  // { token: "", isLoggedIn: false, login: (token) => {}, logout: () => {} }

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
    <AuthContextProvider value={contextValue}>
      {props.children}
    </AuthContextProvider>
  );
};

// export const AuthContextProvider=AuthContextProvider;

export default AuthContext;
