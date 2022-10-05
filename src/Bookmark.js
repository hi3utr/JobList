import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { SearchContext } from "./Provider/SearchProvider";
import BookmarkList from "./BookmarkList";
import { NavBar } from "./NavBar";

export const Bookmark = () => {
  const { searchTerm, setSearchTerm } = useContext(SearchContext);
  const [loading, setLoading] = useState(true);
  var jobApi = "https://630eca933792563418817e08.mockapi.io/products";
  const [jobs, setJobs] = useState([]);
  const fetchApi = (search) => {
    setLoading(true);
    axios.get(jobApi, { params: { search, bookmark: true } }).then((res) => {
      setJobs(res.data);
      setLoading(false);
    });
  };

  useEffect(() => {
    fetchApi(searchTerm);
  }, [searchTerm]);
  return (
    <div>
      <NavBar />
      <BookmarkList
        jobs={jobs}
        setJobs={setJobs}
        jobApi={jobApi}
        fetchApi={fetchApi}
        loading={loading}
      />
    </div>
  );
};
