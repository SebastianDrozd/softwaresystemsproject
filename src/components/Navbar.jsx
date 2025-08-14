"use client"
import { useContext, useState } from "react";
import styles from "../styles/Navbar.module.css"
import { AuthContext } from "@/util/AuthProvider";
import { useRouter } from "next/navigation";
import { BookOpen } from "lucide-react";
import { Menu, X } from "lucide-react";
const Navbar = () => {
    const {user,logout} = useContext(AuthContext)
    const router = useRouter()
    const [isOpen, setIsOpen] = useState(false);
const toggleMenu = () => setIsOpen(!isOpen)
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

    const handleLogout = () => {
        logout()
    }

    const handleGoToPosts = () => {
        router.push("/postings")
    }

    return (
      <div className={styles.container}>
  <div className={styles.logocontainer} onClick={handleGoToMainPage}>
    <BookOpen size={24} />
    <h2>BridgeLearn</h2>
  </div>

  <button className={styles.menuToggle} onClick={toggleMenu}>
    {isOpen ? <X /> : <Menu />}
  </button>

  <div className={`${styles.linkcontainer} ${isOpen ? styles.open : ""}`}>
    <ul className={styles.navlinks}>
      <li><a href="/postings">View Posts</a></li>
    
      <li>
        {user
          ? <button onClick={handleGoToDashboard}>My Dashboard</button>
          : <button onClick={handleGetStarted} className={styles.startedbutton}>Get Started</button>}
      </li>
      <li>{user && <button onClick={handleLogout}>Sign Out</button>}</li>
    </ul>
  </div>
</div>

    )
}


export default Navbar;