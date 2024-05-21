import React from 'react';
import { Provider } from 'react-redux';

import './App.css';
import store from './store';

import {
  BrowserRouter, Routes, Route, Navigate, Outlet,
} from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import ContentPage from './pages/ContentPage';
import SignupPage from './pages/SignupPage';
import routes from './routes';
import { AuthProvider, useAuth } from './context/AuthContext';

const LoggedInRoute = () => {
  const { userData } = useAuth();
  return (
    userData ? <Outlet /> : <Navigate to={routes.loginRoute()} />
  );
};

const LoggedOutRoute = () => {
  const { userData } = useAuth();
  return (
    !userData ? <Outlet /> : <Navigate to={routes.contentRoute()} />
  );
};


function App() {
  return (
    <Provider store={store}>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path={routes.contentRoute()} element={<LoggedInRoute />}>
              <Route path={routes.contentRoute()} element={<ContentPage />} />
            </Route>
            <Route path={routes.loginRoute()} element={<LoggedOutRoute />}>
              <Route path={routes.loginRoute()} element={<LoginPage />} />
            </Route>
            <Route path={routes.signupRoute()} element={<LoggedOutRoute />}>
              <Route path={routes.signupRoute()} element={<SignupPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </Provider>
  );
}

export default App;
