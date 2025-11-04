import { auth } from '@/auth';
import CompanyWiseProgressCard from '@/components/CompanyWiseProgressCard';
import CompanyWiseProgressSkeleton from '@/components/CompanyWiseProgressSkeleton';
import ProfileCard from '@/components/ProfileCard';
import ProfileCardSkeleton from '@/components/ProfileCardSkeleton';
import React, { Suspense } from 'react'

export default async function page() {
  const sesssion = await auth()
  const id = sesssion?.user.id
  return (
    <div className='cnt'>
      <Suspense fallback={<ProfileCardSkeleton />}>         
        <ProfileCard />
      </Suspense>
      <Suspense fallback={<CompanyWiseProgressSkeleton />}>
        <CompanyWiseProgressCard userId={id as string}/>
      </Suspense>
    </div>
  )
}
