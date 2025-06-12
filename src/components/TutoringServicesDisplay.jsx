import styles from "../styles/TutoringServicesDisplay.module.css";
const TutoringServicesDisplay = () => {
  return (
    <div className={styles.container}>
      <div className={styles.headercontainer}>
        <h1 className={styles.header}>Our Tutoring Services</h1>
        <p className={styles.subHeader}>
          Personalized tutoring for all subjects and grade levels
        </p>
      </div>
      <div className={styles.cardcontainer}>
        <div className={styles.card}>
            <div className={styles.logo}>Logo</div>
            <h2 className={styles.cardheader}>Math</h2>
            <p className={styles.carddetails}>
              Expert tutors for algebra, geometry, calculus and more.
              </p>
            <h1 className={styles.price}>$15/hour</h1>
            <button className={styles.cardbutton}>Browse Tutors</button>
        </div>
         <div className={styles.card}>
            <div className={styles.logo}>Logo</div>
            <h2 className={styles.cardheader}>Math</h2>
            <p className={styles.carddetails}>
              Expert tutors for algebra, geometry, calculus and more.
              </p>
            <h1 className={styles.price}>$15/hour</h1>
            <button className={styles.cardbutton}>Browse Tutors</button>
        </div>
         <div className={styles.card}>
           <div className={styles.logo}>Logo</div>
            <h2 className={styles.cardheader}>Math</h2>
            <p className={styles.carddetails}>
              Expert tutors for algebra, geometry, calculus and more.
              </p>
            <h1 className={styles.price}>$15/hour</h1>
            <button className={styles.cardbutton}>Browse Tutors</button>
        </div>
      </div>
    </div>
  );
};

export default TutoringServicesDisplay;
