import { useState } from 'react';
import Home from './Pages/Home';
import './App.css';
import Admin from './Pages/Admin' ;
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Login from './Pages/Login';



function App() {

  return (
    <>
       <Router>
        <Routes>
          <Route exact path='/' element={<Home />}/>
          <Route path='admin' element={<Admin />}/>
          <Route path='login' element={<Login />}/>
        </Routes>
       </Router>
    </>
  )
}

export default App
