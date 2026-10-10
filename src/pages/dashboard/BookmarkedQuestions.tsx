import { showBookmarkedQuestionAPI, toggleQuestionBookmarkAPI } from '@/API/user.API'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Field, FieldContent, FieldLabel, FieldTitle } from '@/components/ui/field'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Toaster } from '@/components/ui/sonner'
import { Bookmark } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { toast } from 'sonner'

export const BookmarkedQuestions: React.FC = () => {
  const [bookmarkedQuestions, setBookmarkedQuestions] = useState<any>([])

  const handleFetchBookmarkedQuestions = async () => {
    try {
      const data = await showBookmarkedQuestionAPI()
      const newBookmarkedQuestionsArray = data.questions.map((curElem: any) => {
        return { ...curElem, bookmarked: true }
      })

      setBookmarkedQuestions(newBookmarkedQuestionsArray)
    } catch (error) {
      console.log(error)
    }
  }

  const handleToggleBookmark = async (index: number) => {
    try {
      const response = await toggleQuestionBookmarkAPI({ questionId: bookmarkedQuestions[index]._id })
      setBookmarkedQuestions((previousQuestions: any) => {
        let newQuestions = [...previousQuestions]
        newQuestions[index] = { ...newQuestions[index], bookmarked: response.addedToBookmark }
        return newQuestions
      })

      console.log(response)
      toast.success(response.message, {
          position: 'top-right'
        })
    } catch (error) {
      console.log(error)
    }
  }

  const handleShowAnswer = (indexes: number) => {
    setBookmarkedQuestions((prevBookmarkedQuestions: any) => {
      let newBookmarkedQuestionsArray = [...prevBookmarkedQuestions]
      newBookmarkedQuestionsArray[indexes] = { ...newBookmarkedQuestionsArray[indexes], showAnswer: newBookmarkedQuestionsArray[indexes]?.showAnswer ? false: true }
      return newBookmarkedQuestionsArray
    })
  }

  useEffect(() => {
    handleFetchBookmarkedQuestions()
  }, [])

  return (
    <>
      <Toaster />
      <main className='h-screen w-full flex flex-col p-4'>
        <section className='h-fit w-full flex'>
          <h1 className='text-2xl font-bold'> Your Bookmarks </h1>
        </section>
        <section className='h-fit w-full my-8 flex flex-col rounded-xl border-0 gap-3'>
          {bookmarkedQuestions.length > 0 && bookmarkedQuestions.map((curElem: any, indexes: number) => {
            return (
              <Card className='px-3 relative' key={curElem._id}>
                <h4 className="text-left text-2xl font-semibold tracking-tight"> {indexes + 1}. {curElem.question} </h4>
                <Bookmark color='#ffff00' fill={curElem.bookmarked ? '#ffff00' : 'none'} className='absolute top-3 right-3' onClick={() => handleToggleBookmark(indexes)} />

                <RadioGroup className="w-full p-2" disabled={true} value={curElem.showAnswer && curElem.answer}>

                  <FieldLabel htmlFor={curElem.options[0]} className={`${ (curElem.options[0] == curElem.answer && curElem.showAnswer) && 'text-green-500 border-green-500'}`}>
                    <Field orientation="horizontal">
                      <FieldContent>
                        <FieldTitle> {curElem.options[0]} </FieldTitle>
                      </FieldContent>
                      <RadioGroupItem value={curElem.options[0]} id={curElem.options[0]} />
                    </Field>
                  </FieldLabel>

                  <FieldLabel htmlFor={curElem.options[1]} className={`${ (curElem.options[1] == curElem.answer && curElem.showAnswer) && 'text-green-500 border-green-500'}`}>
                    <Field orientation="horizontal">
                      <FieldContent>
                        <FieldTitle> {curElem.options[1]} </FieldTitle>
                      </FieldContent>
                      <RadioGroupItem value={curElem.options[1]} id={curElem.options[1]} />
                    </Field>
                  </FieldLabel>

                  <FieldLabel htmlFor={curElem.options[2]} className={`${ (curElem.options[2] == curElem.answer && curElem.showAnswer) && 'text-green-500 border-green-500'}`}>
                    <Field orientation="horizontal">
                      <FieldContent>
                        <FieldTitle>{curElem.options[2]}</FieldTitle>
                      </FieldContent>
                      <RadioGroupItem value={curElem.options[2]} id={curElem.options[2]} />
                    </Field>
                  </FieldLabel>

                  <FieldLabel htmlFor={curElem.options[3]} className={`${ (curElem.options[3] == curElem.answer && curElem.showAnswer) && 'text-green-500 border-green-500'}`}>
                    <Field orientation="horizontal">
                      <FieldContent>
                        <FieldTitle>{curElem.options[3]}</FieldTitle>
                      </FieldContent>
                      <RadioGroupItem value={curElem.options[3]} id={curElem.options[3]} />
                    </Field>
                  </FieldLabel>

                </RadioGroup>

                {curElem.showAnswer && <p> Explanation: {curElem.explaination} </p>}

                <p className='p-2 flex w-full items-center gap-x-2'>
                  <Badge> {curElem.board} </Badge>
                  <Badge variant='secondary'> {curElem.subject} </Badge>
                  <Badge variant='outline'> {curElem.topic} </Badge>
                  <Button onClick={() => handleShowAnswer(indexes)}> {curElem.showAnswer ? "Hide": "Show"} answer </Button>
                </p>
              </Card>
            )
          })}
        </section>
      </main>
    </>
  )
}