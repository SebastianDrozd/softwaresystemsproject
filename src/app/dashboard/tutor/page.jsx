"use client"
import React, { useContext, useState } from 'react';
import styles from '../../../styles/TutorDashboard.module.css';
import {
  Calendar,
  Clock,
  DollarSign,
  Users,
  Star,
  Settings,
  BookOpen,
  TrendingUp,
  MessageSquare,
  Video,
  Phone,
  CheckCircle, XCircle
} from 'lucide-react';
import { AuthContext } from '@/util/AuthProvider';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getTutorBookingsByTutorId, setBookingApproved } from '@/api/Booking';
import axios from 'axios';
import { useRouter } from 'next/navigation';


const TutorDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const { user } = useContext(AuthContext)
  const queryClient = useQueryClient()
  const router = useRouter()

  const {
    data: bookings,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["bookings", user.id],
    queryFn: () => getTutorBookingsByTutorId(user.id),
    enabled: !!user,
  });

  const setApprovedMutation = useMutation({
    mutationFn: (data) => setBookingApproved(data),
    onSuccess: (data) => {
      queryClient.invalidateQueries("bookings")
      alert("changed")
    },
    onError: (error) => {
      alert("there was an error saving")
    }
  })


  const handleApproveButton = async (id) => {
    const { data } = await axios.post(`http://localhost:5000/api/rooms/createroom/${id}`)
    const url = data.roomUrl
    const dataToSend = {
      id,
      roomUrl: url
    }
    setApprovedMutation.mutate(dataToSend)
  }

 const handleGoToRoom = (roomUrl) => {
  if (!roomUrl) return;
  const parts = roomUrl.split("/");
  const roomName = parts[parts.length - 1];
  router.push(`/video/${roomName}`);
};
  console.log("these are bookings", bookings)

  const tutorData = {
    name: "Dr. Sarah Johnson",
    rating: 4.9,
    totalStudents: 45,
    monthlyEarnings: 2850,
    completedSessions: 127,
    subjects: ["Mathematics", "Physics", "Chemistry"]
  };

  const upcomingSessions = [
    { id: 1, student: "John Smith", subject: "Calculus", time: "2:00 PM", date: "Today", duration: "1 hour", type: "video" },
    { id: 2, student: "Emma Davis", subject: "Physics", time: "4:30 PM", date: "Today", duration: "45 min", type: "in-person" },
    { id: 3, student: "Michael Chen", subject: "Chemistry", time: "10:00 AM", date: "Tomorrow", duration: "1 hour", type: "video" }
  ];

  const recentMessages = [
    { id: 1, student: "Alice Johnson", message: "Can we reschedule tomorrow's session?", time: "2 hours ago", unread: true },
    { id: 2, student: "Bob Wilson", message: "Thank you for the great session!", time: "5 hours ago", unread: false }
  ];

  const stats = [
    { title: "Monthly Earnings", value: `$${tutorData.monthlyEarnings}`, icon: DollarSign, change: "+12%", changeType: "positive" },
    { title: "Active Students", value: tutorData.totalStudents, icon: Users, change: "+3", changeType: "positive" },
    { title: "Sessions This Month", value: "24", icon: BookOpen, change: "+8%", changeType: "positive" },
    { title: "Average Rating", value: tutorData.rating, icon: Star, change: "+0.1", changeType: "positive" }
  ];

  return (
    <div className={styles.dashboardContainer}>
      <div className={styles.statsGrid}>
        {stats.map((stat, index) => (
          <div key={index} className={styles.statCard}>
            <div className={styles.statContent}>
              <div>
                <p className={styles.statTitle}>{stat.title}</p>
                <p className={styles.statValue}>{stat.value}</p>
                <p className={stat.changeType === 'positive' ? styles.positiveChange : styles.negativeChange}>
                  {stat.change} from last month
                </p>
              </div>
              <div className={styles.statIconBox}>
                <stat.icon className={styles.statIcon} />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className={styles.mainGrid}>
        <div className={styles.sessionsColumn}>
          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <h2 className={styles.cardTitle}><Calendar className={styles.cardIcon} /> Pending Sessions</h2>
              <p className={styles.cardDescription}>Sessions Awaiting Approval</p>
            </div>
            <div className={styles.cardBody}>
              {bookings?.filter((booking) => booking.Status === "Pending").map((booking) => {
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
                          <h3 className={styles.sessionName}>Student #{booking.StudentId}</h3>
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
                      <button
                        className={styles.primaryButton}
                        onClick={() => { handleApproveButton(booking.BookingId) }}
                      >
                        <CheckCircle className={styles.buttonIcon} /> Approve
                      </button>
                    </div>
                  </div>
                );
              })}

              {bookings?.filter(b => b.Status === "Pending").length === 0 && (
                <p>No pending sessions.</p>
              )}


            </div>
          </div>
          <br />
          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <h2 className={styles.cardTitle}><Calendar className={styles.cardIcon} /> Approved Sessions</h2>
              <p className={styles.cardDescription}>Confirmed tutoring sessions</p>
            </div>

            <div className={styles.cardBody}>
              {bookings?.filter((booking) => booking.Status === "Approved")
                .map((booking) => {
                  const sessionDate = new Date(booking.SessionDate);
                  const readableDate = sessionDate.toLocaleDateString(undefined, {
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
                            <h3 className={styles.sessionName}>Student #{booking.StudentId}</h3>
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
                        <button className={styles.primaryButton} onClick={() => {handleGoToRoom(booking.RoomURL)}}>
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


        <div className={styles.sidebarColumn}>
          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <h2 className={styles.cardTitle}>Recent Messages</h2>
            </div>
            <div className={styles.cardBody}>
              {recentMessages.map((message) => (
                <div key={message.id} className={styles.messageItem}>
                  <div className={styles.messageHeader}>
                    <h4 className={styles.messageName}>{message.student}</h4>
                    <span className={styles.messageTime}>{message.time}</span>
                  </div>
                  <p className={styles.messageText}>{message.message}</p>
                  {message.unread && <div className={styles.unreadDot}></div>}
                </div>
              ))}
              <button className={styles.outlineButton}>View All Messages</button>
            </div>
          </div>

          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <h2 className={styles.cardTitle}>Profile Summary</h2>
            </div>
            <div className={styles.cardBody}>
              <div className={styles.profileItem}><Star className={styles.profileIcon} /> <span>{tutorData.rating}/5.0 Rating</span></div>
              <div className={styles.profileItem}><Users className={styles.profileIcon} /> <span>{tutorData.totalStudents} Active Students</span></div>
              <div className={styles.profileItem}><BookOpen className={styles.profileIcon} /> <span>{tutorData.completedSessions} Sessions Completed</span></div>
              <div>
                <p className={styles.subjectsLabel}>Subjects:</p>
                <div className={styles.subjectsList}>
                  {tutorData.subjects.map((subject, index) => (
                    <span key={index} className={styles.subjectBadge}>{subject}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default TutorDashboard;
