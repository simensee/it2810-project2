import React, { useContext, useEffect, useState } from 'react';
import logo from './logo.svg';
import { Commit, User } from './Resources/ResponseTypes';
import Sidebar from './Components/Sidebar/Sidebar';
import NavRouter from './Components/Router/NavRouter';
import { DataContext } from './Resources/DataContext';
import { classicNameResolver } from 'typescript';
import classnames from 'tailwindcss-classnames';
import UserCard from './Components/UserCard';

function App() {
  const ctx = useContext(DataContext);

  const setup = async () => {
    await ctx.fetchUsers();
    await ctx.fetchCommits();
  }

  const [user, setUser] = useState<User>({
    name: 'empty user',
  });



  useEffect(() => {  
    setup().then(() => setUser(ctx.usersData[11]));
  }, []);


  // console.log(FetchUsers());

  // console.log(resp[0]);s
  
  
  // resp?.map(u => console.log(u.name))
  // console.log(FetchEvents());

  // ctx.setVal('Hallo');
  
  return (
    <>
    <nav>
      <Sidebar/>
    </nav>
    <div className='ml-64 pl-4 pb-8 lg:pt-12 px-4 h-full'>
      {/* <NavRouter/> */}
      <UserCard user={user}/>
    </div>
    </>
  );
}

export default App;
