import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";
import BranchesPage from '../Pages/BranchesPage';
import LoginPage from '../Pages/LoginPage';
import ProgressPage from '../Pages/ProgressPage';
import Readme from '../Pages/Readme';
import UsersPage from '../Pages/UsersPage';
import { AppRoutes } from './AppRoutes';
import ProtectedRoute from './ProtectedRoute';
import UnProtectedRoute from './UnProtectedRoute';

const NavRouter = () => {
  return (
    <Routes>
      <Route element={<UnProtectedRoute />}>
        <Route path={AppRoutes.loginPage} element={<LoginPage />} />
      </Route>
      <Route element={<ProtectedRoute />}>
        <Route path={AppRoutes.readme} element={<Readme />} />
        <Route path={AppRoutes.usersPage} element={<UsersPage />} />
        <Route path={AppRoutes.progressPage} element={<ProgressPage />} />
        <Route path={AppRoutes.branchesPage} element={<BranchesPage />} />
      </Route>
    </Routes>
  )
}

export default NavRouter