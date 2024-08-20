import Link from 'next/link'
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Input, Button, Avatar, Popover, PopoverContent, PopoverTrigger } from '@nextui-org/react'
import { auth } from '@/auth'
import { signIn } from '@/actions'
import { signOut } from '@/actions'
async function Header() {
  const session = await auth()

  let authContent: React.ReactNode
  if (session?.user) {
    authContent =
      <Popover placement='left'>
        <PopoverTrigger>
          <Avatar src={session.user.image || ''}></Avatar>
        </PopoverTrigger>
        <PopoverContent>
          <div className='p-4'>
            <form action={signOut}>
              <Button type='submit' color='danger'>Sign Out</Button>
            </form>
          </div>
        </PopoverContent>
      </Popover>
  } else {
    authContent =
      <>
        <NavbarItem>
          <form action={signIn}>
            <Button type='submit' color='secondary' variant='bordered'>Sign In</Button>
          </form>
        </NavbarItem>

        <NavbarItem>
          <form action={signIn}>
            <Button type='submit' color='primary' variant='flat'>Sign Up</Button>
          </form>
        </NavbarItem>
      </>
  }

  return (
    <Navbar className='shadow-md mb-6 p-2'>
      <NavbarBrand>
        <Link href={'/'} className='font-bold'>webTalk</Link>
      </NavbarBrand>
      <NavbarContent justify='center'>
        <NavbarItem>
          <Input></Input>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify='end'>
        {authContent}
      </NavbarContent>
    </Navbar>
  )
}

export default Header