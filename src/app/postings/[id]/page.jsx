
"use client";

import React, { useState } from 'react';
import { getTutorPostById } from '@/api/TutorPosts'
import { useQuery } from '@tanstack/react-query'
import { useParams, useRouter } from 'next/navigation'
import styles from '../../../styles/TutorPost.module.css';
import {Calendar,CheckCircle, ArrowLeft} from 'lucide-react';
import { getReviewsByTutorId } from '@/api/Reviews';

const TutorPost = () => {
  const router = useRouter();
  const [selectedTime, setSelectedTime] = useState('');
  const params = useParams()
  const { id } = params

  const { data: post, isLoading, isError } = useQuery({
    queryKey: ['post', id],
    queryFn: () => getTutorPostById(id),
    enabled: !!id
  })
  const availabilitySlots = post?.availability
    ?.split("||") // 
    .map(entry => {
      const [day, timeRange] = entry.split(" ");
      const [start, end] = timeRange.split("-");
      return {
        day,
        start: start.slice(0, 5), 
        end: end.slice(0, 5)
      };
    }) || [];
 
  const { data: reviews } = useQuery({
    queryKey: ['reviews', id],
    queryFn: () => getReviewsByTutorId(post?.user_id),
    enabled: !!post
  });
  const handleGoToBooking = () => {
    router.push(`/postings/${id}/booking`)
  }


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

                <div className={styles.profileInfo}>
                  <h1 className={styles.tutorName}>
                    {post?.FirstName} {post?.LastName}
                  </h1>
                  <h2 className={styles.tutorTitle}>{post?.PostTitle}</h2>

                  <div className={styles.ratingContainer}>
                  </div>

                  <div className={styles.subjectTags}>
                    {post?.subjects.split("||").map((subject, index) => (
                      <span key={index} className={styles.subjectTag}>
                        {subject}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

            </div>

            {/* About Section */}
            <div className={styles.card}>
              <h3 className={styles.sectionTitle}>About</h3>
              <p className={styles.description}>{post?.PostDescription}</p>

              <div className={styles.aboutSection}>
                <h4 className={styles.subsectionTitle}>Education</h4>
                <p className={styles.subsectionContent}>{post.Qualifications}</p>
              </div>
                <div className={styles.aboutSection}>
                <h4 className={styles.subsectionTitle}>Experience</h4>
                <p className={styles.subsectionContent}>{post.Experience}</p>
              </div>
            </div>

            {/* Reviews Section */}
            <div className={styles.card}>
              <h3 className={styles.sectionTitle}>Student Reviews</h3>
              <div className={styles.reviewsContainer}>
                {reviews?.map(review => (
                  <div key={review.ReviewId} className={styles.review}>
                    <div className={styles.reviewHeader}>
                      <div className={styles.reviewerInfo}>
                        <span className={styles.reviewerName}>{review.FirstName + " " + review.LastName}</span>
                      </div>

                    </div>
                    <p className={styles.reviewComment}>{review.Description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Availability Section */}
            <div className={styles.card}>
              <h3 className={styles.sectionTitle}>Availability</h3>
              <div className={styles.availabilityContainer}>
                {availabilitySlots.map((slot, index) => (
                  <div key={index} className={styles.daySlot}>
                    <h4 className={styles.dayTitle}>{slot.day}</h4>
                    <div className={styles.timeSlots}>
                      <button
                        className={`${styles.timeSlot} ${selectedTime === `${slot.day}-${slot.start}-${slot.end}`
                            ? styles.selectedTime
                            : ''
                          }`}
                        onClick={() =>
                          setSelectedTime(`${slot.day}-${slot.start}-${slot.end}`)
                        }
                      >
                        {slot.start} - {slot.end}
                      </button>
                    </div>
                  </div>
                ))}
              </div>

            </div>


          </div>

          {/* Sidebar */}
          <div className={styles.rightColumn}>
            <div className={styles.sidebarCard}>
              <div className={styles.priceSection}>
                <span className={styles.price}>${post?.HourlyRate}</span>
                <span className={styles.priceUnit}>/hour</span>
              </div>

              <button onClick={handleGoToBooking} className={styles.bookButton}>
                <Calendar size={16} />
                Book Session
              </button>
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
