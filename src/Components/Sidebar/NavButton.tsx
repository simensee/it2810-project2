import React, { ReactNode } from 'react'
import { Link } from 'react-router-dom';

type NavButtonProps = {
  route: string;
  children: ReactNode;
}

const NavButton = ({
  route,
  children,
}: NavButtonProps) => {
  return (
    <Link to={route} className='flex items-center space-x-6 px-4 py-2 rounded-lg text-gray-100 hover:bg-gray-100 hover:text-gray-900'>
      {children}
    </Link>
  )
}

export default NavButton