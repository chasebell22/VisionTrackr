import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';

// Layout Components
import Layout from './components/layout/Layout';

// Auth Components
import Login from './components/auth/Login';
import Register from './components/auth/Register';

// Page Components
import Dashboard from './pages/Dashboard';
import ValuesPage from './pages/ValuesPage';
import MissionPurposePage from './pages/MissionPurposePage';
import VisionsPage from './pages/VisionsPage';
import GoalsPage from './pages/GoalsPage';
import DailyPlannerPage from './pages/DailyPlannerPage';

// Protected Route Component
const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return children;
};

function App() {
  return (
    <Routes>
      {/* Auth Routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Protected Routes */}
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Dashboard />} />
        <Route path="values" element={<ValuesPage />} />
        <Route path="mission-purpose" element={<MissionPurposePage />} />
        <Route path="visions" element={<VisionsPage />} />
        <Route path="goals" element={<GoalsPage />} />
        <Route path="daily-planner" element={<DailyPlannerPage />} />
      </Route>

      {/* Catch-all Route */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default App; 