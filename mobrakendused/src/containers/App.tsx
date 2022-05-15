import React from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import Calendar from '../components/Calendar';
import Today from '../components/Today';
import New from '../components/New';
import Navbar from '../components/navbar';
import '../components/styles.js';
import Logo from '../components/logo'


function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Logo />} />
        <Route path='/Calendar' element={<Calendar />} />
        <Route path='/Today' element={<Today />} />
        <Route path='/New' element={<New />} />
      </Routes>
      <Navbar />
    </Router>
  );
}
export default App;
