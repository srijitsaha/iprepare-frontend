import { getUserSettingsAPI, modifyUserSettingsAPI } from '@/API/user.API'
import { Button } from '@/components/ui/button'
import { Field, FieldContent, FieldDescription, FieldLabel, FieldTitle } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Switch } from '@/components/ui/switch'
import React, { useEffect, useState } from 'react'
import { toast } from 'sonner'

export const AccountSection: React.FC = () => {
  const [userSettings, setUserSettings] = useState<any>({ firstName: '', lastName: '', institutionName: '' })
  const [makeSuccessVisible, setMakeSuccessVisible] = useState<boolean>(false)

  const handleSettingFormInputChange = (e: any) => setUserSettings({ ...userSettings, [e.target.name]: e.target.value })



  const getUserSettings = async () => {
    try {
      const data = await getUserSettingsAPI()
      setUserSettings({ firstName: data.firstName, lastName: data.lastName, institutionName: data?.institutionName })
      setMakeSuccessVisible(data.makeSuccessVisible)
    } catch (error: any) {
      toast.error(error.response.data.message, {
        position: 'top-right'
      })
    }
  }


  const modifyUserSettings = async () => {
    try {
      const data = await modifyUserSettingsAPI({ ...userSettings, makeSuccessVisible: makeSuccessVisible })
      toast.success(data.message, {
        position: 'top-right'
      })
    } catch (error: any) {
      toast.error(error.response.data.message, {
        position: 'top-right'
      })
    }
  }



  useEffect(() => {
    getUserSettings()
  }, [])

  return (
    <section className='h-max w-full p-3 border border-[#ffffff1a] rounded-xl flex flex-col gap-3'>

      <Field>
        <FieldLabel htmlFor="firstName"> First name </FieldLabel>
        <Input id="firstName" placeholder="John" name='firstName' value={userSettings.firstName} onChange={handleSettingFormInputChange} />
      </Field>

      <Field>
        <FieldLabel htmlFor="lastName"> Last name </FieldLabel>
        <Input id="lastName" placeholder="Doe" name='lastName' value={userSettings.lastName} onChange={handleSettingFormInputChange} />
      </Field>

      <Field>
        <FieldLabel htmlFor="institutionName"> Institution Name </FieldLabel>
        <Input id="institutionName" placeholder="e.g. School name, College name, University name or other institution name" name='institutionName' value={userSettings.institutionName} onChange={handleSettingFormInputChange} />
        <FieldDescription> It will help you share your progress to the world by your institution name.  </FieldDescription>
      </Field>

      <FieldLabel htmlFor="makeSuccessVisible">
        <Field orientation="horizontal">
          <FieldContent>
            <FieldTitle>Share your progress</FieldTitle>
            <FieldDescription>
              By turning on the option, your progress will be publically visible accross others who were already using iPrepare.
            </FieldDescription>
          </FieldContent>
          <Switch id="makeSuccessVisible" name='makeSuccessVisible' checked={makeSuccessVisible} onCheckedChange={setMakeSuccessVisible} />
        </Field>
      </FieldLabel>


      <Button onClick={modifyUserSettings}> Save Change </Button>
    </section>
  )
}