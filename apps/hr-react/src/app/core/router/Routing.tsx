import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from '../../pages/home/home';
import Employees from '../../pages/employees/Employees';
import Departments from '../../pages/departments/Departments';
import LoginPage from '../../pages/Auth/login/LoginPage';
import Register from '../../pages/Auth/register/Register';
import ResetPassword from '../../pages/Auth/reset-password/ResetPassword';
import RouteGuard from '../guards/RouteGuard';
import Notfound from '../../pages/notfound/Notfound';
import Dashboard from '../../pages/dashboard/Dashboard';
import AuthLayout from '../../components/layout/AuthLayout';
import Locations from '../../pages/locations/Locations';
import Profile from '../../pages/profile/Profile';

function Routing() {
  return (
    <Routes>
      <Route path="/" element={<Home />}>
        <Route
          path="/"
          element={
            <RouteGuard>
              <Dashboard />
            </RouteGuard>
          }
        />
      </Route>

      <Route path="/auth" element={<AuthLayout />}>
        <Route path="/auth/login" element={<LoginPage />} />
        <Route path="/auth/register" element={<Register />} />
        <Route path="/auth/reset-password" element={<ResetPassword />} />
      </Route>
      <Route path="/hr" element={<Home />}>
        <Route
          path="/hr/profile"
          element={
            <RouteGuard>
              <Profile />
            </RouteGuard>
          }
        />
        <Route
          path="/hr/employees"
          element={
            <RouteGuard>
              <Employees />
            </RouteGuard>
          }
        />
        <Route
          path="/hr/departments"
          element={
            <RouteGuard>
              <Departments />
            </RouteGuard>
          }
        />
        <Route
          path="/hr/locations"
          element={
            <RouteGuard>
              <Locations />
            </RouteGuard>
          }
        />
      </Route>
      <Route path="*" element={<Notfound />}></Route>
    </Routes>
  );
}

export default Routing;
