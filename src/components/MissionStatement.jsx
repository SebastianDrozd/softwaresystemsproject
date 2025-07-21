"use client";
import styles from "../styles/MissionStatement.module.css";
import { CheckCircle } from "lucide-react";

const MissionStatement = () => {
  return (
    <div className={styles.container}>
      <div className={styles.innercontainer}>
        <div className={styles.leftside}>
          <h1 className={styles.header}>Our Mission</h1>
          <p className={styles.subheader}>
            At BridgeLearn, we're committed to breaking down financial barriers
            that prevent students from accessing quality education. Our certified
            tutors work with families to create payment plans that fit any budget
          </p>
          <div className={styles.bottomcontainer}>
            <div className={styles.bottomleft}>
              <h5>Flexible Schedule</h5>
              <h5>Small Group Options</h5>
            </div>
            <div className={styles.bottomright}>
              <h5>Sliding Scale Pricing</h5>
              <h5>Community Focused</h5>
            </div>
          </div>
        </div>

        <div className={styles.rightside}>
          <div className={styles.rightinner}>
            <h1 className={styles.rightheader}>Why Choose Us?</h1>
            <ul className={styles.rightlist}>
              <li className={styles.rightlistitem}>
                <CheckCircle className={styles.icon} />
                Personalized tutoring for all subjects and grade levels
              </li>
              <li className={styles.rightlistitem}>
                <CheckCircle className={styles.icon} />
                Certified tutors with proven track records
              </li>
              <li className={styles.rightlistitem}>
                <CheckCircle className={styles.icon} />
                Affordable rates with flexible payment plans
              </li>
              <li className={styles.rightlistitem}>
                <CheckCircle className={styles.icon} />
                Commitment to community and educational equity
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MissionStatement;
