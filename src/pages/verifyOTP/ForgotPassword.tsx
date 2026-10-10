import { sendOTPToUserForForgotPasswordAPI, setNewPasswordForForgotPasswordAPI, verifyOTPToUserForForgotPasswordAPI } from '@/API/user.API'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Field, FieldDescription } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp'
import { Label } from '@/components/ui/label'
import { RefreshCwIcon } from 'lucide-react'
import React, { useEffect, useState, type SyntheticEvent } from 'react'
import { toast } from 'sonner'

export const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState<string>("")
  const [isOTPSent, setIsOTPSent] = useState<boolean>(false)

  const [error, setError] = useState<string | null>(null)
  const [errorField, setErrorField] = useState<string | null>(null)
  // const [incorrectOTP, setIncorrectOTP] = useState(false)


  const [seconds, setSeconds] = useState<number>(60)

  const [otp, setOtp] = useState<string>('')
  const [forgotPasswordToken, setForgotPasswordToken] = useState<string | null>(null)
  const [password, setPassword] = useState<string>('')
  const [confirmPassword, setConfirmPassword] = useState<string>('')


  useEffect(() => {
    if (seconds <= 0) return

    const timer = setTimeout(() => {
      setSeconds((currentSeconds) => currentSeconds - 1)
    }, 1000)


    return () => clearTimeout(timer)
  }, [seconds])


  const handleSendOtpToUserEmailForForgotPassword = async (e: SyntheticEvent) => {
    e;
    try {
      const data = await sendOTPToUserForForgotPasswordAPI({ email })
      if (data.success) {
        setIsOTPSent(true)
        setSeconds(60)

        setErrorField(null)
        setError(null)

        toast.success(data.message, {
          position: 'top-right'
        })
      }

    } catch (error: any) {
      setErrorField('email')
      setError(error.response.data.message)

      toast.error(error.response.data.message, { position: 'top-right' })
    }
  }


  const handleResendOtpToUserEmailForForgotPassword = async (e: SyntheticEvent) => {
    e;
    try {
      const data = await sendOTPToUserForForgotPasswordAPI({ email })
      if (data.success) {

        setIsOTPSent(true)
        setSeconds(60)
        setErrorField(null)

        toast.success(data.message, {
          position: 'top-right'
        })
      }

    } catch (error: any) {
      toast.error(error.response.data.message, { position: 'top-right' })
    }
  }


  const handleVerifyOtpToUserEmailForForgotPassword = async (e: SyntheticEvent) => {
    e;
    try {
      const data = await verifyOTPToUserForForgotPasswordAPI({ email, otp })

      if (data.success) {
        setForgotPasswordToken(data.forgotPasswordToken)
        setErrorField(null)
        setError(null)
        setSeconds(0)

        toast.success(data.message, {
          position: 'top-right'
        })
      }

    } catch (error: any) {

      setError(error.response.data.message)
      setErrorField('otp')

      toast.error(error.response.data.message, { position: 'top-right' })
    }
  }


  const handleSetPasswordForForgotPassword = async (e: SyntheticEvent) => {
    e.target;
    if (password != confirmPassword) {
      setErrorField('password')
      setError("Password and confirm password doesn't match")
      toast.error("Password and confirm password doesn't match", { position: 'top-right' })
      return
    }

    try {
      const data = await setNewPasswordForForgotPasswordAPI({ email, forgotPasswordToken, password })

      if (data.success) {
        setErrorField(null)
        setError(null)

        toast.success(data.message, {
          position: 'top-right'
        })
      }

    } catch (error: any) {
      setErrorField('password')
      setError(error.response.data.message)
      toast.error(error.response.data.message, { position: 'top-right' })
    }
  }



  return (
    <>
      <div className='w-full flex justify-center items-center' style={{ minHeight: 'calc(100vh - 6rem)' }}>
        <Card className="w-full max-w-sm mx-auto my-2">

          <CardHeader>
            <CardTitle> Forgot Password </CardTitle>
            <CardDescription>  Enter your Email ID below which is associated to your account. We will send an OTP to verify that is you.  </CardDescription>
          </CardHeader>


          <CardContent>
            <div className="flex flex-col gap-6">

              <Field data-invalid={errorField == 'email'}>
                <div className="grid gap-2">
                  <Label htmlFor="email"> Email </Label>
                  <Input id="email" type="email" placeholder="me@example.com" aria-invalid={errorField == 'email'}
                    onChange={(e: any) => setEmail(e.target.value)} value={email} required={true} disabled={forgotPasswordToken != null}
                  />
                </div>

                {error && errorField == 'email' && <FieldDescription className='text-red-400'> {error} </FieldDescription>}
              </Field>


              <Button type="button" className="w-full" onClick={handleSendOtpToUserEmailForForgotPassword} disabled={isOTPSent}> Send OTP </Button>

              {isOTPSent &&
                <>
                  <Field className="grid gap-2" aria-invalid={errorField == 'otp'}>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="otp-verification"> OTP </Label>
                      <Button variant="outline" size="xs" disabled={(seconds > 0 || forgotPasswordToken != null)} onClick={handleResendOtpToUserEmailForForgotPassword}> <RefreshCwIcon />  Resend Code ({seconds}) </Button>
                    </div>

                    <InputOTP maxLength={6} id="otp-verification" required={true} onChange={value => setOtp(value)} value={otp} aria-invalid={errorField == 'otp'}>
                      <InputOTPGroup aria-invalid={errorField == 'otp'}>
                        <InputOTPSlot index={0} aria-invalid={errorField == 'otp'} />
                        <InputOTPSlot index={1} aria-invalid={errorField == 'otp'} />
                        <InputOTPSlot index={2} aria-invalid={errorField == 'otp'} />
                        <InputOTPSlot index={3} aria-invalid={errorField == 'otp'} />
                        <InputOTPSlot index={4} aria-invalid={errorField == 'otp'} />
                        <InputOTPSlot index={5} aria-invalid={errorField == 'otp'} />
                      </InputOTPGroup>
                    </InputOTP>

                    {error && errorField == 'otp' && <FieldDescription className='text-red-400'> {error} </FieldDescription>}

                  </Field>

                  <Button type="button" className="w-full" onClick={handleVerifyOtpToUserEmailForForgotPassword} disabled={forgotPasswordToken != null}> Verify </Button>
                </>
              }

              {isOTPSent && forgotPasswordToken &&
                <>
                  <Field>
                    <Label htmlFor='newPassword'> New Password </Label>
                    <Input type='password' name='password' placeholder='New Password' onChange={e => setPassword(e.target.value)} value={password} />
                  </Field>


                  <Field>
                    <Label htmlFor='confirmPassword'> Confirm Password </Label>
                    <Input type='password' name='confirmPassword' placeholder='Confirm Password' onChange={e => setConfirmPassword(e.target.value)} value={confirmPassword} />
                  </Field>

                  {error && errorField == 'password' && <FieldDescription className='text-red-400'> {error} </FieldDescription>}

                  <Button type="button" className="w-full" onClick={handleSetPasswordForForgotPassword}> Reset Password </Button>
                </>
              }



            </div>
          </CardContent>
        </Card>
      </div>
    </>
  )
}