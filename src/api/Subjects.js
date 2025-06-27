const { default: axios } = require("axios");


const getAllSubjects = async () => {
    try{
        const subjects = await axios.get("http://localhost:5000/api/subjects")
        return subjects.data;
    }catch(error){
        console.log(error)
    }
}

module.exports = {
    getAllSubjects
}