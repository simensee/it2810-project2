import React, { useContext, useEffect, useState } from 'react'
import { DataContext } from '../../Resources/DataContext';
import { Commit, User } from '../../Resources/ResponseTypes';
import UserDetailCard from '../DetailCards/UserDetailCard';
import UserCard from '../UserCard';


const UsersPage = () => {

  const [focusUser, setFocusUser] = useState<User>({
    name: 'Empty',
  });

  const ctx = useContext(DataContext);

  const handleUserClick = (u: User) => {
    setFocusUser(u);
    sessionStorage.setItem('focusedUser', u.id!.toString());
  }

  useEffect(() => {
    const prevUser: User = ctx.usersData.find(u => u.id?.toString() === sessionStorage.getItem('focusedUser')) ?? {name: 'Empty'};
    setFocusUser(prevUser);
  }, []);
 
  return (
    <div className='grid grid-cols-3 gap-4'>
      <div className='col-span-2 grid grid-cols-4 gap-y-4'>
        {ctx.usersData.map((u, i) => {
          return <UserCard key={u.id} user={u} handleClick={(u) => handleUserClick(u)} isSelected={(u.id === focusUser.id)}></UserCard>
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