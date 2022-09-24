import React from 'react';
import logo from './logo.svg';
import './App.css';
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
    <div className="App">
      <Sidebar/>
      <div className='content'>
        <NavRouter/>
      </div>
    </div>
  );
}

export default App;
