"use client"
import React, { useContext, useState } from 'react';
import styles from '../../../styles/TutorDashboard.module.css';
import {
  Calendar,
  Clock,
  Users,
  BookOpen,
  Video,
  CheckCircle
} from 'lucide-react';
import { AuthContext } from '@/util/AuthProvider';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getAllFinishedBookings, getTutorBookingsByTutorId, setBookingApproved, setBookingFinished } from '@/api/Booking';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const TutorDashboard = () => {
  const { user } = useContext(AuthContext)
  const queryClient = useQueryClient()
  const router = useRouter()

  const {
    data: bookings,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["bookings", user?.id],
    queryFn: () => getTutorBookingsByTutorId(user?.id),
    enabled: !!user,
  });

  const {
    data: finishedBookings,
    isLoading: isFinishedBookingsLoading,
    isError: isFinishedBookingsError,
  } = useQuery({
    queryKey: ["finishedBookings"],
    queryFn: () => getAllFinishedBookings(user?.id),
    enabled: !!user,
  });
  console.log("finishedBookings", finishedBookings)
  const setFinishedMutation = useMutation({
    mutationFn: (id) => setBookingFinished(id),
    onSuccess: (data) => {
      queryClient.invalidateQueries("bookings")
    },
    onError: (error) => {
      alert("There was an error finishing the session")
    }
  })

  const handleFinishSession = (id) => {
    setFinishedMutation.mutate(id)
  }

  const setApprovedMutation = useMutation({
    mutationFn: (data) => setBookingApproved(data),
    onSuccess: (data) => {
      queryClient.invalidateQueries("bookings")
    },
    onError: (error) => {
      alert("there was an error saving")
    }
  })

  const handleApproveButton = async (id) => {
    const { data } = await axios.post(`http://localhost:5000/api/rooms/createroom/${id}`)
    const url = data.roomUrl
    const dataToSend = {
      id,
      roomUrl: url
    }
    setApprovedMutation.mutate(dataToSend)
  }

  const handleGoToRoom = (roomUrl) => {
    if (!roomUrl) return;
    const parts = roomUrl.split("/");
    const roomName = parts[parts.length - 1];
    router.push(`/video/${roomName}`);
  };

  const handleCreateNewPost = () => {
    router.push("/dashboard/tutor/create")
  }




  return (
    <div className={styles.container}>
      <div className={styles.dashboardContent}>
        <div className={styles.gridStats}>
        </div>
        <div className={styles.gridMain}>
          <div className={styles.mainColumn}>
            <div className={styles.card}>
              <div className={styles.cardHeader}>
                <h2 className={styles.cardTitle}><Calendar className={styles.cardIcon} /> Pending Sessions</h2>
                <p className={styles.cardDescription}>Sessions Awaiting Approval</p>
              </div>
              <div className={styles.cardBody}>
                {bookings?.filter((booking) => booking.Status === "Pending").map((booking) => {
                  const sessionDate = new Date(booking.SessionDate);
                  const readableDate = sessionDate.toLocaleDateString(undefined, {
                    weekday: "short",
                    month: "short",
                    day: "numeric"
                  });

                  const timeRange = `${booking.StartTime.slice(0, 5)} - ${booking.EndTime.slice(0, 5)}`;

                  return (
                    <div key={booking.BookingId} className={styles.sessionItem}>
                      <div className={styles.sessionInfo}>
                        <div className={styles.sessionHeader}>
                          <div className={styles.sessionIconBox}>
                            <Video className={styles.sessionIcon} />
                          </div>
                          <div>
                            <h3 className={styles.sessionName}>Student #{booking.StudentId}</h3>
                            <p className={styles.sessionSubject}>{booking.HelpType}</p>
                          </div>
                        </div>
                        <div className={styles.sessionMeta}>
                          <span><Clock className={styles.metaIcon} /> {timeRange} • {readableDate}</span>
                          <span>Status: <strong>{booking.Status}</strong></span>
                        </div>
                      </div>
                      <div className={styles.sessionActions}>
                        <button className={styles.outlineButton}>Message</button>
                        <button
                          className={styles.primaryButton}
                          onClick={() => { handleApproveButton(booking.BookingId) }}
                        >
                          <CheckCircle className={styles.buttonIcon} /> Approve
                        </button>
                      </div>
                    </div>
                  );
                })}

                {bookings?.filter(b => b.Status === "Pending").length === 0 && (
                  <p>No pending sessions.</p>
                )}
              </div>
            </div>
            <div className={styles.card}>
              <div className={styles.cardHeader}>
                <div>
                  <h2 className={styles.cardTitle}><Calendar className={styles.cardIcon} /> Approved Sessions</h2>
                  <p className={styles.cardDescription}>Confirmed tutoring sessions</p>
                </div>
                <div>
                  <button onClick={handleCreateNewPost} className={styles.primaryButton}>Create new Post</button>
                </div>
              </div>
              <div className={styles.cardBody}>
                {bookings?.filter((booking) => booking.Status === "Approved")
                  .map((booking) => {
                    const sessionDateTime = new Date(`${booking.SessionDate.slice(0, 10)}T${booking.StartTime}`);
                    const now = new Date();
                    const oneHour = 60 * 60 * 1000;
                    const canJoin = now >= new Date(sessionDateTime.getTime() - oneHour);
                    const readableDate = sessionDateTime.toLocaleDateString(undefined, {
                      weekday: "short",
                      month: "short",
                      day: "numeric",
                    });

                    const timeRange = `${booking.StartTime.slice(0, 5)} - ${booking.EndTime.slice(0, 5)}`;

                    return (
                      <div key={booking.BookingId} className={styles.sessionItem}>
                        <div className={styles.sessionInfo}>
                          <div className={styles.sessionHeader}>
                            <div className={styles.sessionIconBox}>
                              <Video className={styles.sessionIcon} />
                            </div>
                            <div>
                              <h3 className={styles.sessionName}>Student #{booking.StudentId}</h3>
                              <p className={styles.sessionSubject}>{booking.HelpType}</p>
                            </div>
                          </div>
                          <div className={styles.sessionMeta}>
                            <span><Clock className={styles.metaIcon} /> {timeRange} • {readableDate}</span>
                
                          </div>
                        </div>

                        <div className={styles.sessionActions}>
                          {canJoin && (
                            <button
                              className={styles.primaryButton}
                              onClick={() => { handleGoToRoom(booking.RoomURL) }}
                            >
                              <Video className={styles.buttonIcon} /> Join
                            </button>
                          )}
                          <button
                            onClick={() => { handleFinishSession(booking.BookingId) }}
                            className={styles.outlineButtonFinish}
                          >
                            Finish Session
                          </button>
                        </div>
                      </div>
                    );
                  })}


                {bookings?.filter(b => b.Status === "Approved").length === 0 && (
                  <p>No approved sessions yet.</p>
                )}
              </div>
            </div>
            <div className={styles.card}>
              <div className={styles.cardHeader}>
                <h2 className={styles.cardTitle}><Calendar className={styles.cardIcon} /> Completed Sessions</h2>
                <p className={styles.cardDescription}>All sessions you have completed</p>
              </div>
              <div className={styles.cardBody}>
                {finishedBookings?.map((booking) => {
                  const sessionDate = new Date(booking.SessionDate);
                  const readableDate = sessionDate.toLocaleDateString(undefined, {
                    weekday: "short",
                    month: "short",
                    day: "numeric",
                  });

                  const timeRange = `${booking.StartTime.slice(0, 5)} - ${booking.EndTime.slice(0, 5)}`;

                  return (
                    <div key={booking.BookingId} className={styles.sessionItem}>
                      <div className={styles.sessionInfo}>
                        <div className={styles.sessionHeader}>
                          <div className={styles.sessionIconBox}>
                            <Video className={styles.sessionIcon} />
                          </div>
                          <div>
                            <h3 className={styles.sessionName}>Student #{booking.StudentId}</h3>
                            <p className={styles.sessionSubject}>{booking.HelpType}</p>
                          </div>
                        </div>
                        <div className={styles.sessionMeta}>
                          <span><Clock className={styles.metaIcon} /> {timeRange} • {readableDate}</span>

                        </div>
                      </div>
                    </div>
                  );
                })}

                {(!finishedBookings || finishedBookings.length === 0) && !isFinishedBookingsLoading && (
                  <p>No completed sessions yet.</p>
                )}
              </div>
            </div>

          </div>

          <div className={styles.sidebar}>


            <div className={styles.card}>
              <div className={styles.cardHeader}>
                <h2 className={styles.cardTitle}>Profile Summary</h2>
              </div>
              <div className={styles.cardBody}>
                <div className={styles.profileItem}><Users className={styles.profileIcon} /> <span>{bookings?.filter((booking) => booking.Status === "Approved").length} Active Students</span></div>
                <div className={styles.profileItem}><BookOpen className={styles.profileIcon} /> <span>{finishedBookings?.length} Sessions Completed</span></div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TutorDashboard;