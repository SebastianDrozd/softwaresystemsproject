// pages/postings/[id]/booking.jsx
"use client";

import styles from "../../../../styles/BookingPage.module.css";
import { useParams, useRouter } from "next/navigation";
import { getTutorPostById } from "@/api/TutorPosts";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { generateUpcomingSlots } from "@/util/availability";

export default function BookingPage() {
  const [activeButton, setActiveButton] = useState("Homework Help");
  const router = useRouter();
  const params = useParams();
  const { id } = params;
  const [selectedDate, setSelectedDate] = useState("");
  const [availableSlots, setAvailableSlots] = useState([]);
  const [selectedTime, setSelectedTime] = useState("");
  const [studentName, setStudentName] = useState("");
  const [studentEmail, setStudentEmail] = useState("");
  const [notes, setNotes] = useState("");
  const {
    data: post,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["post", id],
    queryFn: () => getTutorPostById(id),
    enabled: !!id,
  });

  useEffect(() => {
    if (post?.availability) {
      const slots = generateUpcomingSlots(post.availability);
      setAvailableSlots(slots);
    }
  }, [post]);
const handleBooking = async () => {
  const bookingData = {
    tutorId: post?.user_id,
    postId: post?.post_id,
    studentName,
    studentEmail,
    helpType: activeButton,
    date: selectedDate,
    time: selectedTime,
    notes,
  };

  console.log("Submitting booking:", bookingData);
  // await axios.post("/api/bookings", bookingData)
};


  console.log(post);
  return (
    <div className={styles.container}>
      <a href="/services" className={styles.backLink}>
        ← Back to Services
      </a>
      <h1 className={styles.title}>Book Your Learning Session</h1>
      <p className={styles.subtitle}>
        Connect with expert tutors and accelerate your academic journey
      </p>

      <div className={styles.grid}>
        <div className={styles.leftPanel}>
          <div className={styles.tutorCard}>
            <div className={styles.avatar}></div>
            <div className={styles.tutorInfo}>
              <h2>{post?.FirstName}</h2>

              <div className={styles.ratingRow}>
                <span className={styles.rating}>4.9 (47)</span>
                <span className={styles.rate}>${post?.HourlyRate}/hour</span>
              </div>
              <p>{post?.PostDescription}</p>
              <div className={styles.stats}>
                <div>
                  <strong>156</strong>
                  <p>Students Taught</p>
                </div>
                <div>
                  <strong>98%</strong>
                  <p>Success Rate</p>
                </div>
              </div>
              <p>📍 Downtown Library</p>
              <p>🎓{post?.Experience}</p>
              <div className={styles.tags}>
                {post?.subjects.split("||").map((subject, index) => (
                  <span key={index}>{subject}</span>
                ))}
              </div>
              <div className={styles.responseTime}>
                Usually responds within 2 hours
              </div>
              <div className={styles.actionButtons}>
                <button className={styles.message}>Message</button>
                <button className={styles.call}>Call</button>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.rightPanel}>
          <div className={styles.scheduleBox}>
            <h2>Schedule Your Session</h2>
            <p>
              Book a personalized tutoring session with{" "}
              {post?.FirstName + " " + post?.LastName} at Downtown Library
            </p>

            <div className={styles.helpTypes}>
              <button
                onClick={() => {
                  setActiveButton("Homework Help");
                }}
                className={activeButton == "Homework Help" && styles.active}
              >
                Homework Help
              </button>
              <button
                onClick={() => {
                  setActiveButton("Test Preparation");
                }}
                className={activeButton == "Test Preparation" && styles.active}
              >
                Test Preparation
              </button>
              <button
                onClick={() => {
                  setActiveButton("Concept Review");
                }}
                className={activeButton == "Concept Review" && styles.active}
              >
                Concept Review
              </button>
              <button
                onClick={() => {
                  setActiveButton("Practice Problems");
                }}
                className={activeButton == "Practice Problems" && styles.active}
              >
                Practice Problems
              </button>
            </div>

            <div className={styles.dateTimeRow}>
              <select
                onChange={(e) => setSelectedDate(e.target.value)}
                value={selectedDate}
              >
                <option value="">Choose an available date</option>
                {[...new Set(availableSlots.map((s) => s.date))].map(
                  (uniqueDate, idx) => {
                    const label = availableSlots.find(
                      (s) => s.date === uniqueDate
                    )?.displayLabel;
                    return (
                      <option key={idx} value={uniqueDate}>
                        {label}
                      </option>
                    );
                  }
                )}
              </select>

              <select
                disabled={!selectedDate}
                onChange={(e) => setSelectedTime(e.target.value)}
                value={selectedTime}
              >
                <option value="">Choose a time slot</option>
                {availableSlots
                  .filter((slot) => slot.date === selectedDate)
                  .map((slot, idx) => (
                    <option key={idx} value={`${slot.start}-${slot.end}`}>
                      {slot.start} - {slot.end}
                    </option>
                  ))}
              </select>
            </div>

            <div className={styles.studentInfo}>
              <input
                type="text"
                placeholder="Enter student's full name"
                value={studentName}
                onChange={(e) => setStudentName(e.target.value)}
              />

              <input
                type="email"
                placeholder="Enter contact email"
                value={studentEmail}
                onChange={(e) => setStudentEmail(e.target.value)}
              />
            </div>

            <textarea
              className={styles.notes}
              placeholder="Any specific topics, questions, or goals for this session?"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            ></textarea>

           <button className={styles.bookButton} onClick={handleBooking}>
  Book Session Now
</button>
          </div>
        </div>
      </div>
    </div>
  );
}
