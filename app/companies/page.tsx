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
      debounce((value: string, allCompanies: company[]) => {
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
      <div className="">
        <div className="w-full flex items-center justify-start py-4">
          <div className="relative w-full max-w-xl">
            {/* search icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M10.5 3.75a6.75 6.75 0 1 0 4.243 11.964l4.271 4.272a.75.75 0 1 0 1.06-1.06l-4.272-4.272A6.75 6.75 0 0 0 10.5 3.75Zm-5.25 6.75a5.25 5.25 0 1 1 10.5 0 5.25 5.25 0 0 1-10.5 0Z"
                clipRule="evenodd"
              />
            </svg>
            <Input
              placeholder="Search companies..."
              value={query}
              onChange={handleChange}
              className="w-full pl-10 rounded-lg"
            />
          </div>
        </div>

        <div className="w-full min-h-screen grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 mb-10">
          {filteredCompanies.length > 0 ? (
            filteredCompanies.map((company, index) => (
              <CompanyCard type="large" key={index} data={company} />
            ))
          ) : (
            <div>No companies found</div>
          )}
        </div>
      </div>
    </div>
  );
}
