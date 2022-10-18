import React, { createContext, useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export const SearchBookmarkContext = createContext({});

export const BookmarkProvider = ({ children }) => {
  const navigate = useNavigate();
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
    <SearchBookmarkContext.Provider
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
    </SearchBookmarkContext.Provider>
  );
};
