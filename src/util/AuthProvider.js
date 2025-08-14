"use client";
import React, { useState, useEffect, useContext, createContext } from "react";
export const AuthContext = createContext(null);
import axios from "axios";
import { useRouter } from "next/navigation";
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter()
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/users/me", {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res);
        setUser(res.data);
        console.log("This is user", user);
      })
      .catch(() => setUser(null))
      .finally(() => setIsLoading(false));
  }, []);

  const logout = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/users/logout', {}, {
        withCredentials: true, 
      });
      console.log("logoutresponse",response)
      setUser(null)
      router.push('/login'); // redirect to login
    } catch (err) {
      console.error('Logout failed:', err);
    }
  }

  const login = async (email,password) => {
    try {
      const res = await axios.post("http://localhost:5000/api/users/login", {
        email,
        password,
      }, { withCredentials: true });
      const user = res.data.user;
      setUser(user)
      if(user.Role == "tutor"){
          router.push("/dashboard/tutor")
      }
      else if(user.Role == "student"){
          router.push("/dashboard/student")
      }
    } catch (error) {
      setUser(null)
      if(error.response && error.response.status == 404 ){
        return 404;
      }
      if(error.response && error.response.status == 401 ){
        return 401;
      }
      if(error.response && error.response.status == 500){
       return 500;
      }
    }
  };
  const refreshUser = async () => {
  try {
    const { data } = await axios.get("http://localhost:5000/api/users/me", { withCredentials: true });
    setUser(data);
    return data;
  } catch {
    setUser(null);
    return null;
  }
};

  if (isLoading) {
    return (
      <div style={{ height: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <span>Loading...</span> {/* Replace with spinner component if you have one */}
      </div>
    );
  }


  return (
    <AuthContext.Provider value={{ user, setUser, logout,login,refreshUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
