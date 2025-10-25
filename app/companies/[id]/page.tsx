import { getCompanyById } from '@/app/actions/company/company';
import CompanyDetails from '@/components/CompanyDetails';
import CompanyDetails222 from '@/components/CompanyDetails222';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import QuestionCard from '@/components/ui/questionCard';
import Image from 'next/image';
import React from 'react'

export default async function page({params}:{
    params:Promise<{id: string}>
}) {

    const id = await (await params).id;
    try {
        const res = await getCompanyById(id);
        const companyData = res?.data
        return (
            <div className='cnt'>
                <div className='flex max-sm:flex-col gap-2'>
                    <Card className='w-1/3 h-40 flex flex-row items-center justify-around relative'>
                    <Image height={200} width={200} src={companyData?.logo as string} alt={`${companyData?.name} logo`}></Image>
                    <Card className='h-20 w-20 flex items-center justify-center text-black font-bold text-4xl rounded-full bg-green-400 border border-white'>
                        <h1>{companyData?._count.questions}</h1>
                    </Card>
                    <Badge className='absolute top-2 left-2'>
                        {companyData?.name}
                    </Badge>
                    </Card>
                    <Card className='w-2/3 h-40'></Card>
                </div>
                <div>
                    {/* <CompanyDetails id={id}/> */}
                    <CompanyDetails222/>
                </div>
            </div>
        )
    } catch (error) {
        <div className='cnt'>
            <h1>Something went wrong</h1>

        </div>
    }  
}
