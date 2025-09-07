
"use client";

import { Search } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const SearchBar = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [search, setSearch] = useState(searchParams.get("name") || "");

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString());
      
      if (search) {
        params.set("name", search);
      } else {
        params.delete("name");
      }
      
      params.set("page", "1");
      
      router.push(`/?${params.toString()}`);
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [search, router, searchParams]);

  return (
    <div className="relative max-w-3xl mx-auto bg-white">
      <div className="relative">
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
        <input
          type="text"
          placeholder="Search for a unit by name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-(--secondary-color)/50 shadow-lg"
        />
      </div>
    </div>
  );
};

export default SearchBar;
