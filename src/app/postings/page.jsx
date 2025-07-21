
"use client";

import React, { useState } from "react";
import styles from "../../styles/Services.module.css";
import { Award, Calendar, Clock, GraduationCap, MapPin, MessageCircle, Star, Search, Filter, TrendingUp } from "lucide-react";
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
      ) && (filterSubject ? post.subjects.includes(filterSubject)  : true);
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
                  <Filter className={styles.filterIcon} size={16} />
                  <select
                    className={styles.filterSelect}
                    value={filterSubject}
                    onChange={(e) => setFilterSubject(e.target.value)}
                  >
                    <option value="">All Subjects</option>
                    <option value="Math">Mathematics</option>
                    <option value="Science">Science</option>
                    <option value="Language Arts">Language Arts</option>
                    <option value="Computer Science">Computer Science</option>
                    <option value="History">History</option>
                  </select>
                </div>
                
                <div className={styles.filterGroup}>
                  <TrendingUp className={styles.filterIcon} size={16} />
                  <select
                    className={styles.sortSelect}
                    value={sortOption}
                    onChange={(e) => setSortOption(e.target.value)}
                  >
                    <option value="rating">Highest Rated</option>
                    <option value="price_low">Lowest Price</option>
                    <option value="price_high">Highest Price</option>
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
                    <Image
                      src="https://i.ibb.co/7d8WN4Rh/premium-photo-1689568126014-06fea9d5d341.jpg"
                      alt={`${service.FirstName} ${service.LastName}`}
                      className={styles.avatar}
                      width={64}
                      height={64}
                    />
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
                    <p className={styles.subject}>{service.subject}</p>
                    <div className={styles.rating}>
                      <Star className={styles.starIcon} size={14} fill="currentColor" />
                      <span className={styles.ratingValue}>{service.rating}</span>
                      <span className={styles.reviewCount}>({service.reviewCount} reviews)</span>
                    </div>
                  </div>
                </div>

                <div className={styles.cardBody}>
                  <p className={styles.description}>{service.PostDescription}</p>
                  
                  <div className={styles.detailsGrid}>
                    <div className={styles.detail}>
                      <MapPin className={styles.detailIcon} size={14} />
                      <span>{service.location}</span>
                    </div>
                    <div className={styles.detail}>
                      <Clock className={styles.detailIcon} size={14} />
                      <span>{service.availability}</span>
                    </div>
                    <div className={styles.detail}>
                      <GraduationCap className={styles.detailIcon} size={14} />
                      <span>{service.experience} experience</span>
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
                    <a href={`/booking?tutor=${service.id}`} className={styles.bookBtn}>
                      <Calendar size={14} />
                      Book Session
                    </a>
                    <button className={styles.messageBtn}>
                      <MessageCircle size={14} />
                      Message
                    </button>
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
