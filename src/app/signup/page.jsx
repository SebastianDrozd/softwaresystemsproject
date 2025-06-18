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
    // Handle signup logic here
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    // Proceed with signup (e.g., API call)
    const data = {
      firstname: fname,
      lastname: lname,
      email,
      password,
      role,
    };
    console.log("Signup data:", data);
    signupmutation.mutate(data);
  };

  const signupmutation = useMutation({
    mutationFn: async (data) => {
      const response = await axios.post(
        "http://localhost:5000/api/users/signup",
        data,
        {
          withCredentials: true,
        }
      );
      return response.data;
    },
    onSuccess: (data) => {
      console.log("Signup successful:", data);
      // Redirect or show success message
    },
    onError: (error) => {
      console.error("Signup failed:", error);
      alert("Signup failed. Please try again.");
    },
  });

  return (
    <div className={styles.container}>
      <div className={styles.signupcard}>
        <h1 className={styles.header}>Create Account</h1>
        <p className={styles.subheading}>
          Enter your details to create a new account
        </p>
        <div className={styles.namediv}>
          <label htmlFor="fname" className={styles.label}>
            First Name
          </label>
          <input
            onChange={(e) => setFname(e.target.value)}
            id="fname"
            className={styles.name}
          />
          <label htmlFor="lname" className={styles.label}>
            Last Name
          </label>
          <input
            onChange={(e) => setLname(e.target.value)}
            id="lname"
            className={styles.name}
          />
        </div>
        <label htmlFor="type" className={styles.label}>
          I am a
        </label>
        <select
          id="type"
          onChange={(e) => setRole(e.target.value)}
          className={styles.type}
        >
          <option value="student">Student</option>
          <option value="tutor">Tutor</option>
        </select>
        <label htmlFor="email" className={styles.label}>
          Email
        </label>
        <input
          onChange={(e) => setEmail(e.target.value)}
          id="email"
          type="email"
          className={styles.email}
        />
        <label htmlFor="password" className={styles.label}>
          Password
        </label>
        <input
          onChange={(e) => setPassword(e.target.value)}
          id="password"
          type="password"
          className={styles.password}
        />
        <label htmlFor="confirm-password" className={styles.label}>
          Confirm Password
        </label>
        <input
          onChange={(e) => setConfirmPassword(e.target.value)}
          id="confirm-password"
          type="password"
          className={styles.password}
        />
        <button onClick={handleSignup} className={styles.signupbutton}>
          Sign Up
        </button>
        <p className={styles.logintext}>
          Already have an account?{" "}
          <a href="/login" className={styles.loginlink}>
            Log In
          </a>
        </p>
        <p className={styles.terms}>
          By signing up, you agree to our{" "}
          <a href="/terms" className={styles.termslink}>
            Terms of Service
          </a>{" "}
          and{" "}
          <a href="/privacy" className={styles.termslink}>
            Privacy Policy
          </a>
          .
        </p>
        <p className={styles.support}>
          Need help?{" "}
          <a href="/support" className={styles.supportlink}>
            Contact Support
          </a>
        </p>
      </div>
    </div>
  );
};

export default SignupPage;
