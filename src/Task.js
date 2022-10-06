import TableList from "./TableList";
import { NavBar } from "./NavBar";
import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { SearchContext } from "./Provider/SearchProvider";
import { AuthContext } from "./Provider/AuthProvider";

export const Task = () => {
  const [loading, setLoading] = useState(true);
  const { token } = useContext(AuthContext);

  const { searchTerm, setSearchTerm } = useContext(SearchContext);
  var jobApi = process.env.REACT_APP_API_URL + "/todo";
  const [jobs, setJobs] = useState([]);
  const fetchApi = async (search) => {
    setLoading(true);
    const res = await axios.get(jobApi, {
      params: { search },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    setJobs(res.data.results);
    setLoading(false);
  };

  useEffect(() => {
    if (searchTerm) fetchApi(searchTerm);
    else fetchApi();
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
