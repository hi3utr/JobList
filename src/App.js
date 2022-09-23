import "./App.css";
import TableList from "./TableList";
import { NavBar } from "./NavBar";
import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [jobs, setJobs] = useState([]);
  const [deleteJob, setDeleteJob] = useState(false);
  var jobApi = "https://630eca933792563418817e08.mockapi.io/products";
  useEffect(() => {
    axios.get(jobApi).then((res) => {
      setJobs(res.data);
    });
  }, [deleteJob]);

  return (
    <div className="App">
      <NavBar />
      {jobs.length > 0 && (
        <TableList
          jobs={jobs}
          setJobs={setJobs}
          jobApi={jobApi}
          deleteJob={deleteJob}
          setDeleteJob={setDeleteJob}
        />
      )}
    </div>
  );
}
export default App;
