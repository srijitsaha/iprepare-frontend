import axios from "axios"

const challengeBaseURL = axios.create({
    baseURL: import.meta.env.VITE_SERVER_URL ? import.meta.env.VITE_SERVER_URL + "/api/v1/challenges" : "/api/v1/challenges"
})

export const getConsecutiveDailyStreaksAPI = async () => {
    const response = await challengeBaseURL.get("/get-streaks", { withCredentials: true })
    return response.data
}

const challengeModeBaseURL = axios.create({
    // baseURL: "http://localhost:4000/api/v1/challenges",
    baseURL: import.meta.env.VITE_SERVER_URL ? import.meta.env.VITE_SERVER_URL + "/api/v1/challenges" : "/api/v1/challenges"
})

export const createChallengeAPI = async (data: any) => {
    const response = await challengeModeBaseURL.post("/create-challenge", data, { withCredentials: true })
    return response.data
}


export const knowAboutChallengeAPI = async (data: any) => {
    const response = await challengeModeBaseURL.get('/know-about-challenge', { withCredentials: true, params: { ...data } })
    return response.data
}


export const getExamIdAndQuestionChallengeAPI = async (data: any) => {
    const response = await challengeModeBaseURL.get('/know-about-challenge', { withCredentials: true, params: { ...data } })
    return response.data
}


export const getExamIdByChallengeAPI = async (data: any) => {
    const response = await challengeModeBaseURL.get('/start-challenge', { withCredentials: true, params: { ...data } })
    return response.data
}

export const submitChallengedQuestionAnswerAPI = async (data: any) => {
    const response = await challengeModeBaseURL.post("/submit-question", data, { withCredentials: true })
    return response.data
}


export const viewChallengeResultAPI = async (data: any) => {
    const response = await challengeModeBaseURL.get("/view-challenge-result", { withCredentials: true, params: { ...data } })
    return response.data
}


export const getChallengeByFilteringAPI = async (data: any) => {
    const response = await challengeModeBaseURL.get("/get-challenge-by-filtering", { withCredentials: true, params: { ...data } })
    return response.data
}