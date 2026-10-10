import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Field, FieldLabel } from '@/components/ui/field'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import React, { useEffect, useState, type SyntheticEvent } from 'react'
import { Button } from '@/components/ui/button'
import { startExamAPI } from '@/API/question.API'
import { toast } from 'sonner'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { programmingLanguagesData, programmingLanguagesTopic, numberOfQuestionsArray } from '@/data/ProgrammingLanguages'

export const CodingArena: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const [programmingLanguages, setProgrammingLanguages] = useState<string>("")
  const [subject, setSubject] = useState<string>("")
  const [topic, setTopic] = useState<string>("")
  const [numberOfQuestions, setNumberOfQuestions] = useState<string>("50")
  const exams: string[] = ["HTML", "CSS", "JavaScript", "Python", "Kotlin", "Java", "C", "C++"]
  const navigate = useNavigate()




  const handleExamChooserFormSubmit = async (e: SyntheticEvent) => {
    e.preventDefault()
    try {
      const data = await startExamAPI({ board: programmingLanguages, subject, topic, totalQuestions: numberOfQuestions })
      navigate(`/startExam/${data.examId}`)
    } catch (error: any) {
      toast.error(error.response.data.message)
    }
  }

  useEffect(() => {
    const language = searchParams.get("programmingLanguage") ?? "";

    if (exams.includes(language)) {
      setProgrammingLanguages(language);
    }
  }, [searchParams, programmingLanguages]);


  useEffect(() => {
    setSubject("")
    setTopic("")
  }, [programmingLanguages]);


  



  return (
    <>
      <div className="flex min-h-screen w-full items-center justify-center p-6 md:p-10 ">
        <div className="w-full max-w-sm">
          <Card>
            <CardHeader>
              <CardTitle> Choose Programming Language </CardTitle>
            </CardHeader>
            <CardContent className='flex flex-col gap-4 p-4'>
              <form className='h-full w-full flex flex-col gap-4' onSubmit={handleExamChooserFormSubmit}>


                <Field>
                  <FieldLabel htmlFor="exam-type"> Programming Language </FieldLabel>
                  <Select value={programmingLanguages} onValueChange={(value) => {
                      setSearchParams({ programmingLanguage: value });
                    }}>
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


                {programmingLanguages &&
                  <Field>
                    <FieldLabel htmlFor="exam-subject"> Subject </FieldLabel>
                    <Select value={subject} onValueChange={setSubject}>
                      <SelectTrigger id="exam-subject">
                        <SelectValue placeholder="Choose Subject" />
                      </SelectTrigger>
                      <SelectContent>
                        {programmingLanguagesData[programmingLanguages].map((item: string) => (
                          <SelectItem key={item} value={item}>
                            {item}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </Field>
                }


                {programmingLanguages && subject &&
                  <Field>
                    <FieldLabel htmlFor="exam-topic"> Topic </FieldLabel>
                    <Select value={topic} onValueChange={setTopic}>
                      <SelectTrigger id="exam-topic">
                        <SelectValue placeholder="Choose Topic" />
                      </SelectTrigger>
                      <SelectContent>
                        {programmingLanguagesTopic[programmingLanguages][subject] && programmingLanguagesTopic[programmingLanguages][subject].map((item: string) => (
                          <SelectItem key={item} value={item}>
                            {item}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </Field>
                }


                {programmingLanguages && subject && topic && 
                  <Field>
                    <FieldLabel htmlFor="number-of-questions"> Number of Questions </FieldLabel>
                    <Select value={numberOfQuestions} onValueChange={setNumberOfQuestions}>
                      <SelectTrigger id="number-of-questions">
                        <SelectValue placeholder="Choose Number of Questions" />
                      </SelectTrigger>
                      <SelectContent>
                        {programmingLanguagesTopic[programmingLanguages][subject] && numberOfQuestionsArray.map((item: string) => (
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