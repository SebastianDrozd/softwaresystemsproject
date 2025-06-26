"use client"
import { AuthContext } from "@/util/AuthProvider"
import { useContext } from "react"

const StudentPage = () => {
const {user} = useContext(AuthContext)
    return (
        <h1>Welcome, {user && user.firstname}. You are a {user && user.role}</h1>
    )
}

export default StudentPage