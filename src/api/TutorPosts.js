const { default: axios } = require("axios")


const getTutorPosts = async () => {
    try{
        const response = await axios.get("http://localhost:5000/api/tutorposts");
        return response.data
    }catch(error){
        throw error
    }
}

const createTutorPost = async (post) => {
    console.log("posthit")
    try{
        const response = await axios.post("http://localhost:5000/api/tutorposts",{post})
        return response.data
    }catch(error){
     throw error
    }
}

module.exports = {
    createTutorPost,
    getTutorPosts
}