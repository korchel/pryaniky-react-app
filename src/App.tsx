import React from 'react';
import logo from './logo.svg';
import './App.css';

import {
  BrowserRouter, Routes, Route, Navigate, Outlet,
} from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import routes from './routes';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path={routes.loginPath()} element={<LoginPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
