"use client"
import React, { useContext, useState } from 'react';
import styles from '../../../styles/StudentDashboard.module.css';
import { Search, Calendar, BookOpen, Star, Clock, DollarSign, User, Filter, MessageSquare, Video, Phone, Heart, TrendingUp, CreditCard, Award } from 'lucide-react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { AuthContext } from '@/util/AuthProvider';
import { getRecentBookings, getTutorBookingsByStudentId } from '@/api/Booking';
import { useRouter } from 'next/navigation';

const StudentDashboard = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const { user } = useContext(AuthContext)
  const router = useRouter()
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [reviewText, setReviewText] = useState("");
  const [selectedBooking, setSelectedBooking] = useState(null);
  const queryClient = useQueryClient();
  
const createReviewMutation = useMutation({
  mutationFn: async (newReview) => {
    const res = await fetch("http://localhost:5000/api/reviews", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newReview),
    });

    if (!res.ok) {
      throw new Error("Failed to create review");
    }

    return res.json();
  },
  onSuccess: () => {
    // Refetch reviews so UI updates automatically
    queryClient.invalidateQueries(["studentReviews", user?.id]);
    handleCloseReviewModal();
  },
});

  const handleOpenReviewModal = (booking) => {
    setSelectedBooking(booking);
    setReviewText("");
    setIsReviewModalOpen(true);
  };

  const handleCloseReviewModal = () => {
    setIsReviewModalOpen(false);
    setSelectedBooking(null);
  };

  const { data: studentReviews } = useQuery({
    queryKey: ["studentReviews", user?.id],
    queryFn: async () => {
      const res = await fetch(`http://localhost:5000/api/reviews/student/${user?.id}`);
      return res.json();
    },
    enabled: !!user,
  });

 const handleSubmitReview = () => {
  if (!selectedBooking) return;

  createReviewMutation.mutate({
    TutorId: selectedBooking.TutorId,
    StudentId: selectedBooking.StudentId,
    Description: reviewText,
  });
};
  const {
    data: bookings,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["bookings", user?.id],
    queryFn: () => getTutorBookingsByStudentId(user?.id),
    enabled: !!user,
  });
  console.log("these are bookings", bookings)

  const {
    data: recentBookings,
    isLoading: isRecentLoading,
    isError: isRecentError,
  } = useQuery({
    queryKey: ["recentBookings", user?.id],
    queryFn: () => getRecentBookings(user?.id),
    enabled: !!user,
  });
  console.log("these are recent bookings", recentBookings)

  console.log("these are bookings", bookings)
  const buyerData = {
    name: "Alex Thompson",
    totalSessions: 18,
    monthlySpending: 420,
    favoriteTutors: 3,
    upcomingSessions: 2
  };

  const stats = [
    { title: "Sessions This Month", value: "6", icon: BookOpen, change: "+2", changeType: "positive" },
    { title: "Hours Learned", value: "24", icon: Clock, change: "+8", changeType: "positive" },
    { title: "Monthly Spending", value: `$${buyerData.monthlySpending}`, icon: DollarSign, change: "-$50", changeType: "negative" },
    { title: "Favorite Tutors", value: buyerData.favoriteTutors, icon: Heart, change: "+1", changeType: "positive" }
  ];

  const recentSessions = [
    { id: 1, tutor: "Dr. Sarah Johnson", subject: "Calculus", date: "Yesterday", rating: 5, status: "completed" },
    { id: 2, tutor: "Prof. Michael Chen", subject: "Physics", date: "3 days ago", rating: 4, status: "completed" }
  ];

  const progress = [
    { subject: "Mathematics", percent: 75 },
    { subject: "Physics", percent: 60 },
    { subject: "Chemistry", percent: 45 }
  ];
  const handleGoToRoom = (roomUrl) => {
    if (!roomUrl) return;
    const parts = roomUrl.split("/");
    const roomName = parts[parts.length - 1];
    router.push(`/video/${roomName}`);
  };

  const handleFindTutors = () => {
    router.push('/postings');
  }
  return (
    <div className={styles.container}>
      <div className={styles.dashboardContent}>


        <div className={styles.gridMain}>
          <div className={styles.mainColumn}>
            <div>
              <div className={styles.sessionsColumn}>
                {/* Pending Sessions */}
                <div className={styles.card}>
                  <div className={styles.cardHeader}>
                    <h2 className={styles.cardTitle}><Calendar className={styles.cardIcon} /> Pending Sessions</h2>
                    <p className={styles.cardDescription}>Sessions Awaiting Tutor Approval</p>
                  </div>
                  <div className={styles.cardBody}>
                    {bookings?.filter(b => b.Status === "Pending").map((booking) => {
                      const sessionDate = new Date(booking.SessionDate);
                      const readableDate = sessionDate.toLocaleDateString(undefined, {
                        weekday: "short",
                        month: "short",
                        day: "numeric"
                      });

                      const timeRange = `${booking.StartTime.slice(0, 5)} - ${booking.EndTime.slice(0, 5)}`;

                      return (
                        <div key={booking.BookingId} className={styles.sessionItem}>
                          <div className={styles.sessionInfo}>
                            <div className={styles.sessionHeader}>
                              <div className={styles.sessionIconBox}>
                                <Clock className={styles.sessionIcon} />
                              </div>
                              <div>
                                <h3 className={styles.sessionName}>Tutor:  {booking.FirstName + " " + booking.LastName}</h3>
                                <p className={styles.sessionSubject}>{booking.HelpType}</p>
                              </div>
                            </div>
                            <div className={styles.sessionMeta}>
                              <span><Clock className={styles.metaIcon} /> {timeRange} • {readableDate}</span>
                              <strong>{"  " + booking.Status}</strong>
                            </div>
                          </div>
                        </div>
                      );
                    })}

                    {bookings?.filter(b => b.Status === "Pending").length === 0 && (
                      <p>No pending sessions.</p>
                    )}
                  </div>
                </div>

                {/* Approved Sessions */}
                <div className={styles.card}>
                  <div className={styles.cardHeader}>
                    <div>
                      <h2 className={styles.cardTitle}><Calendar className={styles.cardIcon} /> Approved Sessions</h2>
                      <p className={styles.cardDescription}>Confirmed tutoring sessions</p>
                    </div>

                  </div>
                  <div className={styles.cardBody}>
                    {bookings
                      ?.filter(b => b.Status === "Approved")
                      .map((booking) => {
                        const sessionDateTime = new Date(`${booking.SessionDate.slice(0, 10)}T${booking.StartTime}`);
                        const now = new Date();

                        // 1 hour in milliseconds
                        const oneHour = 60 * 60 * 1000;

                        // Allow join if within 1 hour before OR after start
                        const canJoin = now >= new Date(sessionDateTime.getTime() - oneHour);

                        const readableDate = sessionDateTime.toLocaleDateString(undefined, {
                          weekday: "short",
                          month: "short",
                          day: "numeric",
                        });

                        const timeRange = `${booking.StartTime.slice(0, 5)} - ${booking.EndTime.slice(0, 5)}`;

                        return (
                          <div key={booking.BookingId} className={styles.sessionItem}>
                            <div className={styles.sessionInfo}>
                              <div className={styles.sessionHeader}>
                                <div className={styles.sessionIconBox}>
                                  <Video className={styles.sessionIcon} />
                                </div>
                                <div>
                                  <h3 className={styles.sessionName}>
                                    Tutor: {booking.FirstName + " " + booking.LastName}
                                  </h3>
                                  <p className={styles.sessionSubject}>{booking.HelpType}</p>
                                </div>
                              </div>
                              <div className={styles.sessionMeta}>
                                <span>
                                  <Clock className={styles.metaIcon} /> {timeRange} • {readableDate}
                                </span>
                                <span>Status: <strong>{booking.Status}</strong></span>
                              </div>
                            </div>

                            {canJoin && (
                              <div className={styles.sessionActions}>
                                <button
                                  className={styles.primaryButton}
                                  onClick={() => handleGoToRoom(booking.RoomURL)}
                                >
                                  <Video className={styles.buttonIcon} /> Join
                                </button>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    


                    {bookings?.filter(b => b.Status === "Approved").length === 0 && (
                      <p>No approved sessions yet.</p>
                    )}
                  </div>
                </div>
                {/* Completed  Sessions  Need to also add button to leave*/}
                <div className={styles.card}>
                  <div className={styles.cardHeader}>
                    <h2 className={styles.cardTitle}><Calendar className={styles.cardIcon} /> Completed Sessions</h2>
                    <p className={styles.cardDescription}>Sessions that you have completed with tutors</p>
                  </div>
                  <div className={styles.cardBody}>
                    {bookings?.filter(b => b.Status === "Finished").map((booking) => {
                      const sessionDate = new Date(booking.SessionDate);
                      const readableDate = sessionDate.toLocaleDateString(undefined, {
                        weekday: "short",
                        month: "short",
                        day: "numeric"
                      });

                      const timeRange = `${booking.StartTime.slice(0, 5)} - ${booking.EndTime.slice(0, 5)}`;

                      const alreadyReviewed = studentReviews?.some(
                        review => review.TutorId === booking.TutorId // or BookingId if reviews are per booking
                      );

                      return (
                        <div key={booking.BookingId} className={styles.sessionItem}>
                          <div className={styles.sessionInfo}>
                            <div className={styles.sessionHeader}>
                              <div className={styles.sessionIconBox}>
                                <Clock className={styles.sessionIcon} />
                              </div>
                              <div>
                                <h3 className={styles.sessionName}>
                                  Tutor: {booking.FirstName + " " + booking.LastName}
                                </h3>
                                <p className={styles.sessionSubject}>{booking.HelpType}</p>
                              </div>
                            </div>
                            <div className={styles.sessionMeta}>
                              <span><Clock className={styles.metaIcon} /> {timeRange} • {readableDate}</span>
                            </div>
                          </div>

                          {!alreadyReviewed && (
                            <div className={styles.sessionActions}>
                              <button
                                className={styles.primaryButton}
                                onClick={() => handleOpenReviewModal(booking)}
                              >
                                Leave a Review
                              </button>
                            </div>
                          )}
                        </div>
                      );
                    })}
                   


                    {bookings?.filter(b => b.Status === "Finished").length === 0 && (
                      <p>No finished sessions.</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.sidebar}>
            <div className={styles.quickActions}>
              <h3>Quick Actions</h3>
              <button onClick={handleFindTutors}>Find Tutors</button>

            </div>

            <div className={styles.card}>
              <h3>Recent Sessions</h3>
              {recentBookings?.map((s) => (
                <div key={s.BookingId} className={styles.sessionCard}>
                  <p>{s.HelpType}</p>
                  <br />
                  <p>{s.FirstName + " " + s.LastName + "    " + new Date(s.SessionDate).toLocaleDateString()}  </p>

                </div>
              ))}
            </div>


          </div>
        </div>
      </div>
      {isReviewModalOpen && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <h3>Leave a Review for {selectedBooking?.FirstName} {selectedBooking?.LastName}</h3>
            <textarea
              className={styles.reviewTextarea}
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
              placeholder="Write your review..."
            />
            <div className={styles.modalActions}>
              <button onClick={handleSubmitReview} className={styles.primaryButton}>Submit</button>
              <button onClick={handleCloseReviewModal} className={styles.secondaryButton}>Cancel</button>
            </div>
          </div>
        </div>
      )}

    </div>

  );
};

export default StudentDashboard;