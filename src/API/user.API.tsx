import axios from "axios"

const userBaseURL = axios.create({
    baseURL: import.meta.env.VITE_SERVER_URL ? import.meta.env.VITE_SERVER_URL + "/api/v1/user" : "/api/v1/user"
})

export const registerUserAPI = async (data: any) => {
    const response = await userBaseURL.post("/sign-up", data, { withCredentials: true })
    return response.data
}


export const sendOTPToUserForRegisterAPI = async (data: any) => {
    const response = await userBaseURL.post("/send-otp-to-user-for-register", data, { withCredentials: true })
    return response.data
}


export const resendOTPToUserForRegisterAPI = async (data: any) => {
    const response = await userBaseURL.post("/resend-otp-to-user-for-register", data, { withCredentials: true })
    return response.data
}


export const signinUserAPI = async (data: any) => {
    const response = await userBaseURL.post("/sign-in", data, { withCredentials: true })
    return response.data
}


export const getMistakenQuestionsAPI = async (data: any) => {
    const response = await userBaseURL.get("/mistaken-questions", { withCredentials: true, params: { ...data } })
    return response.data
}


export const toggleQuestionBookmarkAPI = async (data: any) => {
    const response = await userBaseURL.post("/toggle-question-bookmark", data, { withCredentials: true })
    return response.data
}


export const showBookmarkedQuestionAPI = async () => {
    const response = await userBaseURL.get("/show-bookmarked-questions", { withCredentials: true })
    return response.data
}


export const getUserInfoAPI = async () => {
    const response = await userBaseURL.get('/get-user-info', { withCredentials: true })
    return response.data
}


export const getUserSettingsAPI = async () => {
    const response = await userBaseURL.get('/get-user-settings', { withCredentials: true })
    return response.data
}


export const modifyUserSettingsAPI = async (data: any) => {
    const response = await userBaseURL.post('/modify-user-settings', data, { withCredentials: true })
    return response.data
}

export const getUserEmailAPI = async () => {
    const response = await userBaseURL.get('/get-user-email', { withCredentials: true })
    return response.data
}


export const changeUserPasswordAPI = async (data: any) => {
    const response = await userBaseURL.patch('/change-user-password', data, { withCredentials: true })
    return response.data
}



// Forgot password APIs
export const sendOTPToUserForForgotPasswordAPI = async (data: any) => {
    const response = await userBaseURL.post('/send-otp-to-user-for-forgot-password', data, { withCredentials: true })
    return response.data
}


export const resendOTPToUserForForgotPasswordAPI = async (data: any) => {
    const response = await userBaseURL.post('/resend-otp-to-user-for-forgot-password', data, { withCredentials: true })
    return response.data
}


export const verifyOTPToUserForForgotPasswordAPI = async (data: any) => {
    const response = await userBaseURL.post('/verify-otp-to-user-for-forgot-password', data, { withCredentials: true })
    return response.data
}


export const setNewPasswordForForgotPasswordAPI = async (data: any) => {
    const response = await userBaseURL.patch('/set-new-password-for-forgot-password', data, { withCredentials: true })
    return response.data
}


// Sign Out user API
export const signOutUserAPI = async () => {
    const response = await userBaseURL.post('/sign-out', {}, { withCredentials: true })
    return response.data
}