
"use client";

import React, { useState } from "react";
import styles from "../../styles/Services.module.css";
import { Award, Calendar, Clock, GraduationCap, Star, Search } from "lucide-react";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import { getTutorPosts } from "@/api/TutorPosts";

const Services = () => {
  const { data: posts, isLoading } = useQuery({
    queryKey: ["posts"],
    queryFn: () => getTutorPosts(),
  });

  const [searchTerm, setSearchTerm] = useState("");
  const [filterSubject, setFilterSubject] = useState("");
  const [sortOption, setSortOption] = useState("rating");

  const filteredPosts = posts
    ?.filter((post) => {
      return (
        (post.FirstName + " " + post.LastName).toLowerCase().includes(searchTerm.toLowerCase()) ||
        post?.subject?.toLowerCase().includes(searchTerm.toLowerCase())
      ) && (filterSubject ? post.subjects.includes(filterSubject) : true);
    })
    .sort((a, b) => {
      if (sortOption === "rating") return b.rating - a.rating;
      if (sortOption === "price_low") return a.HourlyRate - b.HourlyRate;
      if (sortOption === "price_high") return b.HourlyRate - a.HourlyRate;
      return 0;
    });

  if (isLoading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.loadingSpinner}></div>
        <p className={styles.loadingText}>Loading tutors...</p>
      </div>
    );
  }
  console.log(posts)
  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <section className={styles.heroSection}>
          <div className={styles.heroContent}>
            <h1 className={styles.heroHeading}>
              Find Professional Tutors
            </h1>
            <p className={styles.heroDescription}>
              Connect with verified educators and subject matter experts for personalized learning experiences.
            </p>

            <div className={styles.searchContainer}>
              <div className={styles.searchInputWrapper}>
                <Search className={styles.searchIcon} size={20} />
                <input
                  type="text"
                  placeholder="Search tutors by name or subject..."
                  className={styles.searchInput}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              <div className={styles.filtersRow}>
                <div className={styles.filterGroup}>

                  <select
                    className={styles.filterSelect}
                    value={filterSubject}
                    onChange={(e) => setFilterSubject(e.target.value)}
                  >
                    <option value="">All Subjects</option>
                    <option value="Math">Mathematics</option>
                    <option value="Science">Science</option>
                    <option value="Language Arts">Language Arts</option>
                    <option value="History">History</option>
                    <option value="Geography">Geography</option>
                    <option value="Computer Science">Computer Science</option>
                    <option value="Economics">Economics</option>
                    <option value="Psychology">Psychology</option>
                    <option value="Foreign Languages">Foreign Languages</option>
                    <option value="Art">Art</option>
                    <option value="Music">Music</option>
                    <option value="Business Studies">Business Studies</option>
                  </select>
                </div>


              </div>
            </div>
          </div>
        </section>

        <section className={styles.resultsSection}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>
              {filteredPosts?.length || 0} Tutor Posts
            </h2>
            <p className={styles.sectionSubtitle}>
              All tutors are verified professionals
            </p>
          </div>

          <div className={styles.tutorGrid}>
            {filteredPosts?.map((service) => (
              <article key={service.post_id} className={styles.tutorCard}>
                <div className={styles.cardHeader}>
                  <div className={styles.avatarContainer}>

                    {service.verified && (
                      <div className={styles.verifiedBadge}>
                        <Award size={12} />
                      </div>
                    )}
                  </div>

                  <div className={styles.tutorInfo}>
                    <h3 className={styles.tutorName}>
                      {service.FirstName} {service.LastName}
                    </h3>
                    <div className={styles.subjectTags}>
                      {service.subjects?.split("||").map((subject, index) => (
                        <span key={index} className={styles.subjectTag}>
                          {subject + " "}
                        </span>
                      ))}
                    </div>

                  </div>
                </div>

                <div className={styles.cardBody}>
                  <p className={styles.description}>{service.PostDescription}</p>

                  <div className={styles.detailsGrid}>

                    <div className={styles.detail}>
                      <Clock className={styles.detailIcon} size={14} />
                      <div className={styles.availabilityList}>
                        {service.availability?.split("||").map((slot, index) => (
                          <div key={index} className={styles.availabilityItem}>
                            {slot}
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className={styles.detail}>
                      <GraduationCap className={styles.detailIcon} size={14} />
                      <span>{service.Experience}</span>
                    </div>
                    <div className={styles.detail}>
                      <Star className={styles.detailIcon} size={14} />
                      <span>{service.Qualifications}</span>
                    </div>
                  </div>

                  {service?.specialties && service.specialties.length > 0 && (
                    <div className={styles.specialties}>
                      <div className={styles.tags}>
                        {service.specialties.slice(0, 3).map((specialty, index) => (
                          <span key={index} className={styles.tag}>
                            {specialty}
                          </span>
                        ))}
                        {service.specialties.length > 3 && (
                          <span className={styles.tagMore}>
                            +{service.specialties.length - 3} more
                          </span>
                        )}
                      </div>
                    </div>
                  )}
                </div>

                <div className={styles.cardFooter}>
                  <div className={styles.priceContainer}>
                    <span className={styles.price}>${service.HourlyRate}/hr</span>
                  </div>

                  <div className={styles.actionButtons}>
                    <a href={`/postings/${service.post_id}`} className={styles.viewProfileBtn}>
                      View Profile
                    </a>
                    <a href={`/postings/${service.post_id}/booking`} className={styles.bookBtn}>
                      <Calendar size={14} />
                      Book Session
                    </a>

                  </div>
                </div>
              </article>
            ))}
          </div>

          {(!filteredPosts || filteredPosts.length === 0) && !isLoading && (
            <div className={styles.emptyState}>
              <div className={styles.emptyStateIcon}>🔍</div>
              <h3 className={styles.emptyStateTitle}>No tutors found</h3>
              <p className={styles.emptyStateText}>
                Try adjusting your search criteria to find more results.
              </p>
              <button
                className={styles.clearFiltersBtn}
                onClick={() => {
                  setSearchTerm("");
                  setFilterSubject("");
                  setSortOption("rating");
                }}
              >
                Clear Filters
              </button>
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default Services;
