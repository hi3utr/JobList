import "./App.css";
import TableList from "./TableList";
import { NavBar } from "./NavBar";
import React, { useState, useEffect, useContext } from "react";
import { SearchContext } from "./Provider/SearchProvider";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { Bookmark } from "./Bookmark";
import { Task } from "./Task";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import { Profile } from "./Profile";
import { SearchProvider } from "./Provider/SearchProvider";
import { AuthProvider } from "./Provider/AuthProvider";

function App() {
  return (
    <Router>
      <AuthProvider>
        <SearchProvider>
          <Routes>
            <Route path="/" element={<Task />}></Route>
            <Route path="/bookmarks" element={<Bookmark />}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/register" element={<Register />}></Route>
            <Route path="/profiles" element={<Profile />}></Route>
          </Routes>
        </SearchProvider>
      </AuthProvider>
    </Router>
  );
}
export default App;
