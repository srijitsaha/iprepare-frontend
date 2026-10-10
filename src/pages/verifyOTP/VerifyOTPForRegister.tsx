import { RefreshCwIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Field, FieldDescription, FieldLabel } from "@/components/ui/field"
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp"
import { useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import { useEffect, useState, type SyntheticEvent } from "react"
import { registerUserAPI, resendOTPToUserForRegisterAPI } from "@/API/user.API"
import { toast } from "sonner"

export const VerifyOTPForRegister = () => {
  const registerDetails = useSelector((state: any) => state.registerDetails)
  const navigate = useNavigate()
  const [otp, setOtp] = useState<string>("")
  const [error, setError] = useState<string | null>(null)
  const [incorrectOTP, setIncorrectOTP] = useState(false)
  const [seconds, setSeconds] = useState<number>(60)
  const [timerId, setTimerId] = useState<any>(null)


  useEffect(() => {
    (() => {
      if (!registerDetails.email) {
        navigate('/sign-up')
      }
    }
    )()
  }, [registerDetails])

  const startTimer = () => {
    if (seconds <= 0) return

    const timerIntervalId = setTimeout(() => {
      setSeconds((currentSeconds) => currentSeconds - 1)
    }, 1000)
    setTimerId(timerIntervalId)
  }


  useEffect(() => {
    startTimer()

    return () => clearTimeout(timerId)
  }, [seconds])


  const handleVerifyOTP = async () => {
    try {
      const data = await registerUserAPI({ ...registerDetails, otp })
      if (data) {
        setError(null)
        setIncorrectOTP(false)
        toast.success(data.message, {
          position: 'top-right'
        })
      }
    } catch (error: any) {

      if (error.response.data.message == "Incorrect OTP.") {
        setIncorrectOTP(true)
      }
      setError(error.response.data.message)
      toast.error(error.response.data.message, {
        position: 'top-right'
      })
    }
  }


  const handleResendOTP = async (e: SyntheticEvent) => {
    e;
    try {
      const data = await resendOTPToUserForRegisterAPI({ email: registerDetails.email })
      if(data) {
        toast.success(data.message, {
          position: 'top-right'
        })
        setSeconds(60)
        startTimer()
      }
    } catch (error: any) {
      toast.error(error.response.data.message, {
        position: 'top-right'
      })
    }
  }


  return (
    <Card className="mx-auto my-12 max-w-md">
      <CardHeader>
        <CardTitle> Verify your email </CardTitle>
        <CardDescription>
          Enter the verification code we sent to your email address:
          <span className="font-medium"> {registerDetails.email} </span>
        </CardDescription>
      </CardHeader>
      <CardContent>

        <Field>

          <div className="flex items-center justify-between">
            <FieldLabel htmlFor="otp-verification"> Verification code </FieldLabel>

            <Button variant="outline" size="xs" disabled={seconds > 0} onClick={handleResendOTP}> <RefreshCwIcon />  Resend Code ({seconds}) </Button>
          </div>


          <InputOTP maxLength={6} id="otp-verification" required={true} onChange={value => setOtp(value)} value={otp}>
            <InputOTPGroup>
              <InputOTPSlot index={0} aria-invalid={incorrectOTP} />
              <InputOTPSlot index={1} aria-invalid={incorrectOTP} />
              <InputOTPSlot index={2} aria-invalid={incorrectOTP} />
              <InputOTPSlot index={3} aria-invalid={incorrectOTP} />
              <InputOTPSlot index={4} aria-invalid={incorrectOTP} />
              <InputOTPSlot index={5} aria-invalid={incorrectOTP} />
            </InputOTPGroup>
          </InputOTP>


          <FieldDescription>
            {(!error && !incorrectOTP) && <Link to=""> I no longer have access to this email address. </Link>}
            {(error || incorrectOTP) && <p>  {error}  </p>}
          </FieldDescription>

        </Field>
      </CardContent>
      <CardFooter>

        <Field>
          <Button type="button" className="w-full" onClick={handleVerifyOTP}> Verify </Button>

          <div className="text-sm text-muted-foreground">
            Having trouble signing in?
            <Link to="#" className="underline underline-offset-4 transition-colors hover:text-primary" > Contact support </Link>
          </div>
        </Field>


      </CardFooter>
    </Card>
  )
}
