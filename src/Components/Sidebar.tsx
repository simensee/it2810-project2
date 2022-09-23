import React from 'react'
import {Link} from 'react-router-dom'
import { AppRoutes } from './Router/AppRoutes'

const Sidebar = () => {
  return (
        <div className='sidebar'>
            <h1>Inital router</h1>
            <ul className="header">
                <li><Link to={AppRoutes.readme}>Readme</Link></li>
                <li><Link to={AppRoutes.usersPage}>Users</Link></li>
                <li><Link to={AppRoutes.progressPage}>Progress</Link></li>
                <li><Link to={AppRoutes.brancesPage}>Branches</Link></li>
            </ul>
        </div>
  )
}

export default Sidebar