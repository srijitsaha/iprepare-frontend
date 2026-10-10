import { getExamsUsingFilterAPI } from '@/API/exam.API'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { addDays } from 'date-fns'
import React, { useEffect, useState } from 'react'
import type { DateRange } from 'react-day-picker'
import { Link } from 'react-router-dom'

export const ConductedExams: React.FC = () => {
  const [dateRange, setDateRange] = useState<DateRange | any>({
    from: addDays(new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate()), -30),
    to: new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate()),
  })

  const [examData, setExamData] = useState([])

  const handleSearch = async () => {
    try {
      const data = await getExamsUsingFilterAPI({ startDate: dateRange.from, endDate: dateRange.to });
      setExamData(data.examDetails);
    } catch (error: any) {
      console.log(error.response);
    }
  }

  useEffect(() => {
    handleSearch()
  }, [])


  return (
    <main className='p-3 min-h-screen w-full flex flex-col gap-4'>
      <Calendar mode="range" defaultMonth={dateRange?.from} selected={dateRange} onSelect={setDateRange} numberOfMonths={2}  className="rounded-lg border h-fit"  />
      <Button variant='default' onClick={handleSearch}> Search </Button>
      <p> Note: Challenges will also be treated as exams. </p>
      <section className='min-h-fit flex flex-wrap justify-around gap-y-4'>

        {
          examData && examData.map((curElem: any, index: number) => {
            return (
              <Card className='w-sm h-fit' key={index}>
                <CardHeader>
                  <CardTitle> {curElem.board} </CardTitle>
                  <CardDescription> {curElem.subject} </CardDescription>
                  <CardAction> 
                    <Badge variant="secondary" className="px-4 py-4 text-sm tracking-wide">
                      {curElem.isCompleted == true && `Score : ${(Math.round(Number(curElem.score) / Number(curElem.totalQuestions) * 100))}%`}
                      {curElem.isCompleted == false && <><span className="flex h-2 w-2 rounded-full bg-green-500 animate-pulse mr-2"></span> In Progress </>}
                    </Badge>
                  </CardAction>
                </CardHeader>
                <CardContent>
                  <p> {curElem.topic} </p>
                </CardContent>
                <CardFooter>
                  {curElem?.isCompleted === true && <Link to={`/exams/reviewQuestions/${curElem._id}`} className='w-fit h-fit flex gap-2 justify-center'> Review Questions <span className="material-symbols-outlined text-[18px]">arrow_forward</span> </Link>}
                  {curElem?.isCompleted === false && <Link to={`/startExam/${curElem._id}`} className='w-fit h-fit flex gap-2 justify-center'> Complete Exam <span className="material-symbols-outlined text-[18px]">arrow_forward</span> </Link>}
                </CardFooter>
              </Card>
            )
          })
        }

        {examData.length == 0 && <p> No exam was conducted during this date range. </p>}


      </section>
    </main>
  )
}