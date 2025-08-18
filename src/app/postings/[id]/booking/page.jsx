
"use client";

import { useParams, useRouter } from "next/navigation";
import { getTutorPostById } from "@/api/TutorPosts";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useContext, useEffect, useState } from "react";
import { generateUpcomingSlots } from "@/util/availability";
import { createBooking } from "@/api/Booking";
import { AuthContext } from "@/util/AuthProvider";
import styles from "../../../../styles/BookingPage.module.css";
import { ArrowLeft, Calendar} from "lucide-react";

export default function BookingPage() {
  const [activeButton, setActiveButton] = useState("Homework Help");
  const { user } = useContext(AuthContext);
  const router = useRouter();
  const params = useParams();
  const { id } = params;
  const [selectedDate, setSelectedDate] = useState("");
  const [availableSlots, setAvailableSlots] = useState([]);
  const [selectedTime, setSelectedTime] = useState("");
  const [studentName, setStudentName] = useState("");
  const [studentEmail, setStudentEmail] = useState("");
  const [notes, setNotes] = useState("");
  const [hasSucceeded, setHasSucceeded] = useState(false);
  const [hasError, setHasError] = useState(false);
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
    if (!selectedDate || !selectedTime ) {
      setHasError(true);
      //set timeout
      setTimeout(() => {
        setHasError(false);
      }, 3000);
      return;
    }

    const [startTime, endTime] = selectedTime.split("-");
    
    const bookingData = {
      TutorId: post?.user_id,
      StudentId: user?.id,
      PostId: post?.post_id,
      StudentName: studentName,
      StudentEmail: studentEmail,
      HelpType: activeButton,
      SessionDate: selectedDate,
      StartTime: startTime,
      EndTime: endTime,
      Notes: notes,
      Status: "Pending"
    };

    createBookingMutation.mutate(bookingData);
  };

  const createBookingMutation = useMutation({
    mutationFn: (data) => createBooking(data),
    onSuccess: () => {
      setHasSucceeded(true);
      setTimeout(() => {
        setHasSucceeded(false);
        router.push(`/dashboard/student`); 
      }, 3000);
    },
    onError: (err) => {
      alert("There was an error creating the booking");
    }
  });

  if (isLoading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.loadingSpinner}></div>
        <p className={styles.loadingText}>Loading tutor details...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className={styles.errorContainer}>
        <h2>Unable to load tutor details</h2>
        <p>Please try again later or contact support if the problem persists.</p>
        <a onClick={() => {router.back()}} className={styles.backButton}>
          <ArrowLeft size={16} /> Back to Post
        </a>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <a onClick={() => {router.back()}} className={styles.backButton}>
          <ArrowLeft size={16} /> Back To View Post
        </a>
        
        <div className={styles.pageHeader}>
          <h1 className={styles.pageTitle}>Book Your Learning Session</h1>
          <p className={styles.pageSubtitle}>
            Connect with expert tutors and accelerate your academic journey
          </p>
        </div>

        <div className={styles.contentGrid}>
        

          <div className={styles.rightColumn}>
            <div className={styles.sidebarCard}>
              <h2 className={styles.sectionTitle}>Schedule Your Session</h2>
              <p className={styles.subsectionContent}>
                Book a personalized tutoring session with {post?.FirstName} at your preferred time
              </p>

              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Help Type</label>
                <div className={styles.helpTypeGrid}>
                  {["Homework Help", "Test Preparation", "Concept Review", "Practice Problems"].map((type) => (
                    <button
                      key={type}
                      onClick={() => setActiveButton(type)}
                      className={`${styles.helpTypeBtn} ${activeButton === type ? styles.helpTypeActive : ''}`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Select Date & Time</label>
                <div className={styles.dateTimeContainer}>
                  <select
                    className={styles.formSelect}
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
                    className={styles.formSelect}
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
              </div>
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Session Notes</label>
                <textarea
                  className={styles.formTextarea}
                  placeholder="Any specific topics, questions, or goals for this session?"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                ></textarea>
              </div>
              {hasError && <p className={styles.errorMessage}>Please fill in all required fields.</p>}
              {hasSucceeded && <p className={styles.successmessage}>You have successfully booked your session!</p>}
              <button className={styles.bookButton} onClick={handleBooking}>
                <Calendar size={18} /> Book Session Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
