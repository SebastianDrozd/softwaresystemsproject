const { default: axios } = require("axios")


const getTutorPosts = async () => {
    try{
        const response = await axios.get("http://localhost:5000/api/tutorposts");
        return response.data
    }catch(error){
        console.log("Error fetching tutor posts:", error)
        throw error
    }
}

const getTutorPostById = async (id) => {
    console.log("this is id",id)
       try{
        const response = await axios.get(`http://localhost:5000/api/tutorposts/${id}`);
        console.log("this is responsedata",response.data)
        if(response.data.length > 0 ){
            console.log("this is single",response.data[0])
            return response.data[0]
        }
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
    getTutorPosts,
    getTutorPostById
}