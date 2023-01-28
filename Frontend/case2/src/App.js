import React, { useEffect } from "react";

import Header from './partials/Header/Header';
import IndexPage from "./Pages/index";
import FileUploadPage from "./Pages/FileUpload";
import './App.css';
import Login from "./Pages/Login";
import Register from "./Pages/Register";

import {
  useNavigate,
} from "react-router-dom";
import { Route, Routes } from "react-router-dom"




function App() {

const navigate = useNavigate()
  const checkToken = (e)=>{
    const token = window.localStorage.getItem('user_token')
    if(token == null && !window.location.href.includes('register')){
      navigate('/login')
    }
  }

useEffect(()=>{
  checkToken()
},[])
  

  return (
    <>
      <Header  />
      <Routes>
        <Route path="/" element={<IndexPage />} />
        <Route path="/upload" element={<FileUploadPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </>

  );
}

export default App;
