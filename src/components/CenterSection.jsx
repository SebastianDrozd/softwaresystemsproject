import styles from "../styles/CenterSection.module.css";
const CenterSection = () => {
    return (
        <div className={styles.container}>
            
                <div className={styles.iconitem}>
                    <h2 className={styles.iconheader}>500+</h2>
                    <h4 className={styles.iconsub}>Students Helped</h4>
                </div>
                 <div className={styles.iconitem}>
                    <h2 className={styles.iconheader}>95%</h2>
                    <h4 className={styles.iconsub}>Grade Improvement</h4>
                </div>
                 <div className={styles.iconitem}>
                    <h2 className={styles.iconheader}>$15</h2>
                    <h4 className={styles.iconsub}>Average Cost/Hr</h4>
                </div>
                 <div className={styles.iconitem}>
                    <h2 className={styles.iconheader}>4.9</h2>
                    <h4 className={styles.iconsub}>Average Rating</h4>
                </div>
           
        </div>
    )
}

export default CenterSection