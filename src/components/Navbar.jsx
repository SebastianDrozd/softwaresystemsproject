import styles from "../styles/Navbar.module.css"
const Navbar = () => {
    return (
        <div className={styles.container}>
            <div className={styles.logocontainer}>
                <h2>BridgeLearn</h2>
            </div>
            <div className={styles.linkcontainer}>
                <ul className={styles.navlinks}>
                    <li><a href="/">Services</a></li>
                    <li><a href="/about">About</a></li>
                    <li><a href="/courses">Reviews</a></li>
                    <li><button className={styles.startedbutton}>Get Started</button></li>
                </ul>
            </div>
        </div>
    )
}


export default Navbar;