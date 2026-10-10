import { createChallengeAPI } from '@/API/challenge.API'
import { Button } from '@/components/ui/button'
import { Field, FieldLabel } from '@/components/ui/field'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { programmingLanguagesData, programmingLanguagesTopic, numberOfQuestionsArray } from '@/data/ProgrammingLanguages'
import React, { useEffect, useState, type SyntheticEvent } from 'react'
import { useNavigate } from 'react-router-dom'



export const IntroductionToChallengeMode: React.FC = () => {
  const navigate = useNavigate()

  const [programmingLanguages, setProgrammingLanguages] = useState<string>("")
  const [subject, setSubject] = useState<string>("")
  const [topic, setTopic] = useState<string>("")
  const [numberOfQuestions, setNumberOfQuestions] = useState<string>("5")
  const exams: string[] = ["HTML", "CSS", "JavaScript", "Python", "Kotlin", "Java", "C", "C++"]


  const handleCreateChallenge = async (e: SyntheticEvent) => {
    e;
    try {
      const data = await createChallengeAPI({ board: programmingLanguages, subject, topic, totalQuestions: numberOfQuestions })
      if(data.challengeId) {
        navigate(`/challenge-mode/invite-friend/${data.challengeId}`)
      }
    } catch (error: any) {
      console.log(error.response)
    }
  }





  useEffect(() => {
    setSubject("")
    setTopic("")
  }, [programmingLanguages])
 

  return (
    <>
      <main className='m-auto px-4 py-4 min-h-96 h-full max-w-[1280px]'>
        <h1 className='text-3xl font-semibold my-3 text-center'> Introducing  </h1>
        <h1 className='text-4xl tracking-tight font-mono text-center'> Challenge Mode </h1>

        <p className='italic font-mono font-semibold text-2xl tracking-wider text-center mt-8 mb-3'> "Iron Sharpens Iron, One friend sharpens another." </p>
        <p className='text-center font-light' > Prepare Together, Succeed Together </p>

        <h3 className='my-2.5'> Select about your quiz from below -  </h3>

        <section className='border-2 border-white rounded-xl min-h-32 w-full flex flex-wrap gap-5 p-2 md:p-4 lg:p-6 items-center'>

          <Field className='w-fit flex'>
            <FieldLabel htmlFor="exam-type"> Programming Language </FieldLabel>
            <Select value={programmingLanguages} onValueChange={(value) => {
              setProgrammingLanguages(value);
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
            <Field className='w-fit flex'>
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
            <Field className='w-fit flex'>
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
            <Field className='w-fit flex'>
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

          {programmingLanguages && subject && topic && numberOfQuestions && <Button variant="default" onClick={handleCreateChallenge}> Create Challenge </Button> }


        </section>
      </main>
    </>
  )
}