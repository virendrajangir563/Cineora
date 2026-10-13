
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Signup from "./components/Signup";
import Login from "./components/Login";
import { AuthProvider, useAuth } from "./context/AuthContext";

// Protected Route
function ProtectedRoute({ children }) {
  const { user, loading, error } = useAuth();

  if (loading) {
    return <p>Checking login status...</p>;
  }

  if (error) {
    return (
      <div>
        <p>{error}</p>
        <button onClick={() => window.location.reload()}>
          Try Again
        </button>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

// Temporary Dashboard
function Dashboard() {
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
    } finally {
      // Logout ke baad login page par jao
      window.location.href = "/login";
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 p-8 text-white">
      <h1 className="mb-4 text-3xl font-bold">
        Welcome to Cineora!
      </h1>

      <p>Name: {user?.name}</p>
      <p>Email: {user?.email}</p>
      <p>Role: {user?.role}</p>

      <button
        onClick={handleLogout}
        className="mt-6 rounded bg-red-600 px-5 py-2 hover:bg-red-700"
      >
        Logout
      </button>
    </div>
  );
}

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/signup" replace />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
