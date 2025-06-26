"use client"
import React, { useState } from 'react';
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
  Phone
} from 'lucide-react';


const TutorDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');

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
              <h2 className={styles.cardTitle}><Calendar className={styles.cardIcon} /> Upcoming Sessions</h2>
              <p className={styles.cardDescription}>Your scheduled tutoring sessions</p>
            </div>
            <div className={styles.cardBody}>
              {upcomingSessions.map((session) => (
                <div key={session.id} className={styles.sessionItem}>
                  <div className={styles.sessionInfo}>
                    <div className={styles.sessionHeader}>
                      <div className={styles.sessionIconBox}>
                        {session.type === 'video' ? (
                          <Video className={styles.sessionIcon} />
                        ) : (
                          <Users className={styles.sessionIcon} />
                        )}
                      </div>
                      <div>
                        <h3 className={styles.sessionName}>{session.student}</h3>
                        <p className={styles.sessionSubject}>{session.subject}</p>
                      </div>
                    </div>
                    <div className={styles.sessionMeta}>
                      <span><Clock className={styles.metaIcon} /> {session.time} • {session.date}</span>
                      <span>{session.duration}</span>
                    </div>
                  </div>
                  <div className={styles.sessionActions}>
                    <button className={styles.outlineButton}><MessageSquare className={styles.buttonIcon} /> Message</button>
                    <button className={styles.primaryButton}>
                      {session.type === 'video' ? (
                        <><Video className={styles.buttonIcon} /> Join</>
                      ) : (
                        <><Phone className={styles.buttonIcon} /> Call</>
                      )}
                    </button>
                  </div>
                </div>
              ))}
              <div className={styles.cardFooter}>
              
                  <button className={styles.outlineButton}>View Full Calendar</button>
               
              </div>
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
