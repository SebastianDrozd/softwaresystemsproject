"use client"
import React, { useContext, useState } from 'react';
import styles from '../../../styles/StudentDashboard.module.css';
import { Search, Calendar, BookOpen, Star, Clock, DollarSign, User, Filter, MessageSquare, Video, Phone, Heart, TrendingUp, CreditCard, Award } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { AuthContext } from '@/util/AuthProvider';
import { getTutorBookingsByStudentId } from '@/api/Booking';
import { useRouter } from 'next/navigation';

const BuyerDashboard = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const { user } = useContext(AuthContext)
  const router = useRouter()
  const {
    data: bookings,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["bookings", user.id],
    queryFn: () => getTutorBookingsByStudentId(user.id),
    enabled: !!user,
  });
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
  return (
    <div className={styles.container}>
      <div className={styles.dashboardContent}>
        <div className={styles.gridStats}>
          {stats.map((stat, i) => (
            <div key={i} className={styles.statCard}>
              <div className={styles.cardContent}>
                <div>
                  <p className={styles.cardTitle}>{stat.title}</p>
                  <p className={styles.cardValue}>{stat.value}</p>
                  <p className={stat.changeType === 'positive' ? styles.cardChangePositive : styles.cardChangeNegative}>
                    {stat.change} from last month
                  </p>
                </div>
                <div className={styles.cardIconWrapper}><stat.icon /></div>
              </div>
            </div>
          ))}
        </div>

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
                                <h3 className={styles.sessionName}>Tutor #{booking.TutorId}</h3>
                                <p className={styles.sessionSubject}>{booking.HelpType}</p>
                              </div>
                            </div>
                            <div className={styles.sessionMeta}>
                              <span><Clock className={styles.metaIcon} /> {timeRange} • {readableDate}</span>
                              <span>Status: <strong>{booking.Status}</strong></span>
                            </div>
                          </div>
                          <div className={styles.sessionActions}>
                            <button className={styles.outlineButton}>Message</button>
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
                    <h2 className={styles.cardTitle}><Calendar className={styles.cardIcon} /> Approved Sessions</h2>
                    <p className={styles.cardDescription}>Confirmed tutoring sessions</p>
                  </div>
                  <div className={styles.cardBody}>
                    {bookings?.filter(b => b.Status === "Approved").map((booking) => {
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
                                <Video className={styles.sessionIcon} />
                              </div>
                              <div>
                                <h3 className={styles.sessionName}>Tutor #{booking.TutorId}</h3>
                                <p className={styles.sessionSubject}>{booking.HelpType}</p>
                              </div>
                            </div>
                            <div className={styles.sessionMeta}>
                              <span><Clock className={styles.metaIcon} /> {timeRange} • {readableDate}</span>
                              <span>Status: <strong>{booking.Status}</strong></span>
                            </div>
                          </div>
                          <div className={styles.sessionActions}>
                            <button className={styles.outlineButton}>Message</button>
                            <button className={styles.primaryButton} onClick={() => handleGoToRoom(booking.RoomURL)}>
                              <Video className={styles.buttonIcon} /> Join
                            </button>
                          </div>
                        </div>
                      );
                    })}

                    {bookings?.filter(b => b.Status === "Approved").length === 0 && (
                      <p>No approved sessions yet.</p>
                    )}
                  </div>
                </div>
              </div>

            </div>
          </div>

          <div className={styles.sidebar}>
            <div className={styles.quickActions}>
              <button>Book Session</button>
              <button>Find Tutors</button>
              <button>View Progress</button>
              <button>Payment History</button>
            </div>

            <div>
              <h3>Recent Sessions</h3>
              {recentSessions.map((s) => (
                <div key={s.id} className={styles.sessionCard}>
                  <p>{s.subject} - {s.tutor}</p>
                  <p>{s.date}</p>
                </div>
              ))}
            </div>

            <div className={styles.learningProgress}>
              <h3>Learning Progress</h3>
              {progress.map((p, i) => (
                <div key={i}>
                  <p>{p.subject}</p>
                  <div className={styles.progressWrapper}>
                    <div className={styles.progressBar} style={{ width: `${p.percent}%` }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuyerDashboard;
