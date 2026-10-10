import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { PageLayout } from './layouts/PageLayout'
import { Home } from './pages/Home'
import { Signin } from './pages/Signin'
import { Signup } from './pages/Signup'
import { ExamChooser } from './pages/exams/ExamChooser'
import { MainExamPage } from './pages/exams/MainExamPage'
import { CodingArena } from './pages/exams/CodingArena'
import { QuizResultView } from './pages/exams/QuizResult'
import { ReviewQuestions } from './pages/exams/ReviewQuestions'
import { DashboardLayouts } from './layouts/DashboardLayouts/DashboardLayouts'
import { UserAnalytics } from './pages/dashboard/UserAnalytics'
import { UserDashboard } from './pages/dashboard/UserDashboard'
import { MistakesNotebook } from './pages/dashboard/MistakesNotebook'
import { ConductedExams } from './pages/dashboard/ConductedExams'
import { BookmarkedQuestions } from './pages/dashboard/BookmarkedQuestions'
import { Settings } from './pages/settings/Settings'
import { IntroductionToChallengeMode } from './pages/challengemode/IntroductionToChallengeMode'
import { InviteFriend } from './pages/challengemode/InviteFriend'
import { MainChallengePage } from './pages/challengemode/MainChallengePage'
import { ChallengeResultView } from './pages/challengemode/ChallengeResult'
import { Challenges } from './pages/dashboard/Challenges'
import { VerifyOTPForRegister } from './pages/verifyOTP/VerifyOTPForRegister'
import { ForgotPassword } from './pages/verifyOTP/ForgotPassword'

export function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <PageLayout />,
      children: [
        { path: "", element: <Home /> },
        { path: "/sign-in", element: <Signin /> },
        { path: "/sign-up", element: <Signup /> },
        { path: "/forgot-password", element: <ForgotPassword /> },
        { path: "/verify-otp-for-register", element: <VerifyOTPForRegister /> },
        { path: "/examChooser", element: <ExamChooser /> }, 
        { path: "/codingArena", element: <CodingArena /> }, 
        { path: "/startExam/:examId", element: <MainExamPage /> }, 
        { path: "/completeExam", element: <QuizResultView /> }, 
        { path: "/exams/reviewQuestions/:examId", element: <ReviewQuestions /> }, 

        { path: "/challenge-mode", element: <IntroductionToChallengeMode /> }, 
        { path: "/challenge-mode/invite-friend/:challengeId", element: <InviteFriend /> }, 
        { path: "/challenge-mode/start-challenge/:challengeId", element: <MainChallengePage /> }, 
        { path: "/challenge-mode/challenge-result/:challengeId", element: <ChallengeResultView /> }, 
      ]
    },
    {
      path: "/dashboard", element: <DashboardLayouts />,
      children: [
        { path: "", element: <UserDashboard /> },
        { path: "analytics", element: <UserAnalytics />, errorElement: <h1>Some Error Occured</h1>  },
        { path: "mistakes-notebook", element: <MistakesNotebook /> },
        { path: "all-exams", element: <ConductedExams /> },
        { path: "bookmarked-questions", element: <BookmarkedQuestions /> },
        { path: "challenges", element: <Challenges /> },
        { path: "settings", element: <Settings /> },
      ]
    }
  ])


  return <RouterProvider router={router} />
}

export default App
