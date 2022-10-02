import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { AppRoutes } from '../Router/AppRoutes'
import NavButton from './NavButton'
import ArticleIcon from '@mui/icons-material/Article';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import { DataContext } from '../../Resources/DataContext';

const Sidebar = () => {
const ctx = useContext(DataContext);

  return (
    <div className='flex'>
      <aside className='w-64 max-h-screen'>
        <div className='w-64 fixed left-0 top-0 h-screen bg-nav-bg py-10 px-5 min-h-screen'>
          <div className='m-4 text-5xl text-gray-100'>
            <h1>Nettside</h1>
          </div>
          <ul className='space-y-2'>
            <li >
              <NavButton
                route={AppRoutes.readme}
              >
                <ArticleIcon />
                <span>Readme</span>
              </NavButton>
            </li>
            <li>
              <NavButton
                route={AppRoutes.usersPage}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
                <span>Users</span>
              </NavButton>
            </li>
            <li>
              <NavButton
                route={AppRoutes.progressPage}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z"></path></svg>
                <span className="flex-1 ml-3 whitespace-nowrap">Progress</span>
              </NavButton>
            </li>
            <li>
              <NavButton
                route={AppRoutes.branchesPage}
              >
                <AccountTreeIcon />
                <span className="flex-1 ml-3 whitespace-nowrap">Branches</span>
              </NavButton>
            </li>
            <li>
              <button 
              className='flex items-center space-x-6 px-4 py-2 rounded-lg text-gray-100 hover:bg-gray-100 hover:text-gray-900'
              onClick={()=> {
                ctx.setIsAuthorized(false);
              }}
              >
                <span className="flex-1 ml-3 whitespace-nowrap">Log out</span>
              </button>
            </li>
          </ul>
        </div>
      </aside>
    </div>
  )
}

export default Sidebar