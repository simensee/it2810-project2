import React, { useContext } from 'react'
import { Navigate, Outlet } from 'react-router-dom';
import { DataContext } from '../../Resources/DataContext';
import Sidebar from '../Sidebar/Sidebar';
import { AppRoutes } from './AppRoutes';

const ProtectedRoute = () => {
    const ctx = useContext(DataContext);

    if (ctx.isAuthorized) {
        return (
            <>
            <nav>
                <Sidebar />
            </nav>
            <div className='pt-20 h-full w-full mb-4 sm:pl-64 sm:pb-8 sm:px-4'>
                <Outlet />
            </div>
            </>
        );
    } else {
        return <Navigate to={AppRoutes.loginPage} replace />
    }
}

export default ProtectedRoute