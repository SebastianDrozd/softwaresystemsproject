"use client"
import React, { useContext, useState } from 'react';

import styles from '../../../../styles/CreateTutoringPost.module.css';
import { AuthContext } from '@/util/AuthProvider';
import { useMutation, useQuery } from '@tanstack/react-query';
import { createTutorPost } from '@/api/TutorPosts';
import { getAllSubjects } from '@/api/Subjects';
import { useRouter } from 'next/navigation';

const subjectOptions = [
  'Mathematics', 'Physics', 'Chemistry', 'Biology', 'English Literature',
  'History', 'Geography', 'Computer Science', 'Economics', 'Psychology',
  'Foreign Languages', 'Art', 'Music', 'Business Studies'
];
const daysOfWeek = [
  'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'
];

const CreateTutoringPost = () => {
    const {user} = useContext(AuthContext)
    const router = useRouter()
   const [formData, setFormData] = useState({
    tutor : user?.id,
    title: '',
    description: '',
    subjects: [''],
    hourlyRate: '',
    availability: [],
    experience: '',
    qualifications: '',
    profileImage: null
  });

  const {
    data : subjects
  } = useQuery({
    queryKey: ['subjects'],
    queryFn : () => getAllSubjects()},
  )

  const [errors, setErrors] = useState({});

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleSubjectChange = (index, value) => {
    const updated = [...formData.subjects];
    updated[index] = value;
    setFormData(prev => ({ ...prev, subjects: updated }));
  };

  const addSubject = () => {
    if (formData.subjects.length < 5) {
      setFormData(prev => ({ ...prev, subjects: [...prev.subjects, ''] }));
    }
  };

  const removeSubject = (index) => {
    if (formData.subjects.length > 1) {
      const filtered = formData.subjects.filter((_, i) => i !== index);
      setFormData(prev => ({ ...prev, subjects: filtered }));
    }
  };
const handleAvailabilityChange = (index, field, value) => {
    const updated = [...formData.availability];
    updated[index][field] = value;
    setFormData(prev => ({ ...prev, availability: updated }));
  };

  const addAvailabilitySlot = () => {
    setFormData(prev => ({
      ...prev,
      availability: [...prev.availability, { day: 'Monday', start: '15:00', end: '17:00' }]
    }));
  };

  const removeAvailabilitySlot = (index) => {
    const updated = formData.availability.filter((_, i) => i !== index);
    setFormData(prev => ({ ...prev, availability: updated }));
  };
  const validateForm = () => {
    const newErrors = {};
    if (!formData.title.trim()) newErrors.title = 'Title is required';
    if (!formData.description.trim()) newErrors.description = 'Description is required';
    if (!formData.hourlyRate) newErrors.hourlyRate = 'Hourly rate is required';
    if (formData.availability.length==0) newErrors.availability = 'Availability is required';
  //  if (formData.subjects.some(s => !s.trim())) newErrors.subjects = 'All subjects must be selected';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
   const createPostMutation = useMutation({
    mutationFn : (data) =>  createTutorPost(data),
    onSuccess : () => {
        alert("Post Created!")
        router.replace("/dashboard/tutor/create/success")
    },
    onError : (err) => {
        console.log(err)
    }

  })

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    console.log('Form submitted:', formData);
    createPostMutation.mutate(formData)
   // navigate('/tutor-dashboard');
  };

 
  return (
    <div className={styles.page}>
  <form className={styles.form} onSubmit={handleSubmit}>
    {/* BASIC INFORMATION */}
    <section className={styles.card}>
      <h2 className={styles.cardTitle}>Basic Information</h2>

      <div className={styles.field}>
        <label>Post Title *</label>
        <input
          type="text"
          value={formData.title}
          onChange={(e) => handleInputChange('title', e.target.value)}
          className={`${styles.input} ${errors.title ? styles.error : ''}`}
          placeholder="e.g., Expert Math Tutor"
        />
        {errors.title && <span className={styles.errorText}>{errors.title}</span>}
      </div>

      <div className={styles.field}>
        <label>Description *</label>
        <textarea
          value={formData.description}
          onChange={(e) => handleInputChange('description', e.target.value)}
          className={`${styles.textarea} ${errors.description ? styles.error : ''}`}
          placeholder="Describe your teaching style..."
        />
        {errors.description && <span className={styles.errorText}>{errors.description}</span>}
      </div>

      <div className={styles.field}>
        <label>Subjects You Teach *</label>
        {formData.subjects.map((subject, index) => (
          <div key={index} className={styles.subjectRow}>
            <select
              className={styles.select}
              value={subject}
              onChange={(e) => handleSubjectChange(index, e.target.value)}
            >
              <option value="">Select a subject</option>
              {subjects && subjects.map((option) => (
                <option key={option.SubjectId} value={option.SubjectName}>{option.SubjectName}</option>
              ))}
            </select>
            {formData.subjects.length > 1 && (
              <button
                type="button"
                onClick={() => removeSubject(index)}
                className={`${styles.button} ${styles.outlineButton}`}
              >
                Remove
              </button>
            )}
          </div>
        ))}
        {formData.subjects.length < 5 && (
          <button
            type="button"
            onClick={addSubject}
            className={`${styles.button} ${styles.outlineButton}`}
          >
            Add Subject
          </button>
        )}
        {errors.subjects && <span className={styles.errorText}>{errors.subjects}</span>}
      </div>
    </section>

    {/* SESSION DETAILS */}
    <section className={styles.card}>
      <h2 className={styles.cardTitle}>Session Details</h2>

      <div className={styles.field}>
         <p>Here at </p>
        <label>Hourly Rate (USD) *</label>
       
        <input
          type="number"
          value={formData.hourlyRate}
          onChange={(e) => handleInputChange('hourlyRate', e.target.value)}
          className={`${styles.input} ${errors.hourlyRate ? styles.error : ''}`}
          placeholder="25"
        />
        {errors.hourlyRate && <span className={styles.errorText}>{errors.hourlyRate}</span>}
      </div>

    

      <div className={styles.field}>
        <label>Availability *</label>
        {formData.availability.map((slot, index) => (
            <div key={index} className={styles.subjectRow}>
              <select
                className={styles.select}
                value={slot.day}
                onChange={(e) => handleAvailabilityChange(index, 'day', e.target.value)}
              >
                {daysOfWeek.map(day => <option key={day} value={day}>{day}</option>)}
              </select>
              <input
                type="time"
                className={styles.input}
                value={slot.start}
                onChange={(e) => handleAvailabilityChange(index, 'start', e.target.value)}
              />
              <input
                type="time"
                className={styles.input}
                value={slot.end}
                onChange={(e) => handleAvailabilityChange(index, 'end', e.target.value)}
              />
              <button type="button" className={styles.button} onClick={() => removeAvailabilitySlot(index)}>
                Remove
              </button>
            </div>
          ))}

          <button type="button" className={styles.button} onClick={addAvailabilitySlot}>
            Add Availability Slot
          </button>
          {errors.availability && <span className={styles.errorText}>{errors.availability}</span>}
      </div>

   
    </section>
        
    {/* QUALIFICATIONS */}
    <section className={styles.card}>
      <h2 className={styles.cardTitle}>Qualifications</h2>

      <div className={styles.field}>
        <label>Teaching Experience</label>
        <textarea
          value={formData.experience}
          onChange={(e) => handleInputChange('experience', e.target.value)}
          className={styles.textarea}
          placeholder="Years of experience, teaching style, etc."
        />
      </div>

      <div className={styles.field}>
        <label>Education & Certifications</label>
        <textarea
          value={formData.qualifications}
          onChange={(e) => handleInputChange('qualifications', e.target.value)}
          className={styles.textarea}
          placeholder="Degrees, certificates, etc."
        />
      </div>

      <div className={styles.field}>
        <label>Profile Image</label>
        <input
          type="file"
          accept="image/*"
          className={styles.input}
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) setFormData(prev => ({ ...prev, profileImage: file }));
          }}
        />
      </div>
    </section>

    {/* ACTION BUTTONS */}
    <div className={styles.actions}>
      <button
        type="button"
        onClick={() => navigate('/tutor-dashboard')}
        className={`${styles.button} ${styles.outlineButton}`}
      >
        Cancel
      </button>
      <button type="submit" className={styles.button}>
        Publish Post
      </button>
    </div>
  </form>
</div>

  );
};

export default CreateTutoringPost;
