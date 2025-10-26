import { getTopicDetails } from '@/app/actions/topics/topics';
import TopicQuestionsPage from '@/components/TopicQuestionsDetails';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import Image from 'next/image';
import React from 'react'

export default async function TopicPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;
  const res = await getTopicDetails({id});
  const topicData = res?.data
  return (
    <div className='cnt'>
      <div className='flex max-sm:flex-col gap-2'>
                    <Card className='w-1/3 h-40 flex flex-row items-center justify-around relative'>
                    
                    <Card className='h-30 w-30 flex items-center justify-center text-white font-bold text-2xl rounded-full border border-primary'>
                        <h1>41/{topicData?._count.questions}</h1>
                    </Card>
                    <Badge className='absolute top-2 left-2'>
                        {topicData?.name}
                    </Badge>
                    </Card>
                    <Card className='w-2/3 h-40 px-4'>
                    <div className='flex gap-2 justify-around items-center'>
                        <h1 className='text-green-400 font-bold'>EASY</h1> <Progress  value={20}/> <h1>20/50</h1>
                    </div>
                    <div className='flex gap-2 justify-around items-center'>
                        <h1 className='text-yellow-400 font-bold'>MEDIUM</h1> <Progress  value={50}/> <h1>17/30</h1>
                    </div>
                    <div className='flex gap-2 justify-around items-center'>
                        <h1 className='text-red-400 font-bold'>HARD</h1> <Progress  value={10}/> <h1>5/46</h1>
                    </div>
                    </Card>
                </div>
      <TopicQuestionsPage id={id} />
    </div>
  );
}