
import { useEffect, useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Signup from "./components/Signup";
import Login from "./components/Login";
import Home from "./pages/Home";
import CustomerLayout from "./components/CustomerLayout";
import { VerifyMe, LogOut } from "../services/Authapi";

function AppRoutes() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // App start hone par VerifyMe call hoga
  useEffect(() => {
    const checkUser = async () => {
      try {
        setLoading(true);
        setError(null);

        const data = await VerifyMe();
        setUser(data.user);
      } catch (err) {
        setUser(null);

        if (err.response?.status !== 401) {
          setError(
            err.response?.data?.message ||
              "Unable to verify user. Please try again."
          );
        }
      } finally {
        setLoading(false);
      }
    };

    checkUser();
  }, []);

  // Logout API call
  const handleLogout = async () => {
    try {
      await LogOut();
    } finally {
      setUser(null);
    }
  };

  return (
    <Routes>
      <Route
        element={
          <CustomerLayout
            user={user}
            onLogout={handleLogout}
          />
        }
      >
        <Route
          path="/"
          element={<Navigate to="/signup" replace />}
        />

        <Route path="/signup" element={<Signup />} />

        <Route
          path="/login"
          element={<Login setUser={setUser} />}
        />

        <Route path="/Home" element={<Home />} />
      </Route>

      <Route
        path="*"
        element={<Navigate to="/login" replace />}
      />
    </Routes>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}

export default App;
