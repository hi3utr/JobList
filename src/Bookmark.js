import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { SearchContext } from "./Provider/SearchProvider";
import BookmarkList from "./BookmarkList";
import { NavBar } from "./NavBar";
import { AuthContext } from "./Provider/AuthProvider";

export const Bookmark = () => {
  const { token } = useContext(AuthContext);
  const { searchTerm, setSearchTerm } = useContext(SearchContext);
  const [loading, setLoading] = useState(true);
  var jobApi = process.env.REACT_APP_API_URL + "/todo";
  const [jobs, setJobs] = useState([]);
  const fetchApi = (search) => {
    setLoading(true);
    axios
      .get(jobApi, {
        params: { search, bookmark: true },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setJobs(res.data.results);
        setLoading(false);
      });
  };

  useEffect(() => {
    if (searchTerm) fetchApi(searchTerm);
    else fetchApi();
  }, [searchTerm]);
  return (
    <div
      style={{
        background:
          "url('https://img.freepik.com/free-vector/white-abstract-background-design_23-2148825582.jpg?w=996&t=st=1664858906~exp=1664859506~hmac=e6c35fd5426cac94358be6f2e4012e85beed75932850fc744190441d1695387d')",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
      className="h-[100vh]"
    >
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
