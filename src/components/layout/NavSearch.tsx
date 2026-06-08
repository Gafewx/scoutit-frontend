"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function NavSearch() {
  const [query, setQuery] = useState("");
  const router = useRouter();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  }

  return (
    <div className="flex-1 max-w-sm hidden md:block">
      <form role="search" onSubmit={handleSubmit} className="flex">
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search products..."
          aria-label="Search products"
          className="flex-1 bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 rounded-l-lg px-4 py-2 text-sm focus:outline-none focus:border-blue-500 transition-colors"
        />
        <button
          type="submit"
          aria-label="Submit search"
          className="bg-slate-900 hover:bg-slate-800 text-white px-4 py-2 rounded-r-lg text-sm font-medium transition-colors"
        >
          Search
        </button>
      </form>
    </div>
  );
}