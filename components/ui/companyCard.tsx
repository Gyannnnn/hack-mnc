import React from "react";
import { Card } from "./card";
import Image from "next/image";
import { Badge } from "./badge";
import { company } from "@/types/type";
import Link from "next/link";

export default function CompanyCard({data,type}:{data: company,type:string}) {
  return (
    <Link href={`/companies/${data.id}`} target="_blank" className={`${type === "large"?"sm:w-1/5":"sm:w-1/6 w-full "} h-44  relative`}>
    <Card className={`flex h-full relative items-center justify-center mt-2 bg-muted`}>
      <Image
        src={data.logo.trim()}
        height={150}
        width={150}
        alt={`${data.name} logo`}
      ></Image>
      <Badge className="absolute top-1 right-1">
        {data.name}{" "}
        <Badge className="h-6" variant={"secondary"}>
          {data._count?.questions} +
        </Badge>
      </Badge>
    </Card>
    </Link>
  );
}
