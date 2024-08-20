import { Button } from '@nextui-org/react'
import { signIn, signOut } from '@/actions'
import { auth } from '@/auth'
import Profile from '@/components/Profile'
export default async function Home() {
  const session = await auth()
  return (
    <div>
      <form action={signIn}>
        <Button type='submit'>sing in</Button>
      </form>
      <form action={signOut}>
        <Button type='submit'>sing out</Button>
      </form>
      {session?.user ? <div>sing in</div> : <div>sign out</div>}
      <Profile />
    </div>
  )
}
