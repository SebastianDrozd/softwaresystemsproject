import styles from "../styles/Hero.module.css";
const Hero = () => {
  return (
    <div className={styles.container}>
      <div className={styles.innercontainer}>
        <h1 className={styles.header1}>Quality Tutoring That</h1>
        <h1 className={styles.header2}>Everyone Can Afford</h1>
        <h5 className={styles.headerdetails}>
          We believe every student deserves access to excellent education. Our
          certified tutors provide personalized learning support at prices that
          work for your family's budget.
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

export default Hero;
