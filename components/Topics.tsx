import React from 'react'
import { getTopics } from '@/app/actions/topics/topics';
import { Badge } from './ui/badge';
import Link from 'next/link';

export default async function Topics() {
    let topicData;
  try {
    const res = await getTopics();
    topicData = res?.data
    console.log(topicData);
    
    return(
        <div className='flex flex-row flex-wrap justify-start min-h-52 gap-1'>
            {
                topicData?.map((topic,index)=>(
                    <Link key={index} href={`/questionsbytopic/${topic.id}`}>
                    <Badge  className=' mr-1 mb-1 bg-secondary' >{topic.name} <Badge className='bg-card rounded-full text-primary'>{topic._count.questions} +</Badge></Badge>
                    </Link>
                ))
            }
        </div>
    )
    
  } catch (error) {
    
  }
}
