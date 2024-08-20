'use client'
import { useSession } from 'next-auth/react'
function Profile() {
  const session = useSession()

  if (session.data?.user) {
    return <div>from client user is sign in</div>
  }
  return <div>from client user is NOT! sign in</div>
}

export default Profile