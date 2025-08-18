import styles from "../styles/Footer.module.css";
const Footer = () => {
    return (
        <div className={styles.container}>
            <div className={styles.innercontainer}>
                <div className={styles.flexcontainer}>
                    <div className={styles.flexitem}>
                        <h3 className={styles.footerheader}>BridgeLearn</h3>
                        <p className={styles.footertext}>
                            Empowering students through personalized tutoring and mentorship.
                        </p>
                    </div>
                    <div className={styles.flexitem}>
                        <h3 className={styles.footerheader}>Services</h3>
                        <div className={styles.footercolumn}>
                            <p className={styles.footertext}>Math Tutoring</p>
                            <p className={styles.footertext}>Science Tutoring</p>
                            <p className={styles.footertext}>Language Arts Tutoring</p>
                            <p className={styles.footertext}>Test Prep</p>
                        </div>
                    </div>
                    <div className={styles.flexitem}>
                        <h3 className={styles.footerheader}>Support</h3>
                        <div className={styles.footercolumn}>
                            <p className={styles.footertext}>Contact Us</p>
                            <p className={styles.footertext}>FAQs</p>
                            <p className={styles.footertext}>Privacy Policy</p>
                            <p className={styles.footertext}>Terms of Service</p>
                        </div>
                    </div>
                    <div className={styles.flexitem}>
                        <h3 className={styles.footerheader}>Contact</h3>
                        <div className={styles.footercolumn}>
                            <p className={styles.footertext}>Phone : (123) 456-7890</p>
                            <p className={styles.footertext}>Email : test@gmail.com </p>
                        </div>
                    </div>
                </div>
                <p className={styles.copyright}>
                    &copy; {new Date().getFullYear()} BridgeLearn. All rights reserved.
                </p>
            </div>
        </div>
    )
}
export default Footer;