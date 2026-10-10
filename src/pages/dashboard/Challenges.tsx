import { getChallengeByFilteringAPI } from '@/API/challenge.API'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Combobox, ComboboxContent, ComboboxEmpty, ComboboxInput, ComboboxItem, ComboboxList } from '@/components/ui/combobox'
import { Field } from '@/components/ui/field'
import { Label } from '@/components/ui/label'
import { timeOptionsFor12Hours, weekDays } from '@/data/constants'
import React, { useEffect, useState } from 'react'
import { NavLink, useSearchParams } from 'react-router-dom'

export const Challenges: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams({})


  const [host, setHost] = useState<string | null>(null)

  const [boardList, setBoardList] = useState<string[]>([])
  const [subjectList, setSubjectList] = useState<string[]>([])
  const [topicList, setTopicList] = useState<string[]>([])

  const [sortBy, setSortBy] = useState<string | null>(null)
  const [sortType, setSortType] = useState<string | null>("Ascending")

  const [board, setBoard] = useState<string | null>(null)
  const [subject, setSubject] = useState<string | null>(null)
  const [topic, setTopic] = useState<string | null>(null)

  const [challenges, setChallenges] = useState<any>(null)


  useEffect(() => {
    (async function () {
      const filters = Object.fromEntries(searchParams.entries())
      const response = await getChallengeByFilteringAPI(filters)

      if (response.boardList) { setBoardList(response.boardList) }
      if (response.subjectList) { setSubjectList(response.subjectList) }
      if (response.topicList) { setTopicList(response.topicList) }
      if (response.matchedChallenges) { setChallenges(response.matchedChallenges) }

    })()
  }, [searchParams])


  const handleSetBoard = (value: string | null) => {
    setBoard(value)
    setSearchParams((prevSearchParams) => {
      const newSearchParams = new URLSearchParams(prevSearchParams)

      if (value) {
        newSearchParams.set('board', value)
      } else {
        newSearchParams.delete('board')
      }

      return newSearchParams
    })
  }


  const handleSetSubject = (value: string | null) => {
    setSubject(value)
    setSearchParams((prevSearchParams) => {
      const newSearchParams = new URLSearchParams(prevSearchParams)

      if (value) {
        newSearchParams.set('subject', value)
      } else {
        newSearchParams.delete('subject')
      }

      return newSearchParams
    })
  }


  const handleSetTopic = (value: string | null) => {
    setTopic(value)
    setSearchParams((prevSearchParams) => {
      const newSearchParams = new URLSearchParams(prevSearchParams)

      if (value) {
        newSearchParams.set('topic', value)
      } else {
        newSearchParams.delete('topic')
      }

      return newSearchParams
    })
  }



  const handleSetHost = (value: string | null) => {
    if (value == "You" || value == "Friend") setHost(value)
    if (value == "Any") setHost(null)

    setSearchParams((prevSearchParams) => {
      const newSearchParams = new URLSearchParams(prevSearchParams)

      if (value == "You" || value == "Friend") newSearchParams.set('host', value)
      if (value == "Any") newSearchParams.delete('host')
      return newSearchParams
    })

  }

  const handleSetSortBy = (value: string | null) => {
    if (value == "Started At" || value == "Total Questions") setSortBy(value)
    if (value == "Clear Sort") setSortBy(null)

    setSearchParams((prevSearchParams) => {
      const newSearchParams = new URLSearchParams(prevSearchParams)

      if (value == "Started At" || value == "Total Questions") newSearchParams.set('sortBy', value)
      if (value == "Clear Sort") newSearchParams.delete('sortBy')
      return newSearchParams
    })
  }


  const handleSetSortType = (value: string | null) => {
    if (value == "Ascending" || value == "Descending") setSortType(value)
    if (value == "Clear Sort") setSortType(null)

    setSearchParams((prevSearchParams) => {
      const newSearchParams = new URLSearchParams(prevSearchParams)

      if (value == "Ascending" || value == "Descending") newSearchParams.set('sortType', value)
      if (value == "Clear Sort") newSearchParams.delete('sortType')
      return newSearchParams
    })
  }


  // const handleSetWinner = (value: string | null) => {
  //   if (value == "You" || value == "Friend" || value == "Tie") setWinner(value)
  //   if (value == "Any") setWinner(null)

  //   setSearchParams((prevSearchParams) => {
  //     const newSearchParams = new URLSearchParams(prevSearchParams)

  //     if (value == "You" || value == "Friend" || value == "Tied") newSearchParams.set('winner', value)
  //     if (value == "Any") newSearchParams.delete('winner')
  //     return newSearchParams
  //   })
  // }




  return (
    <main className='h-screen w-full flex flex-col p-4'>
      <section className="max-w-full h-max flex justify-between items-center gap-1">


        <Field className='w-80'>
          <Label htmlFor='host'> Host </Label>
          <Combobox items={["You", "Friend", "Any"]} onValueChange={handleSetHost} value={host} >
            <ComboboxInput placeholder="Host" />
            <ComboboxContent>
              <ComboboxEmpty>Select Host</ComboboxEmpty>
              <ComboboxList>
                {(item) => (<ComboboxItem key={item} value={item}> {item} </ComboboxItem>)}
              </ComboboxList>
            </ComboboxContent>
          </Combobox>
        </Field>


        <Field>
          <Label htmlFor='board'> Board </Label>
          <Combobox items={boardList} onValueChange={handleSetBoard} value={board}>
            <ComboboxInput placeholder="Board" />
            <ComboboxContent>
              <ComboboxEmpty> Select Board</ComboboxEmpty>
              <ComboboxList>
                {(item) => (<ComboboxItem key={item} value={item}> {item} </ComboboxItem>)}
              </ComboboxList>
            </ComboboxContent>
          </Combobox>
        </Field>


        <Field>
          <Label htmlFor='subject'> Subject </Label>
          <Combobox items={subjectList} onValueChange={handleSetSubject} value={subject}>
            <ComboboxInput placeholder="Subject" />
            <ComboboxContent>
              <ComboboxEmpty> Select Subject </ComboboxEmpty>
              <ComboboxList>
                {(item) => (<ComboboxItem key={item} value={item}> {item} </ComboboxItem>)}
              </ComboboxList>
            </ComboboxContent>
          </Combobox>
        </Field>


        <Field>
          <Label htmlFor='topic'> Topic </Label>
          <Combobox items={topicList} onValueChange={handleSetTopic} value={topic}>
            <ComboboxInput placeholder="Topic" />
            <ComboboxContent>
              <ComboboxEmpty> Select Topic </ComboboxEmpty>
              <ComboboxList>
                {(item) => (<ComboboxItem key={item} value={item}> {item} </ComboboxItem>)}
              </ComboboxList>
            </ComboboxContent>
          </Combobox>
        </Field>



        <Field className='w-sm'>
          <Label htmlFor='sortBy'> Sort By </Label>
          <Combobox items={["Started At", "Total Questions", "Clear Sort"]} onValueChange={handleSetSortBy} value={sortBy} >
            <ComboboxInput placeholder="Sort By" />
            <ComboboxContent>
              <ComboboxEmpty> Select Sort By </ComboboxEmpty>
              <ComboboxList>
                {(item) => (<ComboboxItem key={item} value={item}> {item} </ComboboxItem>)}
              </ComboboxList>
            </ComboboxContent>
          </Combobox>
        </Field>


        <Field className='w-sm'>
          <Label htmlFor='sortType'> Sort Type </Label>
          <Combobox items={["Ascending", "Descending", "Clear Sort"]} onValueChange={handleSetSortType} value={sortType} >
            <ComboboxInput placeholder="Sort Type" />
            <ComboboxContent>
              <ComboboxEmpty> Select Sort Type </ComboboxEmpty>
              <ComboboxList>
                {(item) => (<ComboboxItem key={item} value={item}> {item} </ComboboxItem>)}
              </ComboboxList>
            </ComboboxContent>
          </Combobox>
        </Field>



        {/* <Field className=''>
          <Label htmlFor='winner'> Winner </Label>
          <Combobox items={["You", "Friend", "Tie", "Any"]} onValueChange={handleSetWinner} value={winner} >
            <ComboboxInput placeholder="Select Winner" />
            <ComboboxContent>
              <ComboboxEmpty> Select Winner </ComboboxEmpty>
              <ComboboxList>
                {(item) => (<ComboboxItem key={item} value={item}> {item} </ComboboxItem>)}
              </ComboboxList>
            </ComboboxContent>
          </Combobox>
        </Field> */}


      </section>


      <section className='my-4 h-max w-full flex flex-col gap-y-2'>
        {challenges && challenges.map((curChallenge: any, index: number) => {
          const completedAt = new Date(curChallenge.updatedAt)
          curChallenge.completedAt = weekDays[completedAt.getDay()].slice(0, 3) + " " + completedAt.toLocaleDateString() + " " +
            completedAt.toLocaleTimeString('en-US', timeOptionsFor12Hours)

          return (
            <Card className="w-full" key={index}>

              <CardContent className='w-full h-max flex items-center justify-between'>

                {/* Host */}
                <div className='w-5/12'>
                  {curChallenge.userId[0] == curChallenge.winner && <span className='bg-green-900 text-xs px-0.5'> WINNER </span>}
                  {/* Host Full Name */}
                  <h3> {curChallenge.userDetails[0].firstName + " " + curChallenge.userDetails[0].lastName} </h3>
                  {/* Host Score */}
                  <h2 className='font-medium text-xl'> {curChallenge.examDetails[0].score} / {curChallenge.totalQuestions} </h2>
                </div>

                {/* VS */}
                <div className='p-1.5 font-medium text-lg rounded-full bg-primary text-black'> VS </div>

                {/* Friend */}
                <div className='w-5/12 text-right'>
                  {curChallenge.userId[1] == curChallenge.winner && <span className='bg-green-900 text-xs px-0.5'> WINNER </span>}
                  {/* Friend Full Name */}
                  <h3 className='font-medium'> {curChallenge.userDetails[1].firstName + " " + curChallenge.userDetails[1].lastName} </h3>
                  {/* Friend Score */}
                  <h2 className='font-medium text-xl'> {curChallenge.examDetails[1].score} / {curChallenge.totalQuestions} </h2>
                </div>

              </CardContent>


              <CardFooter className="flex flex-col gap-2 justify-baseline items-start">
                <div className='w-full flex justify-between items-center'>
                  Time: {curChallenge.completedAt}
                  <Button asChild>
                    <NavLink to={`/challenge-mode/challenge-result/${curChallenge._id}`}> View Details </NavLink>
                  </Button>
                </div>
                <div className='flex gap-2'>
                  <Badge variant="default" > JavaScript</Badge>
                  <Badge variant="secondary"> Core Concepts </Badge>
                  <Badge variant="outline"> Arrays & Objects </Badge>
                </div>
              </CardFooter>

            </Card>
          )
        })}
      </section>
    </main>
  )
}