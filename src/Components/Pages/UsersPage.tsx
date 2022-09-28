import React, { useContext, useEffect, useState } from 'react'
import { DataContext } from '../../Resources/DataContext';
import { Commit, User } from '../../Resources/ResponseTypes';
import UserDetailCard from '../DetailCards/UserDetailCard';
import UserCard from '../UserCard';


const UsersPage = () => {

  const [displayUserDetails, toggleUserDetails] = useState(false);
  const [focusUser, setFocusUser] = useState<User>({
    name: 'Empty User',
  });

  const ctx = useContext(DataContext);
  const userList: User[] = ctx.usersData;

 

  return (
    <div className='grid grid-cols-3 gap-4'>
      <div className='col-span-2 grid grid-cols-3 gap-4'>
        {userList.map((u, i) => {
          // Lise sett in usercard her :)
          return <UserCard key={u.id} user={u}></UserCard>
        })}
      </div>
      <div className='w-full'>
        <UserDetailCard 
        focusUser={focusUser}
        />
      </div>
    </div>


  )
}

export default UsersPage