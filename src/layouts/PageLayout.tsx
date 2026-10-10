import { Outlet } from "react-router-dom"
import { Header } from "./Header"
import { Footer } from "./Footer"
import { Toaster } from "@/components/ui/sonner"

export const PageLayout = () => {
  return (
    <>
      <Header />
      <Toaster />
      <Outlet />
      <Footer />
    </>
  )
}