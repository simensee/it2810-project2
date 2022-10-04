import React, { useContext } from 'react'
import { Navigate, Outlet } from 'react-router-dom';
import { DataContext } from '../../Resources/DataContext';
import { AppRoutes } from './AppRoutes';

const UnProtectedRoute = () => {
  const isAuth = localStorage.getItem('isAuth') === 'true';
  if (isAuth){
      return <Navigate to={AppRoutes.readme} replace/>
  }
  return <Outlet/>
}

export default UnProtectedRoute