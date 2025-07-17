"use client"
import React from 'react';
import styles from "../../styles/Services.module.css"
import { BookOpen, Star, MapPin, Clock, Calendar, MessageCircle, Award, GraduationCap } from 'lucide-react';
import Image from 'next/image';
import { useQuery } from '@tanstack/react-query';
import { getTutorPosts } from '@/api/TutorPosts';


const Services = () => {
    const { data: posts, isLoading, isError } = useQuery({
        queryKey: ['posts'],
        queryFn : () => getTutorPosts()
    })

    const services = [
        {
            id: 1,
            tutorName: "Sarah Johnson",
            subject: "Mathematics",
            description: "Experienced math tutor specializing in algebra, geometry, and calculus.",
            price: "$12/hour",
            location: "Downtown Library",
            availability: "Mon, Wed, Fri 3-6 PM",
            rating: 4.9,
            reviewCount: 47,
            experience: "5 years",
            specialties: ["Algebra", "Geometry", "Calculus"],
            verified: true,
            profileImage: "https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=150&h=150&fit=crop&crop=face"
        },
        {
            id: 6,
            tutorName: "Sarah Johnson",
            subject: "Mathematics",
            description: "Experienced math tutor specializing in algebra, geometry, and calculus.",
            price: "$12/hour",
            location: "Downtown Library",
            availability: "Mon, Wed, Fri 3-6 PM",
            rating: 4.9,
            reviewCount: 47,
            experience: "5 years",
            specialties: ["Algebra", "Geometry", "Calculus"],
            verified: true,
            profileImage: "https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=150&h=150&fit=crop&crop=face"
        },
        {
            id: 5,
            tutorName: "Sarah Johnson",
            subject: "Mathematics",
            description: "Experienced math tutor specializing in algebra, geometry, and calculus.",
            price: "$12/hour",
            location: "Downtown Library",
            availability: "Mon, Wed, Fri 3-6 PM",
            rating: 4.9,
            reviewCount: 47,
            experience: "5 years",
            specialties: ["Algebra", "Geometry", "Calculus"],
            verified: true,
            profileImage: "https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=150&h=150&fit=crop&crop=face"
        },
        {
            id: 4,
            tutorName: "Sarah Johnson",
            subject: "Mathematics",
            description: "Experienced math tutor specializing in algebra, geometry, and calculus.",
            price: "$12/hour",
            location: "Downtown Library",
            availability: "Mon, Wed, Fri 3-6 PM",
            rating: 4.9,
            reviewCount: 47,
            experience: "5 years",
            specialties: ["Algebra", "Geometry", "Calculus"],
            verified: true,
            profileImage: "https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=150&h=150&fit=crop&crop=face"
        },
        {
            id: 3,
            tutorName: "Sarah Johnson",
            subject: "Mathematics",
            description: "Experienced math tutor specializing in algebra, geometry, and calculus.",
            price: "$12/hour",
            location: "Downtown Library",
            availability: "Mon, Wed, Fri 3-6 PM",
            rating: 4.9,
            reviewCount: 47,
            experience: "5 years",
            specialties: ["Algebra", "Geometry", "Calculus"],
            verified: true,
            profileImage: "https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=150&h=150&fit=crop&crop=face"
        },
        {
            id: 2,
            tutorName: "Sarah Johnson",
            subject: "Mathematics",
            description: "Experienced math tutor specializing in algebra, geometry, and calculus.",
            price: "$12/hour",
            location: "Downtown Library",
            availability: "Mon, Wed, Fri 3-6 PM",
            rating: 4.9,
            reviewCount: 47,
            experience: "5 years",
            specialties: ["Algebra", "Geometry", "Calculus"],
            verified: true,
            profileImage: "https://ibb.co/S4Wn7rdS"
        },
        // Add more services as needed
    ];

    return (
        <div className={styles.page}>


            <section className={styles.heroSection}>
                <h1 className={styles.heroHeading}>Find Your Perfect <span className={styles.heroGradientText}>Tutor</span></h1>
                <p className={styles.heroDescription}>Connect with expert tutors and accelerate your learning journey</p>
            </section>

            <section className={styles.resultsSection}>
                <h2 className={styles.resultsTitle}></h2>
                <div className={styles.tutorGrid}>
                    {posts && posts.map(service => (
                        <div key={service.post_id} className={styles.card}>
                            <div className={styles.cardHeader}>
                                <Image
                                    src="https://i.ibb.co/7d8WN4Rh/premium-photo-1689568126014-06fea9d5d341.jpg"
                                    alt={"image"}
                                    className={styles.avatar}
                                    width={80}
                                    height={80}
                                    objectFit="cover"
                                    style={{ borderRadius: '9999px' }}
                                />

                                {service.verified && <div className={styles.verified}><Award size={12} /></div>}
                                <h3 className={styles.tutorName}>{service.FirstName + " " + service.LastName}</h3>
                                <p className={styles.subject}>{service.subject}</p>
                            </div>

                            <div className={styles.cardBody}>
                                <p className={styles.description}>{service.PostDescription}</p>
                                <div className={styles.rating}><Star size={14} /> {service.rating} ({service.reviewCount})</div>
                                <div className={styles.details}><MapPin size={14} /> {service.location}</div>
                                <div className={styles.details}><Clock size={14} /> {service.availability}</div>
                                <div className={styles.details}><GraduationCap size={14} /> {service.experience} experience</div>
                                <div className={styles.tags}>
                                    {service?.specialties?.map((s, i) => <span key={i} className={styles.tag}>{s}</span>)}
                                </div>
                            </div>

                            <div className={styles.cardFooter}>
                                <a href={`/postings/${service.post_id}`} className={styles.linkBtn}>View Post</a>
                                <a href={`/booking?tutor=${service.id}`} className={styles.bookBtn}><Calendar size={14} /> Book</a>
                                <button className={styles.messageBtn}><MessageCircle size={14} /> Message</button>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );

};

export default Services;
