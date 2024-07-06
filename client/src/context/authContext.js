import axios from "axios";
import { Children, createContext, useEffect, useState } from "react";

// use this context to store user info
// so that it bexomes common source for multiple components
export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  // gets user info from local storage that we made through cookie
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

  const login = async (inputs) => {
    const res = await axios.post(
      "/auth/login",
      inputs
    );
    // console.log(res);
    // console.log("hi")
    setCurrentUser(res.data);
    // console.log(res.data);
  };

  const logout = async (inputs) => {
    await axios.post("/auth/logout");
    setCurrentUser(null);
  };

  useEffect(() => {
    localStorage.getItem("user", JSON.stringify(currentUser));
  }, [currentUser]);

  return (
    <AuthContext.Provider value={{ currentUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};