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
            <div className='ml-64 pl-4 pb-8 lg:pt-12 px-4 h-full'>
                <Outlet />
            </div>
            </>
        );
    } else {
        return <Navigate to={AppRoutes.loginPage} replace />
    }
}

export default ProtectedRoute