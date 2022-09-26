import React, { useContext, useEffect } from 'react';
import logo from './logo.svg';
import { Commit, User } from './Resources/ResponseTypes';
import Sidebar from './Components/Sidebar/Sidebar';
import NavRouter from './Components/Router/NavRouter';
import { DataContext } from './Resources/DataContext';

function App() {
  const ctx = useContext(DataContext);

  const setup = async () => {
    await ctx.fetchUsers();
    await ctx.fetchCommits();
  }


  useEffect(() => {  
    setup();
  }, []);


  // console.log(FetchUsers());

  // console.log(resp[0]);s
  
  
  // resp?.map(u => console.log(u.name))
  // console.log(FetchEvents());

  // ctx.setVal('Hallo');
  
  return (
   <nav className='flex fixed bottom-0 top-0 bg-black/20 px-4 py-8'>
     <Sidebar/>
     <NavRouter/>
   </nav>
  );
}

export default App;
