import React from "react";
import { Provider } from "react-redux";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Outlet,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import store from "./store";
import LoginPage from "./pages/LoginPage";
import ContentPage from "./pages/ContentPage";
import SignupPage from "./pages/SignupPage";
import routes from "./routes";
import { AuthProvider, useAuth } from "./context/AuthContext";
import Header from "./components/Header/Header";
import NotfoundPage from "./pages/NotFoundPage";
import { Container } from "@mui/material";

const LoggedInRoute = () => {
  const { userData } = useAuth();
  return userData ? <Outlet /> : <Navigate to={routes.loginRoute()} />;
};

const LoggedOutRoute = () => {
  const { userData } = useAuth();
  return !userData ? <Outlet /> : <Navigate to={routes.contentRoute()} />;
};

function App() {
  return (
    <Provider store={store}>
      <AuthProvider>
        <Container
          component="main"
          sx={{ height: "100vh", display: "flex", flexDirection: "column" }}
        >
          <Header />
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
              <Route path="*" element={<NotfoundPage />} />
            </Routes>
          </BrowserRouter>
          <ToastContainer />
        </Container>
      </AuthProvider>
    </Provider>
  );
}

export default App;
