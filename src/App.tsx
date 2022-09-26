import React from 'react';
import logo from './logo.svg';
import { FetchEvents, FetchUsers } from './Resources/APIWrapper';
import { User } from './Resources/ResponseTypes';
import Sidebar from './Components/Sidebar';
import NavRouter from './Components/Router/NavRouter';
import UserCard from './Components/UserCard';

function App() {

  // console.log(FetchUsers());
  const resp: User[] = FetchUsers();
  // resp?.map(u => console.log(u.state))
  // console.log(FetchEvents());
  
  return (
    <div className="flex flex-row gap-2">
      {resp?.map((u) => <UserCard key={u.id} user={u} />)}
      {/* <Sidebar/>
      <div className='bg-black/20'>
        <NavRouter/>
      </div> */}
    </div>
  );
}

export default App;
