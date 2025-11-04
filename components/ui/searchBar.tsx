// components/SearchBar.tsx
"use client";
import React, { useEffect, useState } from "react";

type Props = {
  initial?: string;
  onSearch: (value: string) => void;
  delay?: number;
};

export default function SearchBar({ initial = "", onSearch, delay = 350 }: Props) {
  const [value, setValue] = useState(initial);

  useEffect(() => {
    const id = setTimeout(() => onSearch(value.trim()), delay);
    return () => clearTimeout(id);
  }, [value, onSearch, delay]);

  return (
    <div className="w-full">
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Search questions (e.g., 2sum)"
        className="w-full rounded-md border p-2"
      />
    </div>
  );
}
