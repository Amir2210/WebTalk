'use client'
import { NavbarItem, Button, Avatar, Popover, PopoverContent, PopoverTrigger } from '@nextui-org/react'
import { useSession } from 'next-auth/react'
import { signIn } from '@/actions'
import { signOut } from '@/actions'
import { useRouter } from 'next/navigation'
function HeaderAuth() {
  const session = useSession()
  const router = useRouter()
  const handleSignOut = () => {
    signOut()
    router.refresh()  // Refresh the session state manually
    session.data = null // Set session data to null to trigger a re-render
  }
  let authContent: React.ReactNode
  if (session.status === 'loading') {
    authContent = null
  }
  else if (session?.data?.user) {
    authContent =
      <Popover placement='left'>
        <PopoverTrigger>
          <Avatar className='cursor-pointer' src={session?.data?.user.image || ''}></Avatar>
        </PopoverTrigger>
        <PopoverContent>
          <div className='p-4'>
            <Button onClick={handleSignOut} type='submit' color='danger'>Sign Out</Button>
          </div>
        </PopoverContent>
      </Popover>
  } else {
    authContent =
      <>
        <NavbarItem>
          <Button onClick={() => signIn()} type='submit' color='secondary' variant='bordered'>Sign In</Button>
        </NavbarItem>

        <NavbarItem>
          <Button onClick={() => signIn()} type='submit' color='primary' variant='flat'>Sign Up</Button>
        </NavbarItem>
      </>
  }
  return (
    authContent
  )
}

export default HeaderAuth