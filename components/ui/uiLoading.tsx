import { LoaderCircle } from 'lucide-react'
import React from 'react'

export default function Uiloading() {
  return (
    <div className='
    h-60 w-full flex flex-col items-center justify-center'>
        <h1>Fetching Questions</h1>
        <LoaderCircle className='h-10 w-10 animate-[spin_0.5s_linear_infinite] text-primary'/>
    </div>
  )
}
