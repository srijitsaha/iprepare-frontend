import axios from "axios"

const questionBaseURL = axios.create({
    // baseURL: "http://localhost:4000/api/v1/question",
    baseURL: import.meta.env.VITE_SERVER_URL ? import.meta.env.VITE_SERVER_URL + "/api/v1/question" : "/api/v1/question"
})

export const getQuestionsAPI = async (data: any) => {
    const response = await questionBaseURL.post("/get-questions", data, { withCredentials: true })
    return response.data
}

export const submitAnswerAPI = async (data: any) => {
    const response = await questionBaseURL.post("/submit-question", data, { withCredentials: true })
    return response.data
}


export const startExamAPI = async (data: any) => {
    const response = await questionBaseURL.get("/start-exam", { withCredentials: true, params: { ...data } })
    return response.data
}


export const completeExamAPI = async (data: any) => {
    const response = await questionBaseURL.post("/complete-exam", data, { withCredentials: true })
    return response.data
}


export const viewExamResultAPI = async (data: any) => {
    const response = await questionBaseURL.get(`/view-exam-result/${data.examId}`, { withCredentials: true })
    return response.data
}


export const checkExamCompletedAPI = async (data: any) => {
    const response = await questionBaseURL.get(`/check-exam-completed/${data.examId}`, { withCredentials: true })
    return response.data
}

export const reviewExamAnswersAPI = async (data: any) => {
    const response = await questionBaseURL.get(`/review-exam-answers/${data.examId}`, { withCredentials: true })
    return response.data
}