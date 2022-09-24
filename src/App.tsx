import React, { useContext, useEffect } from 'react';
import logo from './logo.svg';
// import { FetchEvents, FetchUsers } from './Resources/APIWrapper';
import { User } from './Resources/ResponseTypes';
import Sidebar from './Components/Sidebar';
import NavRouter from './Components/Router/NavRouter';
import { DataContext } from './Resources/DataContext';

function App() {
  const ctx = useContext(DataContext);

  const setup = async () => {
    await ctx.fetchUsers();
  }


  useEffect(() => {  
    setup();
  }, []);


  // console.log(FetchUsers());
  // const resp: User[] | undefined = FetchUsers();
  // resp?.map(u => console.log(u.state))
  // console.log(FetchEvents());

  // ctx.setVal('Hallo');
  
  return (
    <div className="flex flex-row">
      {/* <p>{ctx.val}</p> */}
      <button onClick={() => console.log(ctx.usersData[2])}>click!</button>
      <button onClick={() => console.log(ctx.usersData[3])}>click!</button>
      <button onClick={() => console.log(ctx.usersData[4])}>click!</button>
      <button onClick={() => console.log(ctx.usersData[5])}>click!</button>
      <button onClick={() => console.log(ctx.usersData[6])}>click!</button>
      <button onClick={() => console.log(ctx.usersData[7])}>click!</button>
      
      {/* <Sidebar/>
      <div className='bg-black/20'>
        <NavRouter/>
      </div> */}
    </div>
  );
}

export default App;
