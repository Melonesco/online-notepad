import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/login";
import Create from "./pages/create";
import Stats from "./pages/stats";
import Header from "./components/header";
import { useDispatch } from "react-redux";
import AddStudents from "./pages/add-students";
import { AnyAction, ThunkDispatch } from "@reduxjs/toolkit";
import { RootState } from "./redux/store";
import { fetchAuthMe } from "./redux/auth/asyncActions";
import Main from "./pages/main";

const App = () => {
  const dispatch: ThunkDispatch<RootState, null, AnyAction> = useDispatch();

  useEffect(() => {
    dispatch(fetchAuthMe());
  }, [dispatch]);

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
