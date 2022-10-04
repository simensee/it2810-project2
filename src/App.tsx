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
  return (
    <>
    <NavRouter />
    </>
  );
}

export default App;
