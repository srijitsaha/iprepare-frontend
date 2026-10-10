import { ChartAreaInteractive } from '@/components/chart-area-interactive'
import { DataTable } from '@/components/data-table'
import data from "../../data/ShadCNMockDataForDashboard1.json"
import React, { useEffect, useState } from 'react'
import { StreaksCard } from '@/components/Dashboard/Streaks/StreaksCard'
import { getDailyStreaksAPI } from '@/API/exam.API'
import { checkDateCategory } from '@/utilities/CheckDateCategory'

export const UserAnalytics: React.FC = () => {
    const [dailyStreaks, setDailyStreaks] = useState<any | null>(null)
    
        useEffect(() => {
            (async function () {
                let data = await getDailyStreaksAPI()
                let newData = data.map((curElem : any) => {
                    curElem.date = checkDateCategory(curElem.date) 
                    return { ...curElem }
                })
                // console.log(((newData[newData.length - 1].totalScore - newData[newData.length - 2].totalScore) / newData[newData.length - 1].totalScore) * 100)
                // console.log(((newData[newData.length - 1].totalNumberOfQuestions - newData[newData.length - 2].totalNumberOfQuestions) / newData[newData.length - 1].totalNumberOfQuestions) * 100)
                setDailyStreaks(newData)
            })()
            
        }, [])
    


    return (
        <div className="flex flex-1 flex-col">
            <div className="@container/main flex flex-1 flex-col gap-2">
                <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
                    <StreaksCard data={dailyStreaks} />
                    <div className="px-4 lg:px-6">
                        <ChartAreaInteractive data={null} />
                    </div>
                    <DataTable data={data} />
                </div>
            </div>
        </div>
    )
}