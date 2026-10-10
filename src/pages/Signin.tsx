import { SigninForm } from "@/components/signin-form"


export const Signin = () => {
  return (
    <>
      <main className="flex min-h-screen w-full items-center justify-center p-6 md:p-10">
        <div className="w-full max-w-sm">
          <SigninForm />
        </div>
      </main>
    </>
  )
}