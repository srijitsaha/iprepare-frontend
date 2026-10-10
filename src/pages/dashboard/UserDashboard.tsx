import { getConsecutiveDailyStreaksAPI } from "@/API/challenge.API"
import { StreakStepper } from "@/components/Dashboard/StreakStepper"
import { useEffect, useState } from "react"


export const UserDashboard = () => {
  const [daysCount, setDaysCount] = useState([])

  const handleGetStreaks = async () => {
    try {
      const data = await getConsecutiveDailyStreaksAPI()
      setDaysCount(data)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    handleGetStreaks()
  }, [])



  return (
    <>
      <main className='min-h-9/12 h-screen w-full px-4 lg:px-6 dark:*:data-[slot=card]:bg-card py-4 md:py-6'>
        <h1 className='text-2xl font-bold'> Your Streaks  </h1>
        <p className="font-sans my-2"> You have to complete at least one exam or at least one challenge every day for seven days consecutively </p>
        <StreakStepper streaks={daysCount} />
      </main>
    </>
  )
}