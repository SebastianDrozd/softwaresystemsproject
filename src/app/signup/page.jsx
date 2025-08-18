"use client";
import { useContext, useState } from "react";
import styles from "../../styles/SignUpPage.module.css";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";
import { AuthContext } from "@/util/AuthProvider";

const SignupPage = () => {
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("student");
  const router = useRouter()
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [hasSuccess, setHasSuccess] = useState(false);
  const { setUser, refreshUser } = useContext(AuthContext)
  const handleSignup = () => {
    if (!fname || !lname || !email || !password || !confirmPassword) {
      setHasError(true);
      setErrorMessage("Please fill in all fields.");
      setTimeout(() => {
        setHasError(false);
      }, 3000);
      return;
    }
    if (password !== confirmPassword) {
      setHasError(true);
      setErrorMessage("Passwords do not match. Please try again.");
      setTimeout(() => {
        setHasError(false);
      }, 3000);
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
    onSuccess: async (data) => {
      const me = await refreshUser();
      setHasSuccess(true);
      setTimeout(() => {
        setHasSuccess(false);
      }, 2000);
      const user = data.user;
      if (user.role == "tutor") {
        console.log("user is logged in as tutor")
        router.push("/dashboard/tutor")
      }
      else if (user.role == "student") {
        router.push("/dashboard/student")
      }
    },
    onError: (error) => {
      if (error.response && error.response.status === 409) {
        setErrorMessage("Email already exists. Please use a different email.");
        setHasError(true);
        setTimeout(() => {
          setHasError(false);
        }, 3000);
        console.error("Email already exists:", error);
        return;
      }
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
          {hasSuccess && (
            <p className={styles.successMessage}>
              Signup successful! Welcome aboard!
            </p>
          )}
          {hasError && (
            <p className={styles.errorMessage}>
              {errorMessage}
            </p>
          )}
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