import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Field, FieldLabel } from '@/components/ui/field'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import React, { useState, type SyntheticEvent } from 'react'
import { examsData, examsTopic, numberOfQuestionsArray } from "../../data/ExamsData"
import { Button } from '@/components/ui/button'
import { startExamAPI } from '@/API/question.API'
import { toast } from 'sonner'
import { useNavigate } from 'react-router-dom'

export const ExamChooser: React.FC = () => {
  const [exam, setExam] = useState<string>("")
  const [subject, setSubject] = useState<string>("")
  const [topic, setTopic] = useState<string>("")
  const [numberOfQuestions, setNumberOfQuestions] = useState<string>("50")
  const exams: string[] = ["WBCHSE Class 11", "WBCHSE Class 12", "JEE Mains", "JEE Advanced", "NEET"]
  const navigate = useNavigate()




  const handleExamChooserFormSubmit = async (e: SyntheticEvent) => {
    e.preventDefault()
    try {
      const data = await startExamAPI({ board: exam, subject, topic, totalQuestions: numberOfQuestions })
      navigate(`/startExam/${data.examId}`)
    } catch (error: any) {
      toast.error(error.response.data.message)
    }
  }




  return (
    <>
      <div className="flex min-h-screen w-full items-center justify-center p-6 md:p-10 ">
        <div className="w-full max-w-sm">
          <Card>
            <CardHeader>
              <CardTitle> Choose Exam </CardTitle>
            </CardHeader>
            <CardContent className='flex flex-col gap-4 p-4'>
              <form className='h-full w-full flex flex-col gap-4' onSubmit={handleExamChooserFormSubmit}>


                <Field>
                  <FieldLabel htmlFor="exam-type"> Exam </FieldLabel>
                  <Select value={exam} onValueChange={setExam} >
                    <SelectTrigger id="exam-type">
                      <SelectValue placeholder="Choose Exam" />
                    </SelectTrigger>
                    <SelectContent>
                      {exams.map((item) => (
                        <SelectItem key={item} value={item}>
                          {item}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </Field>


                {exam &&
                  <Field>
                    <FieldLabel htmlFor="exam-subject"> Subject </FieldLabel>
                    <Select value={subject} onValueChange={setSubject}>
                      <SelectTrigger id="exam-subject">
                        <SelectValue placeholder="Choose Subject" />
                      </SelectTrigger>
                      <SelectContent>
                        {examsData[exam].map((item: string) => (
                          <SelectItem key={item} value={item}>
                            {item}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </Field>
                }


                {exam && subject &&
                  <Field>
                    <FieldLabel htmlFor="exam-topic"> Topic </FieldLabel>
                    <Select value={topic} onValueChange={setTopic}>
                      <SelectTrigger id="exam-topic">
                        <SelectValue placeholder="Choose Topic" />
                      </SelectTrigger>
                      <SelectContent>
                        {examsTopic[exam][subject] && examsTopic[exam][subject].map((item: string) => (
                          <SelectItem key={item} value={item}>
                            {item}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </Field>
                }


                {exam && subject && topic && 
                  <Field>
                    <FieldLabel htmlFor="number-of-questions"> Number of Questions </FieldLabel>
                    <Select value={numberOfQuestions} onValueChange={setNumberOfQuestions}>
                      <SelectTrigger id="number-of-questions">
                        <SelectValue placeholder="Choose Number of Questions" />
                      </SelectTrigger>
                      <SelectContent>
                        {examsTopic[exam][subject] && numberOfQuestionsArray.map((item: string) => (
                          <SelectItem key={item} value={item}>
                            {item}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </Field>
                }


                <Button> Start Quiz </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  )
}