"use client";
import { useState } from "react";
import styles from "../../styles/SignUpPage.module.css";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

const SignupPage = () => {
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("student");

  const handleSignup = () => {
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    const data = {
      firstname: fname,
      lastname: lname,
      email,
      password,
      role,
    };

    signupmutation.mutate(data);
  };

  const signupmutation = useMutation({
    mutationFn: async (data) => {
      const response = await axios.post(
        "http://localhost:5000/api/users/signup",
        data,
        { withCredentials: true }
      );
      return response.data;
    },
    onSuccess: (data) => {
      console.log("Signup successful:", data);
      // Optionally redirect
    },
    onError: (error) => {
      console.error("Signup failed:", error);
      alert("Signup failed. Please try again.");
    },
  });

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <div className={styles.headerGroup}>
          <div className={styles.logo}>🎓</div>
          <h1 className={styles.title}>Create Account</h1>
          <p className={styles.subtitle}>Enter your details to get started</p>
        </div>

        <div className={styles.form}>
          <div className={styles.row}>
            <div className={styles.field}>
              <label htmlFor="fname">First Name</label>
              <input
                id="fname"
                value={fname}
                onChange={(e) => setFname(e.target.value)}
                required
              />
            </div>
            <div className={styles.field}>
              <label htmlFor="lname">Last Name</label>
              <input
                id="lname"
                value={lname}
                onChange={(e) => setLname(e.target.value)}
                required
              />
            </div>
          </div>

          <div className={styles.field}>
            <label htmlFor="type">I am a</label>
            <select
              id="type"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="student">Student</option>
              <option value="tutor">Tutor</option>
            </select>
          </div>

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

          <div className={styles.field}>
            <label htmlFor="confirm-password">Confirm Password</label>
            <input
              id="confirm-password"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>

          <button className={styles.button} onClick={handleSignup}>
            Sign Up
          </button>

          <p className={styles.loginPrompt}>
            Already have an account?{" "}
            <a href="/login" className={styles.link}>
              Log in
            </a>
          </p>

          <p className={styles.terms}>
            By signing up, you agree to our{" "}
            <a href="/terms" className={styles.link}>Terms of Service</a> and{" "}
            <a href="/privacy" className={styles.link}>Privacy Policy</a>.
          </p>

          <p className={styles.support}>
            Need help?{" "}
            <a href="/support" className={styles.link}>
              Contact Support
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
