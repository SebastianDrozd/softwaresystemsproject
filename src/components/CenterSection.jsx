import styles from "../styles/CenterSection.module.css";

const CenterSection = () => {
  const stats = [
    { value: "500+", label: "Students Helped" },
    { value: "95%", label: "Grade Improvement" },
    { value: "$15", label: "Average Cost/Hr" },
    { value: "4.9", label: "Average Rating" },
  ];

  return (
    <div className={styles.container}>
      {stats.map((stat, i) => (
        <div key={i} className={styles.iconItem}>
          <h2 className={styles.iconHeader}>{stat.value}</h2>
          <h4 className={styles.iconSub}>{stat.label}</h4>
        </div>
      ))}
    </div>
  );
};

export default CenterSection;