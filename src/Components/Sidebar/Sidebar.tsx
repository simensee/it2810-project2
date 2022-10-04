import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AppRoutes } from '../Router/AppRoutes'
import NavButton from './NavButton'
import ArticleIcon from '@mui/icons-material/Article';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import { DataContext } from '../../Resources/DataContext';
import { FormatListBulleted } from '@mui/icons-material';
import { useStepContext } from '@mui/material';

const Sidebar = () => {
  const ctx = useContext(DataContext);
  const navigate = useNavigate();
  return (
    <div className='flex'>
      <aside className='md:w-64 max-h-screen'>
        <div className='w-screen h-20 p-2 sm:h-full sm:w-64 fixed left-0 top-0 bg-nav-bg sm:py-10 sm:px-5'>
          <div className='sm:m-4 sm:text-5xl text-gray-100'>
            <h1>My GitLab</h1>
          </div>
          <ul className='flex space-x-1 sm:space-y-2 sm:flex sm:flex-col'>
            <li>
              <NavButton
                route={AppRoutes.usersPage}
              >
                <span className="flex-1 md:ml-4 whitespace-nowrap">Users</span>
              </NavButton>
            </li>
            <li>
              <NavButton
                route={AppRoutes.progressPage}
              >
                <span className="flex-1 md:ml-3 whitespace-nowrap">Progress</span>
              </NavButton>
            </li>
            <li>
              <NavButton
                route={AppRoutes.issuesPage}
              >
                <span className="flex-1 md:ml-3 whitespace-nowrap">Issues</span>
              </NavButton>
            </li>
            <li>
              <button
                className='flex items-center md:space-x-6 md:px-4 md:py-2 rounded-lg text-gray-100 hover:bg-gray-100 hover:text-gray-900 w-full'
                onClick={() => {
                  localStorage.setItem('isAuth', 'false');
                  navigate(AppRoutes.loginPage);
                }}
              >
                <span className="flex-1 md:ml-3 text-start whitespace-nowrap">Log out</span>
              </button>
            </li>
          </ul>
        </div>
      </aside>
    </div>
  )
}

export default Sidebar