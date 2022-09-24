import React, { useContext, useEffect } from 'react';
import logo from './logo.svg';
// import { FetchEvents, FetchUsers } from './Resources/APIWrapper';
import { Commit, User } from './Resources/ResponseTypes';
import Sidebar from './Components/Sidebar';
import NavRouter from './Components/Router/NavRouter';
import { DataContext } from './Resources/DataContext';
// import { GetUserTotalCommits } from './Resources/UserResources';

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
  // const resp: User[] | undefined = FetchUsers();
  // resp?.map(u => console.log(u.state))
  // console.log(FetchEvents());

  // ctx.setVal('Hallo');
  
  return (
    <div className="flex flex-row">
      {/* <p>{ctx.val}</p> */}

      
      {/* <Sidebar/>
      <div className='bg-black/20'>
        <NavRouter/>
      </div> */}
    </div>
  );
}

export default App;
