'use server'

import * as auth from '@/auth'

export async function signIn() {
  console.log('ss')
  return auth.signIn('github')
}
export async function signOut() {
  return auth.signOut()
}