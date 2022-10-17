import React, { createContext, useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export const SearchContext = createContext({});

export const SearchProvider = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const [sort, setSort] = useState(params.get("sort") || "");
  const [searchTerm, setSearchTerm] = useState(params.get("search"));
  const [filter, setFilter] = useState(JSON.parse(params.get("filter")));
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  useEffect(() => {
    setFilter({});
    setSort("");
    setSearchTerm("");
    setPage(1);
    setPageSize(10);
    navigate(location.pathname);
  }, [location.pathname]);
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
