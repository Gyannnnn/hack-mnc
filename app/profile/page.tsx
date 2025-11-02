import { auth } from '@/auth'
import { redirect } from 'next/navigation';
import React from 'react'

export default async function page() {
  const session = await auth();
  if(!session) redirect("/login")
  const email = session?.user.email
  console.log(session?.accessToken)
  return (
    <div className='cnt'>
      <h1>{email}</h1>
      <h1>{session?.accessToken}</h1>
      <h1>{session.user.id}</h1>
    </div>
  )
}
