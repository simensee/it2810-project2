import React from 'react';
import logo from './logo.svg';
import { FetchEvents, FetchUsers } from './Resources/APIWrapper';
import { User } from './Resources/ResponseTypes';
import Sidebar from './Components/Sidebar/Sidebar';
import NavRouter from './Components/Router/NavRouter';

function App() {

  // console.log(FetchUsers());
  let resp: User[] = FetchUsers().then(res => resp = res);

  // console.log(resp[0]);s
  
  
  // resp?.map(u => console.log(u.name))
  // console.log(FetchEvents());
  
  return (
   <nav className='flex fixed bottom-0 top-0 bg-black/20 px-4 py-8'>
     <Sidebar/>
   </nav>
  );
}

export default App;
