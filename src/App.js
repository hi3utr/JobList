import "./App.css";
import TableList from "./pages/home/TableList";
import { NavBar } from "./components/NavBar";
import React, { useState, useEffect, useContext } from "react";
import { SearchContext } from "./Provider/SearchProvider";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { Bookmark } from "./pages/bookmark/Bookmark";
import { Task } from "./pages/home/Task";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import { Profile } from "./pages/profile/Profile";
import { SearchProvider } from "./Provider/SearchProvider";
import { AuthProvider } from "./Provider/AuthProvider";
import { BookmarkProvider } from "./Provider/bookmarkProvider";

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route
            path="/"
            element={
              <SearchProvider>
                <Task />
              </SearchProvider>
            }
          ></Route>
          <Route
            path="/bookmarks"
            element={
              <BookmarkProvider>
                <Bookmark />
              </BookmarkProvider>
            }
          ></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/profiles" element={<Profile />}></Route>
        </Routes>
      </AuthProvider>
    </Router>
  );
}
export default App;
