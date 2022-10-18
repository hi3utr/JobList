import React, { createContext, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

export const SearchContext = createContext({});

export const SearchProvider = ({ children }) => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const [sort, setSort] = useState(params.get("sort") || "");
  const [searchTerm, setSearchTerm] = useState(params.get("search"));
  const [filter, setFilter] = useState(JSON.parse(params.get("filter")));
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    setSearchTerm((prev) => {
      const newSearchTerm = searchParams.get("search") || "";

      if (prev !== newSearchTerm) {
        return newSearchTerm;
      }

      return prev;
    });
  }, [location.search]);

  return (
    <SearchContext.Provider
      value={{
        searchTerm,
        setSearchTerm,
        sort,
        setSort,
        filter,
        setFilter,
        page,
        setPage,
        pageSize,
        setPageSize,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};
