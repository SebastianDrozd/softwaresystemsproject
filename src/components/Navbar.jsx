"use client"
import { useContext } from "react";
import styles from "../styles/Navbar.module.css"
import { AuthContext } from "@/util/AuthProvider";
import { useRouter } from "next/navigation";
const Navbar = () => {
    const {user} = useContext(AuthContext)
    const router = useRouter()
    const handleGoToDashboard = () => {
        if(user.role == "tutor"){
            router.push("/dashboard/tutor")
        }
        else if (user.role == "student"){
            router.push("/dashboard/student")
        }
    }
    const handleGoToMainPage = () => {
        router.push("/")
    }
    const handleGetStarted = () => {
        router.push("/login")
    }
    return (
        <div className={styles.container}>
            <div className={styles.logocontainer}>
                <h2 onClick={handleGoToMainPage}>BridgeLearn</h2>
            </div>
            <div className={styles.linkcontainer}>
                <ul className={styles.navlinks}>
                    <li><a href="/">Services</a></li>
                    <li><a href="/about">About</a></li>
                    <li><a href="/courses">Reviews</a></li>
                    <li>{user ?  <button onClick={handleGoToDashboard} >My Dashboard</button> : <button onClick={handleGetStarted} className={styles.startedbutton}>Get Started</button> }</li>
                </ul>
            </div>
        </div>
    )
}


export default Navbar;