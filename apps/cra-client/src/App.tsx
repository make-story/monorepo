import React, { Fragment, ReactElement } from 'react';
import { BrowserRouter, RouteObject, useRoutes, Outlet } from 'react-router-dom';

import logo from './logo.svg';
import './App.css';

const homeRoute: RouteObject = {
  path: '/home',
  element: <>HOME</>,
};

const privateRoute: RouteObject = {
  element: <Outlet />,
  //element: <>TEST</>,
  children: [homeRoute],
};

const rootRoute: RouteObject[] = [
  {
    path: '/',
    element: <Outlet />,
    //element: <>TEST</>,
    children: [privateRoute],
  },
];
function Rouuter() {
  const element = useRoutes(rootRoute);
  return element || <></>;
}

function App(): ReactElement {
  return (
    <>
      <BrowserRouter>
        <Rouuter />
      </BrowserRouter>
      <div className='App'>
        <header className='App-header'>
          <img src={logo} className='App-logo' alt='logo' />
          <p>
            Edit <code>src/App.tsx</code> and save to reload.
          </p>
          <a className='App-link' href='https://reactjs.org' target='_blank' rel='noopener noreferrer'>
            TEST Learn React!!!!
          </a>
        </header>
      </div>
    </>
  );
}

export default App;
