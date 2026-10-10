import { changeUserPasswordAPI, getUserEmailAPI } from '@/API/user.API'
import { Button } from '@/components/ui/button'
import { Field, FieldDescription, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import React, { useEffect, useState, type ChangeEvent, type SyntheticEvent } from 'react'
import { toast } from 'sonner'

export const CredentialsSection: React.FC = () => {
  const [userCredentials, setUserCredentials] = useState<any>({ oldPassword: '', newPassword: '', confirmPassword: '' })
  const [email, setEmail] = useState<string>('')
  const handleCredentialsFormInputChange = (e: ChangeEvent<HTMLInputElement>) => setUserCredentials({ ...userCredentials, [e.target.name]: e.target.value })

  const fetchUserEmail = async () => {
    try {
      const response = await getUserEmailAPI()
      setEmail(response.email)
    } catch (error: any) {
      console.log(error.response)
    }
  }



  const changeUserPassword = async (e: SyntheticEvent) => {
    e
    try {
      const response = await changeUserPasswordAPI(userCredentials)
      toast.success(response.message, {
        position: 'top-right'
      })
    } catch (error: any) {
      toast.error(error.response.data.message, {
        position: 'top-right'
      })
    }
  }



  useEffect(() => {
    fetchUserEmail()
  }, [])



  return (
    <section className='h-max w-full p-3 border border-[#ffffff1a] rounded-xl flex flex-col gap-3'>
      <Field>
        <FieldLabel htmlFor="email"> Email </FieldLabel>
        <Input id="email" placeholder="John" name='email' value={email} disabled={true} />
        <FieldDescription> Email can't be changed. </FieldDescription>
      </Field>

      <Field>
        <FieldLabel htmlFor="oldPassword"> Old Password </FieldLabel>
        <Input type='password' id="oldPassword" placeholder="John" name='oldPassword' value={userCredentials.oldPassword} onChange={handleCredentialsFormInputChange} />
      </Field>

      <Field>
        <FieldLabel htmlFor="newPassword"> New Password </FieldLabel>
        <Input type='password' id="newPassword" placeholder="New Password" name='newPassword' value={userCredentials.newPassword} onChange={handleCredentialsFormInputChange} />
      </Field>

      <Field>
        <FieldLabel htmlFor="confirmPassword"> Confirm Password </FieldLabel>
        <Input type='password' id="confirmPassword" placeholder="Confirm Password" name='confirmPassword' value={userCredentials.confirmPassword} onChange={handleCredentialsFormInputChange} />
      </Field>

      <Button onClick={changeUserPassword}> Change Password </Button>
    </section>
  )
}