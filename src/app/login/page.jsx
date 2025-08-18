"use client";
import { useContext, useState } from "react";
import styles from "../../styles/LoginPage.module.css";
import axios from "axios";
import { useRouter } from "next/navigation";
import { AuthContext } from "@/util/AuthProvider";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter()
  const {user,login} = useContext(AuthContext)
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const handleLogin = async () => {
  const code = await login(email,password)

  if(code == 404){
    setHasError(true);
    setErrorMessage("User not found. Please check your email.");
    setTimeout(() => {
      setHasError(false);
    }, 3000);
    return;
  }
  if(code == 401){
    setHasError(true);
    setErrorMessage("Invalid password. Please try again.");
    setTimeout(() => {
      setHasError(false);
    }
    , 3000);
    return;
  }
  if(code == 500){
    setHasError(true);
    setErrorMessage("There was an error signing you in. Please try again later.");
    setTimeout(() => {
      setHasError(false);
    }, 3000);
    return;
  }
 
  };

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <div className={styles.headerGroup}>
          <div className={styles.logo}>🔐</div>
          <h1 className={styles.title}>Sign In</h1>
          <p className={styles.subtitle}>
            Enter your credentials to access your account
          </p>
        </div>

        <div className={styles.form}>
          <div className={styles.field}>
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className={styles.field}>
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button className={styles.button} onClick={handleLogin}>
            Login
          </button>
          {hasError && (
            <div className={styles.errorMessage}>
              {errorMessage}
            </div>
          )}
          <hr className={styles.divider} />

          <p className={styles.signupPrompt}>
            Don't have an account?{" "}
            <a href="/signup" className={styles.link}>
              Sign up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;