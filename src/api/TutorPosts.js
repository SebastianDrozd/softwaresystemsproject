const { default: axios } = require("axios")


const createTutorPost = async (post) => {
    console.log("posthit")
    try{
        const response = axios.post("http://localhost:5000/api/tutorposts",{post})
    }catch(error){

    }
}

module.exports = {
    createTutorPost
}