import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import Header from './components/common/Header';
import Sidebar from './components/common/Sidebar';
import Footer from './components/common/Footer';
import { SidebarProvider } from './contexts/SidebarContext';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import BookingsPage from './pages/BookingsPage';
import SpacesPage from './pages/SpacesPage';
import SpaceFormPage from './pages/SpaceFormPage';
import AdminPage from './pages/AdminPage';

function App() {
  return (
    <Router>
      <HelmetProvider>
        <SidebarProvider>
          <div className="flex flex-col min-h-screen bg-gray-50">
            <Header />
            <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 flex-grow">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/dashboard" element={<DashboardPage />} />
                <Route path="/bookings" element={<BookingsPage />} />
                <Route path="/spaces" element={<SpacesPage />} />
                <Route path="/spaces/new" element={<SpaceFormPage />} />
                <Route path="/spaces/edit/:spaceId" element={<SpaceFormPage />} />
                <Route path="/spaces/:spaceId" element={<SpacesPage />} />
                <Route path="/admin" element={<AdminPage />} />
              </Routes>
            </main>
            <Footer />
            <Sidebar />
          </div>
        </SidebarProvider>
      </HelmetProvider>
    </Router>
  );
}

export default App;
