import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import './App.css';

import { useState } from '@hookstate/core';
import { globalAuthToken } from './state';
import { clearToken, getLocalToken } from './services/config';

import DashboardPage from './pages/Dashboard';
import LoginPage from './pages/Login';
import MenuPage from './pages/Menu';

const App: React.FC = () => {
  const authToken = useState(globalAuthToken);
  return (
    <div className='App'>
      <Router>
        <Switch>
          <Route
            exact
            path='/'
            render={() => {
              if (authToken.value || getLocalToken()) {
                return <Redirect to='dashboard' />;
              }
              return <Redirect to='login' />;
            }}
          ></Route>
          <Route
            exact
            path='/logout'
            render={() => {
              authToken.set(null);
              clearToken();
              return <Redirect to='/login' />;
            }}
          ></Route>
          <Route exact path='/login' render={() => <LoginPage />} />
          <Route exact path='/dashboard' render={() => <DashboardPage />} />
          <Route exact path='/menu' render={() => <MenuPage />} />
        </Switch>
      </Router>
    </div>
  );
};

export default App;
