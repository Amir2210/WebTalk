import Link from 'next/link'
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Input } from '@nextui-org/react'
import HeaderAuth from './HeaderAuth'
function Header() {
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
        <HeaderAuth />
      </NavbarContent>
    </Navbar>
  )
}

export default Header