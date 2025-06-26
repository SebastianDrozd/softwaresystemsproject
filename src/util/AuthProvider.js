"use client";
import React, { useState, useEffect, useContext, createContext } from "react";
export const AuthContext = createContext(null);
import axios from "axios";
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/users/me", {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res);
        setUser(res.data);
        console.log("This is user",user);
      })
      .catch(() => setUser(null))
      .finally(() => setIsLoading(false));
  }, []);

 if (isLoading) {
    return (
      <div style={{ height: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <span>Loading...</span> {/* Replace with spinner component if you have one */}
      </div>
    );
  }


  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
