import CompanyDetails from "@/components/CompanyDetails";
import React from "react";
import { auth } from "@/auth";
import CompanyDetailsCard from "@/components/CompanyDetailsCard";

export default async function page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const session = await auth();
  const id = await (await params).id;
  try {
    return (
      <div className="cnt">
        <CompanyDetailsCard
          companyId={id}
          userId={session?.user.id as string}
        />
        <div>
          <CompanyDetails
            companyId={id}
            userId={session?.user.id as string}
            id={id}
          />
        </div>
      </div>
    );
  } catch (error) {
    console.log(error)
    return (
      <div className="cnt">
        <h1>Something went wrong</h1>
      </div>
    );
  }
}
