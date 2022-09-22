import "./App.css";
import TableList from "./TableList";
import { NavBar } from "./NavBar";
import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [jobs, setJobs] = useState([]);
  useEffect(() => {
    axios
      .get(`https://630eca933792563418817e08.mockapi.io/products`)
      .then((res) => {
        setJobs(res.data);
      });
  }, []);

  return (
    <div className="App">
      <NavBar />
      {jobs.length > 0 && <TableList jobs={jobs} />}
    </div>
  );
}
export default App;
