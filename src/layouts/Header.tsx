import { getUserInfoAPI } from '@/API/user.API'
import { Button } from '@/components/ui/button'
import { useEffect, useState } from 'react'
import { Flame } from 'lucide-react'
import { NavLink } from 'react-router-dom'

export const Header = () => {
  const [userInfo, setUserInfo] = useState<any>({})

  const handleFetchUserInfo = async () => {
    try {
      const response = await getUserInfoAPI()
      if(response?.loggedIn === false) {
        setUserInfo(null)
        return
      }
      setUserInfo(response)
    } catch (error) {
      setUserInfo(null)
    }
  }

  useEffect(() => {
    handleFetchUserInfo()
  }, [])

  return (
    <>
      <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
        <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-8">
          <div className="text-xl font-bold tracking-tight text-primary">
            iPrepare
          </div>
          {/* {userInfo && } */}
          <div className='flex gap-1'>
            {userInfo && <div className='flex pr-2 items-center border border-white rounded-lg text-xs'> <Flame color='yellow' size={20} /> {userInfo.points} </div> }
            <Button className="rounded-md px-6" asChild={true}>
              <NavLink to={userInfo ? "/dashboard": '/sign-in'}> {userInfo ? userInfo.firstName : "Get Started"} </NavLink>
            </Button>
          </div>
        </div>
      </nav>
    </>
  )
}