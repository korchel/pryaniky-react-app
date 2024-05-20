import React from 'react';
import logo from './logo.svg';
import './App.css';

import {
  BrowserRouter, Routes, Route, Navigate, Outlet,
} from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import routes from './routes';
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <AuthProvider>
    <div>
      <BrowserRouter>
        <Routes>
          <Route path={routes.loginRoute()} element={<LoginPage />} />
        </Routes>
      </BrowserRouter>
      </div>
    </AuthProvider>
  );
}

export default App;
