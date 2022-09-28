import React, { useContext, useEffect, useState } from 'react';
import logo from './logo.svg';
import { Commit, User } from './Resources/ResponseTypes';
import Sidebar from './Components/Sidebar/Sidebar';
import NavRouter from './Components/Router/NavRouter';
import { DataContext } from './Resources/DataContext';
import { classicNameResolver } from 'typescript';
import classnames from 'tailwindcss-classnames';
import LoginPage from './Components/Pages/LoginPage';

function App() {
  const ctx = useContext(DataContext);

  const setup = async () => {
    await ctx.fetchUsers();
    await ctx.fetchCommits();
  }

  const [loadComplete, setLoadComplete] = useState(false);

  useEffect(() => {
    setup().then(() => setLoadComplete(true)).then(() => console.log(ctx.usersData));
  }, []);

  // console.log(FetchUsers());

  // console.log(resp[0]);s


  // resp?.map(u => console.log(u.name))
  // console.log(FetchEvents());

  // ctx.setVal('Hallo');

  return (
    <>
      {/* <LoginPage/> */}
      {loadComplete ? 
      <NavRouter/>
      :
      <div className='flex items-center justify-center h-full'>
        <span className='text-5xl'>Loading...</span>
      </div>      
    }
      {/* <nav>
        <Sidebar />
      </nav>
      <div className='ml-64 pl-4 pb-8 lg:pt-12 px-4 h-full'>
        {loadComplete ?
          <span>done</span>
          : <span>Loading data</span>
        }
        <NavRouter/>
      </div> */}
    </>
  );
}

export default App;
