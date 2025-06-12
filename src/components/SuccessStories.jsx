import styles from "../styles/SuccessStories.module.css";
const SuccessStories = () => {
    return (
    <div className={styles.container}>
        <div className={styles.innercontainer}>
           <div className={styles.header}>
            <h1 className={styles.header}> Student Success Stories</h1>
            <p className={styles.subheader}>
                Hear from students and families who have transformed their learning experience with BridgeLearn.
            </p>
            </div> 
            <div className={styles.successcards}>
                <div className={styles.successcard}>
                    <h2 className={styles.successheader}>Maria's Journey</h2>
                    <p className={styles.successdetails}>
                        "With the help of my tutor, I improved my math skills and gained confidence in my abilities. I went from struggling to excelling in just a few months!"
                    </p>
                </div>
                <div className={styles.successcard}>
                    <h2 className={styles.successheader}>James' Transformation</h2>
                    <p className={styles.successdetails}>
                        "BridgeLearn made it possible for me to get the support I needed without breaking the bank. My grades have never been better!"
                    </p>
                </div>
                <div className={styles.successcard}>
                    <h2 className={styles.successheader}>Sophia's Success</h2>
                    <p className={styles.successdetails}>
                        "Thanks to my tutor, I not only improved my grades but also developed a love for learning that I never had before."
                    </p>
                </div>
            </div>
        </div>

    </div>
    )
}

export default SuccessStories;