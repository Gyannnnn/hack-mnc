import React from 'react'
import { getTopics } from '@/app/actions/topics/topics';
import { Badge } from './ui/badge';
import Link from 'next/link';
import { Card } from './ui/card';
import { Tooltip, TooltipContent } from './ui/tooltip';
import { TooltipTrigger } from '@radix-ui/react-tooltip';

export default async function Topics() {
    let topicData;
  try {
    const res = await getTopics();
    topicData = res?.data
    console.log(topicData);
    
    return(
        <Card className='flex flex-row flex-wrap justify-start min-h-52 gap-1 px-4'>
            {
                topicData?.map((topic,index)=>(
                    <Link key={index} href={`/topic/${topic.id}`}>
                    <Tooltip>
                      <TooltipTrigger>
                        <Badge  className=' mr-1 mb-1 bg-secondary' >{topic.name} <Badge className='bg-card rounded-full text-primary'>{topic._count.questions} +</Badge></Badge>
                      </TooltipTrigger>
                      <TooltipContent>
                        Click to solve questions on {topic.name}
                      </TooltipContent>
                    </Tooltip>
                    </Link>
                ))
            }
        </Card>
    )
    
  } catch (error) {
    <div className='cnt'>
        <h1>something went wrong</h1>
    </div>
    
  }
}
