import React from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import Calendar from '../components/Calendar';
import Today from '../components/Today';
import Navbar from '../components/navbar';


function App() {
  return (
    <Router>
      <Routes>
        <Route path='/Calendar' element={<Calendar />} />
        <Route path='/Today' element={<Today />} />
      </Routes>
      <Navbar />
    </Router>
  );
}
export default App;
