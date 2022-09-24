import React from 'react';
import logo from './logo.svg';
import './App.css';
import { FetchEvents, FetchUsers } from './Resources/ApiWrapper';
import { User } from './Resources/ResponseTypes';

function App() {

  // console.log(FetchUsers());
  // const resp: User[] | undefined = FetchUsers();
  // resp?.map(u => console.log(u.state))
  console.log(FetchEvents());
  
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
