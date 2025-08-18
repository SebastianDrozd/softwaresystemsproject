import Image from "next/image";
import styles from "./page.module.css";
import Hero from "@/components/Hero";
import CenterSection from "@/components/CenterSection";
import TutoringServicesDisplay from "@/components/TutoringServicesDisplay";
import MissionStatement from "@/components/MissionStatement";
import SuccessStories from "@/components/SuccessStories";
import ReadyToStart from "@/components/ReadyToStart";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className={styles.container}>
      <Hero />
      <CenterSection />
      <TutoringServicesDisplay />
      <MissionStatement />
      <SuccessStories />
      <ReadyToStart />
      <Footer />
    </div>
  );
}
