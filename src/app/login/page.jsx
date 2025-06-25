"use client";
import { useState } from "react";
import styles from "../../styles/LoginPage.module.css";
import axios from "axios";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const res = await axios.post("http://localhost:5000/api/users/login", {
        email,
        password,
      }, { withCredentials: true });

      console.log("Login successful", res.data);
      // Redirect or update auth state here
    } catch (error) {
      console.error("Login failed:", error);
      alert("Login failed. Please try again.");
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
