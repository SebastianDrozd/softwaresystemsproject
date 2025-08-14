const { default: axios } = require("axios");


const createReview = async (data) => {
    try {
        const response = await axios.post("http://localhost:5000/api/reviews", data);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

const getReviewsByTutorId = async (tutorId) => {
    try {
        const response = await axios.get(`http://localhost:5000/api/reviews/tutor/${tutorId}`);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

module.exports = {

createReview,
getReviewsByTutorId
}