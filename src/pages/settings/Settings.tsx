import { Toaster } from '@/components/ui/sonner'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import React from 'react'
import { CredentialsSection } from './Credentials'
import { AccountSection } from './Accounts'

export const Settings: React.FC = () => {


  return (
    <main className='h-fit w-full p-3'>
      <Toaster />
      <Tabs defaultValue="account" className="min-w-100">
        <TabsList>
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="credentials">Credentials</TabsTrigger>
        </TabsList>


        <TabsContent value="account">
          <AccountSection />
        </TabsContent>


        <TabsContent value="credentials">
          <CredentialsSection />
        </TabsContent>


      </Tabs>
    </main>
  )
}