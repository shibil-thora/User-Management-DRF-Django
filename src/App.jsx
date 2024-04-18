import { useState } from 'react';
import Home from './Pages/Home';
import './App.css';
import Admin from './Pages/Admin' ;
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Login from './Pages/Login'; 
import SignUp from './Pages/SignUp';



function App() {

  return (
    <>
       <Router>
        <Routes>
          <Route exact path='/' element={<Home />}/>
          <Route path='admin' element={<Admin />}/>
          <Route path='login' element={<Login />}/>
          <Route path='signup' element={<SignUp />}/>
        </Routes>
       </Router>
    </>
  )
}

export default App
