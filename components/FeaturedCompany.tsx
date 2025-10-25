import {  getAllFeaturedCompany } from "@/app/actions/company/company";
import React from "react";
import { Card } from "./ui/card";
import Image from "next/image";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default async function FeaturedCompany() {
  let companyData;
  try {
    const res = await getAllFeaturedCompany();
    companyData = res?.data.splice(0, 5);
    return (
      <div className="flex flex-col items-end max-sm:px-4 justify-center pt-16 gap-2 ">
        <div className="w-full sm:flex gap-2 ">
          {companyData?.map((data, index) => (
            <Card
              key={index}
              className="flex sm:w-1/5 h-44  relative items-center justify-center mt-2"
            >
              <Image
                src={data.logo.trim()}
                height={150}
                width={150}
                alt={`${data.name} logo`}
              ></Image>
              <Badge className="absolute top-1 right-1">
                {data.name}{" "}
                <Badge className="h-6" variant={"secondary"}>
                  {data._count.questions} +
                </Badge>
              </Badge>
            </Card>
          ))}
        </div>
        <Link href="/companies">
          <Button variant={"link"}>
            See all companies <ArrowRight />
          </Button>
        </Link>
      </div>
    );
  } catch (error) {}
}
