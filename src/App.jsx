import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import BooksList from "./components/BooksList";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="app">
        <h1>
          <i className="fa fa-book"></i> Book Explorer
        </h1>
        <Routes>
          <Route path="/" element={<BooksList />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
