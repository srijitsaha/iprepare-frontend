import axios from "axios"

const examBaseURL = axios.create({
    // baseURL: "http://localhost:4000/api/v1/exam", 
    baseURL: import.meta.env.VITE_SERVER_URL ? import.meta.env.VITE_SERVER_URL + "/api/v1/exam" : "/api/v1/exam", 
})

export const getDailyStreaksAPI = async () => {
    const response = await examBaseURL.get("/daily-streaks", { withCredentials: true })
    return response.data
}


export const getTopicWiseReportsAPI = async () => {
    const response = await examBaseURL.get("/topic-wise-report", { withCredentials: true })
    return response.data
}


export const getExamsUsingFilterAPI = async (data: any) => {
    const response = await examBaseURL.get("/get-exams-by-filtering", { withCredentials: true, params: { ...data } })
    return response.data
}