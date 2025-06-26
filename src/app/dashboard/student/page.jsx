"use client"
import React, { useState } from 'react';
import styles from '../../../styles/StudentDashboard.module.css';
import { Search, Calendar, BookOpen, Star, Clock, DollarSign, User, Filter, MessageSquare, Video, Phone, Heart, TrendingUp, CreditCard, Award } from 'lucide-react';

const BuyerDashboard = () => {
  const [searchQuery, setSearchQuery] = useState('');

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
            <div className={styles.searchSection}>
              <input
                className={styles.input}
                placeholder="Search subjects, tutors..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className={styles.recommendedTutors}>
              <h3>Recommended for You</h3>
              {/* Placeholder Tutors */}
              {["Emily Watson", "David Kim", "Jennifer Liu"].map((name, i) => (
                <div key={i} className={styles.tutorCard}>
                  <div className={styles.tutorAvatar}><User /></div>
                  <div className={styles.tutorDetails}>
                    <h4>{name}</h4>
                    <div className={styles.ratingStars}>
                      <Star /> 4.{9 - i} • ${40 + i * 5}/hr
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div>
              <h3>Upcoming Sessions</h3>
              {["Today", "Tomorrow"].map((day, i) => (
                <div key={i} className={styles.sessionCard}>
                  <p>{day} with Tutor #{i + 1}</p>
                  <button>Join</button>
                </div>
              ))}
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
