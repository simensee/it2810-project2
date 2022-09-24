import React from 'react'
import {
    BrowserRouter as Router,
    Route,
    Routes
  } from "react-router-dom";
import BranchesPage from '../Pages/BranchesPage';
import ProgressPage from '../Pages/ProgressPage';
import Readme from '../Pages/Readme';
import UsersPage from '../Pages/UsersPage';
import { AppRoutes } from './AppRoutes';

const NavRouter = () => {
  return (
    <Routes>
        <Route path={AppRoutes.readme} element={<Readme/>}/>
        <Route path={AppRoutes.usersPage} element={<UsersPage/>}/>
        <Route path={AppRoutes.progressPage} element={<ProgressPage/>}/>
        <Route path={AppRoutes.brancesPage} element={<BranchesPage/>}/>
    </Routes>
  )
}

export default NavRouter