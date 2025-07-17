"use client"
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
 // const { id } = useParams();
 const router = useRouter();
  const [selectedTime, setSelectedTime] = useState('');
  const params = useParams()
  const {id} = params

  const {data : post, isLoading,isError} = useQuery({
    queryKey: ['post',id],
    queryFn : () => getTutorPostById(id),
    enabled : !!id
  })
  const handleGoToBooking = () => {
    router.push(`/postings/${id}/booking`)
  }
  const tutor = {
    id: 1,
    name: "Sarah Johnson",
    title: "Expert Mathematics Tutor - All Levels",
    subjects: ["Mathematics", "Algebra", "Geometry", "Calculus"],
    description: "Experienced math tutor...",
    longDescription: "With over 5 years of tutoring experience...",
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
    { id: 1, student: "John Smith", rating: 5, date: "2 weeks ago", comment: "Helped me get an A in calculus!" },
    { id: 2, student: "Emma Davis", rating: 5, date: "1 month ago", comment: "Highly recommend!" },
    { id: 3, student: "Michael Chen", rating: 4, date: "1 month ago", comment: "Explains topics clearly." }
  ];

  const availableSlots = [
    { day: "Monday", times: ["3:00 PM", "4:00 PM", "5:00 PM"] },
    { day: "Wednesday", times: ["3:00 PM", "4:00 PM", "5:00 PM"] },
    { day: "Friday", times: ["3:00 PM", "4:00 PM", "5:00 PM"] }
  ];

  return (
    <div className={styles.page}>
     

      <main className={styles.main}>
   

        <div className={styles.contentGrid}>
          <div className={styles.leftColumn}>
            <div className={styles.card}>
              <div className={styles.profileHeader}>
                <img src={tutor.profileImage} alt={tutor.name} className={styles.avatar} />
                {tutor.verified && <div className={styles.verified}><Award size={14} /></div>}
                <h1 className={styles.title}>{post?.PostTitle}</h1>
                <p className={styles.name}>by {post?.FirstName + " " + post?.LastName}</p>
                <div className={styles.rating}><Star size={16} /> {tutor.rating} ({tutor.reviewCount} reviews)</div>
                <div className={styles.students}><Users size={14} /> {tutor.totalStudents} students taught</div>
                <div className={styles.tags}>
                  {tutor.subjects.map((s, i) => <span key={i} className={styles.tag}>{s}</span>)}
                </div>
              </div>

              <div className={styles.infoGrid}>
                <div><MapPin size={14} /> {tutor.location}</div>
                <div><Clock size={14} /> Responds in {tutor.responseTime}</div>
                <div><Calendar size={14} /> {tutor.availability}</div>
                <div><GraduationCap size={14} /> {tutor.experience}</div>
              </div>
            </div>

            <div className={styles.card}>
              <h2>About</h2>
              <p>{tutor.longDescription}</p>
              <h3>Education</h3>
              <p>{tutor.education}</p>
              <h3>Languages</h3>
              <div className={styles.badges}>{tutor.languages.map((l, i) => <span key={i} className={styles.badge}>{l}</span>)}</div>
              <h3>Session Types</h3>
              <div className={styles.badges}>{tutor.sessionTypes.map((t, i) => <span key={i} className={styles.badge}>{t}</span>)}</div>
              <h3>Specialties</h3>
              <div className={styles.badges}>{tutor.specialties.map((s, i) => <span key={i} className={styles.badge}>{s}</span>)}</div>
            </div>

            <div className={styles.card}>
              <h2>Reviews</h2>
              {reviews.map(r => (
                <div key={r.id} className={styles.review}>
                  <strong>{r.student}</strong> <span>({r.date})</span>
                  <div className={styles.stars}>{Array.from({ length: r.rating }).map((_, i) => <Star key={i} size={14} />)}</div>
                  <p>{r.comment}</p>
                </div>
              ))}
            </div>

            <div className={styles.card}>
              <h2>Availability</h2>
              {availableSlots.map((slot, i) => (
                <div key={i} className={styles.slotGroup}>
                  <strong>{slot.day}</strong>
                  <div className={styles.timeSlots}>
                    {slot.times.map((time, j) => (
                      <button
                        key={j}
                        className={`${styles.timeBtn} ${selectedTime === `${slot.day}-${time}` ? styles.selected : ''}`}
                        onClick={() => setSelectedTime(`${slot.day}-${time}`)}
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className={styles.card}>
              <h2>Achievements</h2>
              <ul className={styles.achievementList}>
                {tutor.achievements.map((a, i) => (
                  <li key={i}><CheckCircle size={14} /> {a}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className={styles.rightColumn}>
            <div className={styles.cardSticky}>
              <div className={styles.price}>${tutor.price} <span>/hour</span></div>
              <button onClick={handleGoToBooking} className={styles.bookBtn}>
                <Calendar size={16} /> Book Session
              </button>
              <div className={styles.actions}>
                <button className={styles.outlineBtn}><MessageCircle size={14} /> Message</button>
                <button className={styles.outlineBtn}><Phone size={14} /> Call</button>
              </div>
              <div className={styles.meta}>
                <div><span>Response time:</span> {tutor.responseTime}</div>
                <div><span>Total students:</span> {tutor.totalStudents}</div>
                <div><span>Experience:</span> {tutor.experience}</div>
              </div>
              <div className={styles.verifiedNotice}>
                <CheckCircle size={14} /> Verified Tutor
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default TutorPost;
