import { useContext, useEffect } from "react";
import { useState } from "react";
import { SearchContext } from "../Provider/SearchProvider";
import { getBookmarkList } from "../services/TaskService";

export const useBookmarkList = () => {
  const [loading, setLoading] = useState(true);
  const [jobs, setJobs] = useState([]);
  const [pagination, setPagination] = useState({
    page: 1,
    pageSize: 10,
    total: 1,
  });

  const { searchTerm, sort, filter, page, pageSize } =
    useContext(SearchContext);

  const fetchApi = async (search, sort, filter, page, pageSize) => {
    setLoading(true);
    const res = await getBookmarkList(search, sort, filter, page, pageSize);

    setJobs(res.data.results);
    setPagination(res.data.pagination);
    setLoading(false);
  };

  useEffect(() => {
    fetchApi(searchTerm, sort, filter, page, pageSize);
  }, [searchTerm, sort, filter, page, pageSize]);

  return {
    fetchApi,
    loading,
    jobs,
    pagination,
    setJobs,
    setPagination,
    setLoading,
  };
};
