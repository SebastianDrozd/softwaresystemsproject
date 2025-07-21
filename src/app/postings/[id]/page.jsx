
"use client";

import React, { useState } from 'react';
import { getTutorPostById } from '@/api/TutorPosts'
import { useQuery } from '@tanstack/react-query'
import { useParams, useRouter } from 'next/navigation'
import styles from '../../../styles/TutorPost.module.css';
import {
  Star, MapPin, Clock, Calendar, MessageCircle, Phone, Award,
  BookOpen, GraduationCap, Users, CheckCircle, ArrowLeft,
  Video, Home
} from 'lucide-react';

const TutorPost = () => {
  const router = useRouter();
  const [selectedTime, setSelectedTime] = useState('');
  const params = useParams()
  const {id} = params

  const {data : post, isLoading, isError} = useQuery({
    queryKey: ['post',id],
    queryFn : () => getTutorPostById(id),
    enabled : !!id
  })

  const handleGoToBooking = () => {
    router.push(`/postings/${id}/booking`)
  }

  // Mock data - replace with actual data when available
  const tutor = {
    id: 1,
    name: "Sarah Johnson",
    title: "Expert Mathematics Tutor - All Levels",
    subjects: ["Mathematics", "Algebra", "Geometry", "Calculus"],
    description: "Experienced math tutor...",
    longDescription: "With over 5 years of tutoring experience, I specialize in helping students overcome math anxiety and achieve their academic goals. My approach focuses on building strong foundations and developing problem-solving confidence.",
    price: 12,
    location: "Downtown Library",
    availability: "Mon, Wed, Fri 3-6 PM",
    rating: 4.9,
    reviewCount: 47,
    totalStudents: 156,
    completedSessions: 340,
    experience: "5 years",
    education: "Master's in Mathematics Education",
    specialties: ["Algebra", "Geometry", "Calculus", "SAT Prep"],
    verified: true,
    responseTime: "2 hours",
    sessionTypes: ["In-Person", "Online"],
    languages: ["English", "Spanish"],
    profileImage: "https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=300&h=300&fit=crop&crop=face",
    achievements: ["Certified Math Tutor", "95% Student Success Rate", "Top Rated Tutor 2023"]
  };

  const reviews = [
    { id: 1, student: "John Smith", rating: 5, date: "2 weeks ago", comment: "Sarah helped me understand calculus concepts that I struggled with for months. Her explanations are clear and patient." },
    { id: 2, student: "Emma Davis", rating: 5, date: "1 month ago", comment: "Highly recommend! Improved my grades significantly and made math enjoyable." },
    { id: 3, student: "Michael Chen", rating: 4, date: "1 month ago", comment: "Explains topics clearly and provides excellent practice materials." }
  ];

  const availableSlots = [
    { day: "Monday", times: ["3:00 PM", "4:00 PM", "5:00 PM"] },
    { day: "Wednesday", times: ["3:00 PM", "4:00 PM", "5:00 PM"] },
    { day: "Friday", times: ["3:00 PM", "4:00 PM", "5:00 PM"] }
  ];

  if (isLoading) {
    return (
      <div className={styles.page}>
        <div className={styles.loadingContainer}>
          <div className={styles.loadingSpinner}></div>
          <p className={styles.loadingText}>Loading tutor profile...</p>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className={styles.page}>
        <div className={styles.errorContainer}>
          <h2>Profile not found</h2>
          <p>The tutor profile you're looking for doesn't exist.</p>
          <button onClick={() => router.back()} className={styles.backButton}>
            <ArrowLeft size={16} />
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <button onClick={() => router.back()} className={styles.backButton}>
          <ArrowLeft size={16} />
          Back to tutors
        </button>

        <div className={styles.contentGrid}>
          <div className={styles.leftColumn}>
            {/* Profile Header Card */}
            <div className={styles.card}>
              <div className={styles.profileHeader}>
                <div className={styles.avatarContainer}>
                  <img src={"https://i.ibb.co/vCVmv3x8/istockphoto-2042526830-612x612.jpg"} alt={tutor.name} className={styles.avatar} />
                  {tutor.verified && (
                    <div className={styles.verifiedBadge}>
                      <Award size={12} />
                    </div>
                  )}
                </div>
                
                <div className={styles.profileInfo}>
                  <h1 className={styles.tutorName}>
                    {post?.FirstName} {post?.LastName}
                  </h1>
                  <h2 className={styles.tutorTitle}>{post?.PostTitle}</h2>
                  
                  <div className={styles.ratingContainer}>
                    <div className={styles.rating}>
                      <Star className={styles.starIcon} size={14} fill="currentColor" />
                      <span className={styles.ratingValue}>{tutor.rating}</span>
                      <span className={styles.reviewCount}>({tutor.reviewCount} reviews)</span>
                    </div>
                    <div className={styles.studentCount}>
                      <Users size={14} />
                      <span>{tutor.totalStudents} students taught</span>
                    </div>
                  </div>

                  <div className={styles.subjectTags}>
                    {tutor.subjects.map((subject, index) => (
                      <span key={index} className={styles.subjectTag}>
                        {subject}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className={styles.quickInfo}>
                <div className={styles.infoItem}>
                  <MapPin className={styles.infoIcon} size={14} />
                  <span>{tutor.location}</span>
                </div>
                <div className={styles.infoItem}>
                  <Clock className={styles.infoIcon} size={14} />
                  <span>Responds in {tutor.responseTime}</span>
                </div>
                <div className={styles.infoItem}>
                  <Calendar className={styles.infoIcon} size={14} />
                  <span>{tutor.availability}</span>
                </div>
                <div className={styles.infoItem}>
                  <GraduationCap className={styles.infoIcon} size={14} />
                  <span>{tutor.experience} experience</span>
                </div>
              </div>
            </div>

            {/* About Section */}
            <div className={styles.card}>
              <h3 className={styles.sectionTitle}>About</h3>
              <p className={styles.description}>{tutor.longDescription}</p>
              
              <div className={styles.aboutSection}>
                <h4 className={styles.subsectionTitle}>Education</h4>
                <p className={styles.subsectionContent}>{tutor.education}</p>
              </div>

              <div className={styles.aboutSection}>
                <h4 className={styles.subsectionTitle}>Languages</h4>
                <div className={styles.badgeContainer}>
                  {tutor.languages.map((language, index) => (
                    <span key={index} className={styles.badge}>{language}</span>
                  ))}
                </div>
              </div>

              <div className={styles.aboutSection}>
                <h4 className={styles.subsectionTitle}>Session Types</h4>
                <div className={styles.badgeContainer}>
                  {tutor.sessionTypes.map((type, index) => (
                    <span key={index} className={styles.badge}>{type}</span>
                  ))}
                </div>
              </div>

              <div className={styles.aboutSection}>
                <h4 className={styles.subsectionTitle}>Specialties</h4>
                <div className={styles.badgeContainer}>
                  {tutor.specialties.map((specialty, index) => (
                    <span key={index} className={styles.badge}>{specialty}</span>
                  ))}
                </div>
              </div>
            </div>

            {/* Reviews Section */}
            <div className={styles.card}>
              <h3 className={styles.sectionTitle}>Student Reviews</h3>
              <div className={styles.reviewsContainer}>
                {reviews.map(review => (
                  <div key={review.id} className={styles.review}>
                    <div className={styles.reviewHeader}>
                      <div className={styles.reviewerInfo}>
                        <span className={styles.reviewerName}>{review.student}</span>
                        <span className={styles.reviewDate}>{review.date}</span>
                      </div>
                      <div className={styles.reviewRating}>
                        {Array.from({ length: review.rating }).map((_, index) => (
                          <Star key={index} className={styles.reviewStar} size={12} fill="currentColor" />
                        ))}
                      </div>
                    </div>
                    <p className={styles.reviewComment}>{review.comment}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Availability Section */}
            <div className={styles.card}>
              <h3 className={styles.sectionTitle}>Availability</h3>
              <div className={styles.availabilityContainer}>
                {availableSlots.map((slot, index) => (
                  <div key={index} className={styles.daySlot}>
                    <h4 className={styles.dayTitle}>{slot.day}</h4>
                    <div className={styles.timeSlots}>
                      {slot.times.map((time, timeIndex) => (
                        <button
                          key={timeIndex}
                          className={`${styles.timeSlot} ${
                            selectedTime === `${slot.day}-${time}` ? styles.selectedTime : ''
                          }`}
                          onClick={() => setSelectedTime(`${slot.day}-${time}`)}
                        >
                          {time}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Achievements Section */}
            <div className={styles.card}>
              <h3 className={styles.sectionTitle}>Achievements</h3>
              <div className={styles.achievementsList}>
                {tutor.achievements.map((achievement, index) => (
                  <div key={index} className={styles.achievement}>
                    <CheckCircle className={styles.achievementIcon} size={14} />
                    <span>{achievement}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className={styles.rightColumn}>
            <div className={styles.sidebarCard}>
              <div className={styles.priceSection}>
                <span className={styles.price}>${tutor.price}</span>
                <span className={styles.priceUnit}>/hour</span>
              </div>

              <button onClick={handleGoToBooking} className={styles.bookButton}>
                <Calendar size={16} />
                Book Session
              </button>

              <div className={styles.contactActions}>
                <button className={styles.contactButton}>
                  <MessageCircle size={14} />
                  Message
                </button>
                <button className={styles.contactButton}>
                  <Phone size={14} />
                  Call
                </button>
              </div>

              <div className={styles.tutorStats}>
                <div className={styles.statItem}>
                  <span className={styles.statLabel}>Response time</span>
                  <span className={styles.statValue}>{tutor.responseTime}</span>
                </div>
                <div className={styles.statItem}>
                  <span className={styles.statLabel}>Total students</span>
                  <span className={styles.statValue}>{tutor.totalStudents}</span>
                </div>
                <div className={styles.statItem}>
                  <span className={styles.statLabel}>Experience</span>
                  <span className={styles.statValue}>{tutor.experience}</span>
                </div>
              </div>

              <div className={styles.verificationBadge}>
                <CheckCircle size={14} />
                <span>Verified Tutor</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TutorPost;
