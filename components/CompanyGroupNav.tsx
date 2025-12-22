"use client";

import Link from "next/link";
import Image from "next/image";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { slugify } from "@/utils/slugify.utility";
import { getAllCompanies } from "@/app/actions/company/company";
import { useEffect, useState } from "react";
import { companyResponse } from "@/types/type";

export default function CompanyGroupNav() {
  const [companyData, setCompanyData] = useState<companyResponse | null>();
  useEffect(() => {
    async function getCompanies() {
      const result = await getAllCompanies();
      setCompanyData(result);
    }
    getCompanies();
  }, []);
  return (
    <ToggleGroup
      className="flex-nowrap w-max"
      type="multiple"
      variant="outline"
      spacing={2}
      size="sm"
    >
      {companyData?.data.map((company) => {
        const slug = slugify(company.name);

        return (
          <ToggleGroupItem
            key={company.id}
            value={slug}
            className="flex items-center gap-2 data-[state=on]:bg-transparent"
          >
            <Link
              href={`/companies/${slugify(
                company.name
              )}/leetcode-interview-questions`}
              className="flex items-center gap-2"
            >
              <Image
                src={company.logoSmall}
                alt={company.name}
                width={16}
                height={16}
              />

              <span>{company.name}</span>
            </Link>
          </ToggleGroupItem>
        );
      })}
    </ToggleGroup>
  );
}
