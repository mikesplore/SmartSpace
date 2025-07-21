import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { SidebarProvider } from './contexts/SidebarContext';
import { AuthProvider } from './contexts/AuthContext';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import BookingsPage from './pages/BookingsPage';
import SpacesPage from './pages/SpacesPage';
import SpaceFormPage from './pages/SpaceFormPage';
import AdminPage from './pages/AdminPage';
import MainLayout from './layouts/MainLayout';
import AuthLayout from './layouts/AuthLayout';
import ProtectedRoute from './components/auth/ProtectedRoute';
import { ToastProvider } from './components/toast/ToastProvider';

function App() {
  return (
    <ToastProvider>
      <Router>
        <HelmetProvider>
          <AuthProvider>
            <SidebarProvider>
              <Routes>
                {/* Auth Routes - No header, footer, or sidebar */}
                <Route element={<AuthLayout />}>
                  <Route path="/login" element={<LoginPage />} />
                  <Route path="/register" element={<RegisterPage />} />
                </Route>
                
                {/* Main Routes - With header, footer, and sidebar */}
                <Route element={<MainLayout />}>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/dashboard" element={
                    <ProtectedRoute>
                      <DashboardPage />
                    </ProtectedRoute>
                  } />
                  <Route path="/bookings" element={
                    <ProtectedRoute>
                      <BookingsPage />
                    </ProtectedRoute>
                  } />
                  <Route path="/spaces" element={<SpacesPage />} />
                  <Route path="/spaces/new" element={
                    <ProtectedRoute>
                      <SpaceFormPage />
                    </ProtectedRoute>
                  } />
                  <Route path="/spaces/edit/:spaceId" element={
                    <ProtectedRoute>
                      <SpaceFormPage />
                    </ProtectedRoute>
                  } />
                  <Route path="/spaces/:spaceId" element={<SpacesPage />} />
                  <Route path="/admin" element={
                    <ProtectedRoute adminOnly>
                      <AdminPage />
                    </ProtectedRoute>
                  } />
                </Route>
              </Routes>
            </SidebarProvider>
          </AuthProvider>
        </HelmetProvider>
      </Router>
    </ToastProvider>
  );
}

export default App;
