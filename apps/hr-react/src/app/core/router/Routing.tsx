import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from '../../pages/home/home';
import Employees from '../../pages/employees/Employees';

function Routing() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/employees" element={<Employees />} />
    </Routes>
  );
}

export default Routing;
