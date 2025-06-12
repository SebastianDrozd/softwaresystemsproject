import styles from "../styles/ReadyToStart.module.css";
const ReadyToStart = () => {
  return (
    <div className={styles.container}>
      <div className={styles.innercontainer}>
        <h1 className={styles.header}>Ready to Start Learning?</h1>
        <h5 className={styles.subheader}>
          Join our community of learners and start your journey today!
        </h5>
        <div className={styles.buttondiv}>
          <button className={styles.browsebutton}>Browse Tutors</button>
          <button className={styles.consultationbutton}>
            Free Consultation
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReadyToStart;
