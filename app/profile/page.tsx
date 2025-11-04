import { auth } from '@/auth';
import CompanyWiseProgressCard from '@/components/CompanyWiseProgressCard';
import ProfileCard from '@/components/ProfileCard';
import React from 'react'

export default async function page() {
  const sesssion = await auth()
  const id = sesssion?.user.id
  return (
    <div className='cnt'>
      <ProfileCard />
      <CompanyWiseProgressCard userId={id as string}/>
    </div>
  )
}
