const { default: axios } = require("axios");


const createBooking = async (data) => {
    try{
        const booking = await axios.post("http://localhost:5000/api/booking",data)
        return booking.data;
    }catch(error){
        console.log(error)
    }
}

const getTutorBookingsByTutorId = async (id) => {
    try{
        const bookings = await axios.get(`http://localhost:5000/api/booking/tutor/${id}`)
        return bookings.data
    }catch(error){
        console.log(error)
    }
}
const getTutorBookingsByStudentId = async (id) => {
    try{
        const bookings = await axios.get(`http://localhost:5000/api/booking/student/${id}`)
        return bookings.data
    }catch(error){
        console.log(error)
    }
}

const setBookingApproved = async (data) => {
    try{
        const response = await axios.post(`http://localhost:5000/api/booking/approve`,data)
        return response.data
    }
    catch(error){
        console.log(error)
    }
}

const getRecentBookings = async (id) => {
    try{
        const bookings = await axios.get(`http://localhost:5000/api/booking/recent/roomurl/${id}`);
        return bookings.data;
    }catch(error){
        console.log(error);
    }
}

const setBookingFinished = async (id) => {
    try {
        const response = await axios.put(`http://localhost:5000/api/booking/finish/${id}`);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

const getAllFinishedBookings = async (id) => {
    try{
        const response = await axios.get(`http://localhost:5000/api/booking/finished/${id}`);
        return response.data;
    }catch(error){
        console.log(error);
    }
}

module.exports = {
    createBooking,
    getTutorBookingsByTutorId,
    setBookingApproved,
    getTutorBookingsByStudentId,
    getRecentBookings,
    setBookingFinished,
    getAllFinishedBookings

}