import "./App.css";
import TableList from "./TableList";
import { NavBar } from "./NavBar";
import React, { useState, useEffect, useContext } from "react";
import { SearchContext } from "./Provider/SearchProvider";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { Bookmark } from "./Bookmark";
import { Task } from "./Task";
import Login from "./Login";
import Register from "./Register";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Task />}></Route>
        <Route path="/bookmarks" element={<Bookmark />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/register" element={<Register />}></Route>
      </Routes>
    </Router>
  );
}
export default App;
