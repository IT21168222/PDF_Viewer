import './App.css';
import React, { useState } from 'react';
import HomePage from './components/HomePage';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import PdfViewerPage from './components/PdfViewerPage';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import Header from './components/Header';
import Footer from './components/Footer';
import PrivateRoute from './components/PrivateRoute';

function App() {


  return (
    <>
      
      <BrowserRouter>
      <Header />
        <Routes>
          <Route exact path="/" element={<HomePage />} />
          <Route exact path="/SignUp" element={<SignUp />} />
           <Route exact path="/SignIn" element={<SignIn/>} />
          <Route element={<PrivateRoute/>}>
            <Route path="/view-pdf/:id" element={<PdfViewerPage />} />
          </Route>
        </Routes>
        
      </BrowserRouter>
      
    </>
  );
}

export default App;
