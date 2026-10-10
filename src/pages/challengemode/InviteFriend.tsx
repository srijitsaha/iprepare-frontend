import { io, Socket } from "socket.io-client";
import { knowAboutChallengeAPI } from '@/API/challenge.API'
import React, { useState, useEffect, useRef } from "react"
import { Swords, Check } from "lucide-react"
import { useNavigate, useParams } from 'react-router-dom'
import { Button } from "@/components/ui/button";





export const InviteFriend: React.FC = () => {
  const params = useParams()
  const navigate  =  useNavigate()

  const socketClientURL: string = import.meta.env.VITE_WEBSOCKET_SERVER_URL || ""
  const socketRef = useRef<Socket | null>(null)

  const [challengeInfo, setChallengeInfo] = useState<any>(null)
  const [isChallengeAccepted, setIsChallengeAccepted] = useState<boolean>(false)
  const [challengerDetails, setChallengerDetails] = useState<any>(null)


  const handleFetchChallengeInfo = async () => {
    try {

      const data = await knowAboutChallengeAPI({ challengeId: params.challengeId })
      setChallengeInfo({ ...data, challengeId: params.challengeId })
      setIsChallengeAccepted(data.isChallengeAccepted)
    } catch (error: any) {
      console.log(error)
    }
  }

  useEffect(() => {
    const socket = io(socketClientURL, { withCredentials: true })
    socketRef.current = socket

    const handleConnect = () => {
      console.log("Connected with socket id:", socket.id)
    }

    const handleChallengeAccepted = (data: any) => {
      setIsChallengeAccepted(true)
      setChallengerDetails(data)
    }

    socket.on('connect', handleConnect)
    socket.on('challenge-accepted', handleChallengeAccepted)
    socket.on('challenge-start', (data) => {
      console.log(data)
      navigate(`/challenge-mode/start-challenge/${params.challengeId}`)
    })

    return () => {
      socket.off('connect', handleConnect)
      socket.off('challenge-accepted', handleChallengeAccepted)
      socket.disconnect()
      socketRef.current = null
    }
  }, [])

  useEffect(() => {
    handleFetchChallengeInfo()
  }, [params.challengeId])


  const handleAcceptChallenge = () => {
    socketRef.current?.emit("accept-challenge", challengeInfo)
    setIsChallengeAccepted(true)
  }



  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-zinc-950 text-zinc-100 p-4 font-sans">
      <div className="relative z-10 w-full max-w-md bg-zinc-900 border border-zinc-800 rounded-lg shadow-2xl overflow-hidden flex flex-col transition-transform duration-300 hover:scale-[1.01]">
        {/* Header */}
        <div className="relative overflow-hidden p-6 text-center border-b border-zinc-800 bg-zinc-900/50">
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: "radial-gradient(#fff 1px, transparent 1px)",
              backgroundSize: "16px 16px",
            }}
          />
          <div className="relative inline-flex items-center justify-center w-12 h-12 rounded-full bg-zinc-700 border border-zinc-700 mb-2">
            <Swords size={20} className="text-white" fill="white" />
          </div>
          <h2 className="relative text-2xl font-semibold tracking-tight text-white mb-1">
            Challenge Request
          </h2>
          <p className="relative text-sm text-zinc-400">
            An opponent has invited you to a 1v1 match.
          </p>
        </div>

        {/* Body */}
        <div className="p-6 flex flex-col gap-6">
          {/* Opponent */}
          <div className="flex items-center gap-4 p-4 rounded-lg bg-zinc-950 border border-zinc-800">
            <div className="h-14 w-14 flex items-center justify-center border-2 border-zinc-800 text-center rounded-full">
              {challengeInfo?.hostFirstName[0]}{challengeInfo?.hostLastName[0]}
            </div>
            <div className="grow">
              <h3 className="text-sm font-bold text-white"> {challengeInfo?.hostFirstName} {challengeInfo?.hostLastName} </h3>
              <div className="flex items-center gap-2 mt-1">
              </div>
            </div>
          </div>

          {/* Match details */}
          <div className="grid grid-cols-2 gap-2">
            <div className="col-span-2 p-4 rounded border border-zinc-800 bg-zinc-950/50">
              <p className="text-xs font-medium text-zinc-400 uppercase tracking-wider mb-1">
                Subject
              </p>
              <p className="text-base text-white"> {challengeInfo?.board} - {challengeInfo?.subject} </p>
            </div>
            <div className="p-4 rounded border border-zinc-800 bg-zinc-950/50">
              <p className="text-xs font-medium text-zinc-400 uppercase tracking-wider mb-1">
                Topic
              </p>
              <p className="text-sm text-white"> {challengeInfo?.topic} </p>
            </div>
            <div className="p-4 rounded border border-zinc-800 bg-zinc-950/50">
              <p className="text-xs font-medium text-zinc-400 uppercase tracking-wider mb-1">
                Format
              </p>
              <p className="text-sm text-white"> {challengeInfo?.totalQuestions} Qs / 10 Min</p>
            </div>
          </div>

          {/* Quote */}
          <div className="text-center pt-2">
            <p className="text-sm italic text-zinc-400/70">
              "Your only limit is you."
            </p>
          </div>
        </div>

        {/* Status row */}
        {challengeInfo && challengeInfo.areYouAdmin && !isChallengeAccepted && 
        
        <div className="px-6 pb-4 flex items-center justify-between animate-pulse">
          <div className="flex items-center gap-2">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75" />
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500" />
            </span>
            {challengeInfo && challengeInfo.areYouAdmin && !isChallengeAccepted && <>
              <span className="text-sm font-medium text-zinc-400">
                Waiting for Opponent...
              </span>
            </>}

          </div>
        </div>
        }


        {challengeInfo && challengeInfo.areYouAdmin && isChallengeAccepted && <>
          <span className="text-md font-bold text-white p-3 text-center">
            {challengerDetails.firstName} {challengerDetails.lastName} has accepted the challenge. 
          </span>
        </>}

        {/* Actions */}
        {challengeInfo && !challengeInfo.areYouAdmin && 
          <div className="px-6 pb-6 flex flex-col gap-2">
            <button className="w-full h-12 rounded flex items-center justify-center gap-2 bg-white text-zinc-950 text-sm font-bold hover:bg-zinc-200 transition-all duration-150 active:scale-[0.98]" onClick={handleAcceptChallenge} disabled={isChallengeAccepted}>
              {!isChallengeAccepted && <Check size={18} strokeWidth={2.5} />}
              {isChallengeAccepted ? "Challenge Accepted" : "Accept Challenge"}
            </button>
          </div>
        }

        {challengeInfo && isChallengeAccepted && challengeInfo.areYouAdmin ? <Button variant="default" className="mb-4"  onClick={() => {
          navigate(`/challenge-mode/start-challenge/${params.challengeId}`)
        }}> Start Challenge </Button> : <p className="mx-6 mb-4 text-xl text-center"> Get Ready </p>}



      </div>
    </div>
  )
}