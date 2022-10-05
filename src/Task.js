import TableList from "./TableList";
import { NavBar } from "./NavBar";
import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { SearchContext } from "./Provider/SearchProvider";

export const Task = () => {
  const [loading, setLoading] = useState(true);
  const { searchTerm, setSearchTerm } = useContext(SearchContext);
  var jobApi = "https://630eca933792563418817e08.mockapi.io/products";
  const [jobs, setJobs] = useState([]);
  const fetchApi = (search) => {
    setLoading(true);
    axios.get(jobApi, { params: { search } }).then((res) => {
      setJobs(res.data);
      setLoading(false);
    });
  };

  useEffect(() => {
    fetchApi(searchTerm);
  }, [searchTerm]);
  return (
    <div className="App">
      <NavBar fetchApi={fetchApi} />
      <TableList
        jobs={jobs}
        setJobs={setJobs}
        jobApi={jobApi}
        fetchApi={fetchApi}
        loading={loading}
      />
    </div>
  );
};
