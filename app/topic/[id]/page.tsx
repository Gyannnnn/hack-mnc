import { auth } from "@/auth";
import TopicDetailsCard from "@/components/TopicDetailsCard";
import TopicQuestionsPage from "@/components/TopicQuestionsDetails";
import React from "react";

export default async function TopicPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;
  const session  = await auth()
  

  return (
    <div className="cnt">  
        <TopicDetailsCard userId={session?.user.id as string} id={id} />
        <TopicQuestionsPage type="topic" companyId="" userId={session?.user.id as string}  id={id} />
    </div>
  );
}
