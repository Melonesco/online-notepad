import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/login";
import Create from "./pages/create";
import Stats from "./pages/stats";
import Header from "./components/header";
import AddStudents from "./pages/add-students";
import Main from "./pages/main";

const App = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/login" element={<Login />} />
        <Route path="/create" element={<Create />} />
        <Route path="/stats" element={<Stats />} />
        <Route path="/add-students" element={<AddStudents />} />
      </Routes>
    </>
  );
};

export default App;
