"use client"
import React, { useEffect } from 'react';

import styles from '../../../../../styles/PostSuccess.module.css';
import { useRouter } from 'next/navigation';

const PostSuccess = () => {
  const router = useRouter()

  // Prevent back navigation



  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <h1 className={styles.title}>🎉 Post Created Successfully!</h1>
        <p className={styles.subtitle}>Your tutoring post is now live and visible to students.</p>

        <div className={styles.actions}>
         

          <button
            className={styles.outlineButton}
            onClick={() => router.push('/dashboard/tutor')}
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostSuccess;
