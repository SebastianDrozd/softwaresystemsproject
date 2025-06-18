import styles from "../../styles/LoginPage.module.css";
const LoginPage = () => {
    return (
        <div className={styles.container}>
            <div className={styles.logincard}>
                <h1 className={styles.loginheading}>Sign In</h1>
                <p className={styles.loginsub}>Enter your credentials to access your account</p>
                <input className={styles.userinput} />
                <input className={styles.passinput} type="password" />
                <button className={styles.loginbtn}>Login</button>
                <hr className={styles.hrline} />
                <div className={styles.donthave}>
                    <p className={styles.donthavepara}>Don't have an account?</p>
                    <a href="/signup" className={styles.signupbtn}>Sign Up</a>
                </div>
            </div>

        </div>
    )
}


export default LoginPage;