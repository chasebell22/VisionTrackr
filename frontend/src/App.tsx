import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';

// Layout Components
import Layout from './components/layout/Layout';

// Auth Components
import Login from './components/auth/Login';
import Register from './components/auth/Register';

// Page Components
import HomePage from './pages/HomePage';
import Dashboard from './pages/Dashboard';
import ValuesPage from './pages/ValuesPage';
import MissionPurposePage from './pages/MissionPurposePage';
import VisionsPage from './pages/VisionsPage';
import GoalsPage from './pages/GoalsPage';
import DailyPlannerPage from './pages/DailyPlannerPage';
import AboutPage from './pages/AboutPage';
import PricingPage from './pages/PricingPage';
import ResourcesPage from './pages/ResourcesPage';

// Protected Route Component
const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }

  return children;
};

// Public only route - redirects to dashboard if already authenticated
const PublicOnlyRoute = ({ children }: { children: JSX.Element }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  if (isAuthenticated) {
    return <Navigate to="/dashboard" />;
  }

  return children;
};

function App() {
  return (
    <Routes>
      {/* Public Home Page */}
      <Route 
        path="/" 
        element={
          <PublicOnlyRoute>
            <HomePage />
          </PublicOnlyRoute>
        } 
      />

      {/* Public Information Pages */}
      <Route path="/about" element={<AboutPage />} />
      <Route path="/pricing" element={<PricingPage />} />
      <Route path="/resources" element={<ResourcesPage />} />

      {/* Auth Routes */}
      <Route 
        path="/login" 
        element={
          <PublicOnlyRoute>
            <Login />
          </PublicOnlyRoute>
        } 
      />
      <Route 
        path="/register" 
        element={
          <PublicOnlyRoute>
            <Register />
          </PublicOnlyRoute>
        } 
      />

      {/* Protected Routes */}
      <Route
        path="/dashboard"
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