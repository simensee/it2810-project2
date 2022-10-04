import React, { useContext } from 'react'
import { Navigate, Outlet } from 'react-router-dom';
import { DataContext } from '../../Resources/DataContext';
import { AppRoutes } from './AppRoutes';

const UnProtectedRoute = () => {
    const ctx = useContext(DataContext);
  if (ctx.isAuthorized){
      return <Navigate to={AppRoutes.usersPage} replace/>
  }
  return <Outlet/>
}

export default UnProtectedRoute