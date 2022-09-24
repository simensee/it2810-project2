import React from 'react';
import logo from './logo.svg';
import { FetchEvents, FetchUsers } from './Resources/APIWrapper';
import { User } from './Resources/ResponseTypes';
import Sidebar from './Components/Sidebar';
import NavRouter from './Components/Router/NavRouter';

function App() {

  // console.log(FetchUsers());
  // const resp: User[] | undefined = FetchUsers();
  // resp?.map(u => console.log(u.state))
  // console.log(FetchEvents());
  
  return (
    <div className="flex flex-row">
      <Sidebar/>
      <div className='bg-black/20'>
        <NavRouter/>
      </div>
    </div>
  );
}

export default App;
