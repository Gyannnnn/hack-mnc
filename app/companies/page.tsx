"use client";
import React, { useEffect, useMemo, useState } from "react";
import { getAllCompanies } from "../actions/company/company";
import CompanyCard from "@/components/ui/companyCard";
import { Input } from "@/components/ui/input";
import { debounce } from "lodash";
import Loading from "../loading";
import { company } from "@/types/type";

export default function Companies() {
  const [query, setQuery] = useState("");
  const [companyData, setCompanyData] = useState<company[]>([]);
  const [filteredCompanies, setFilteredCompanies] = useState<company[]>([]);
  const [loading, setLoading] = useState(true);

  const debouncedSearch = useMemo(
    () =>
      debounce((value: string, allCompanies: any[]) => {
        if (!value.trim()) {
          setFilteredCompanies(allCompanies);
          return;
        }

        const lower = value.toLowerCase();
        const filtered = allCompanies.filter((company) =>
          company.name.toLowerCase().includes(lower)
        );

        setFilteredCompanies(filtered);
      }, 500),
    []
  );

  useEffect(() => {
    return () => {
      debouncedSearch.cancel();
    };
  }, [debouncedSearch]);

  // Fetch companies once
  useEffect(() => {
    async function fetchCompanies() {
      try {
        setLoading(true);
        const data = await getAllCompanies();
        const allCompanies = data?.data || [];
        setCompanyData(allCompanies);
        setFilteredCompanies(allCompanies);
      } catch (error) {
        console.error("Failed to fetch companies", error);
      } finally {
        setLoading(false);
      }
    }

    fetchCompanies();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    debouncedSearch(value, companyData);
  };

  if (loading) return <Loading />;

  return (
    <div className="cnt">
      <div className="w-full items-center justify-center sm:px-26  flex py-4">
        <Input
          placeholder="Search companies..."
          value={query}
          onChange={handleChange}
          className="sm:w-1/2 w-full "
        />
      </div>

      <div className="w-full min-h-screen flex flex-wrap justify-center gap-2">
        {filteredCompanies.length > 0 ? (
          filteredCompanies.map((company, index) => (
            <CompanyCard type="small" key={index} data={company} />
          ))
        ) : (
          <div>No companies found</div>
        )}
      </div>
    </div>
  );
}
