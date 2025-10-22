import React from 'react'
import Questions from "@/components/Questions"
import { Input } from '@/components/ui/input'

export default function page() {
  return (
    <div className='cnt'>
      <div className='w-1/2'>
        <Input placeholder='Search questions'></Input>
      </div>
      <Questions/>
    </div>
  )
}
