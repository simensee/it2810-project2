import React from 'react'
import {
  HashRouter as Router,
  Route,
  Routes
} from "react-router-dom";
import LoginPage from '../Pages/LoginPage';
import ProgressPage from '../Pages/ProgressPage';
import UsersPage from '../Pages/UsersPage';
import IssuesPage from '../Pages/IssuesPage';
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
        <Route path={AppRoutes.usersPage} element={<UsersPage />} />
        <Route path={AppRoutes.progressPage} element={<ProgressPage />} />
        <Route path={AppRoutes.issuesPage} element={<IssuesPage />} />
      </Route>
    </Routes>
  )
}

export default NavRouter