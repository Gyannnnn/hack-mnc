import React from 'react'
import { Loader, LoaderCircle } from 'lucide-react'
import FeaturedCompany from '@/components/FeaturedCompany'
import Topics from '@/components/Topics'
import Questions from '@/components/Questions'


export default function page() {
  return (
    <div className='cnt'>
      <FeaturedCompany/>
      <Topics/>
      <h1>Questions Topic wise company wise</h1>
      <Questions/>
  
    </div>
  )
}
