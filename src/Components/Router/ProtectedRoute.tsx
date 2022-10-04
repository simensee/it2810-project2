import React, { useContext, useEffect, useState } from 'react'
import { Navigate, Outlet } from 'react-router-dom';
import { isatty } from 'tty';
import { DataContext } from '../../Resources/DataContext';
import Sidebar from '../Sidebar/Sidebar';
import { AppRoutes } from './AppRoutes';

const ProtectedRoute = () => {
    const isAuth = localStorage.getItem('isAuth') === 'true';

    const ctx = useContext(DataContext);

    const setup = async () => {
        await ctx.setup().then(async () => {
            await ctx.fetchUsers();
            await ctx.fetchCommits();
            await ctx.fetchBranches();
            await ctx.fetchMergeRequests();
            await ctx.fetchIssues();
        });
    }

    useEffect(() => {
        setup().then(() => setLoadComplete(true));
    }, [])

    const [loadComplete, setLoadComplete] = useState(false);

    if (isAuth) {
        return (
            <>
                {loadComplete ?
                    <>
                        <nav>
                            <Sidebar />
                        </nav>
                        <div className='pt-20 h-full w-full mb-4 sm:pl-64 sm:pb-8 sm:px-4'>
                            <Outlet />
                        </div>
                    </>
                    : <div></div>}
            </>
        );
    } else {
        return <Navigate to={AppRoutes.loginPage} replace />
    }
}

export default ProtectedRoute