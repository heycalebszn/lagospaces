import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { MainLayout } from './components/layout';
import LoadingScreen from './components/LoadingScreen';
import HomePage from './pages/HomePage';
import FeedPage from './pages/FeedPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import PropertyListingPage from './pages/PropertyListingPage';
import ProfilePage from './pages/ProfilePage';
import SearchPage from './pages/SearchPage';
import SavedPropertiesPage from './pages/SavedPropertiesPage';
import PostPropertyPage from './pages/PostPropertyPage';
import SettingsPage from './pages/SettingsPage';
import ComingSoonPage from './pages/ComingSoonPage';
import MessagesPage from './pages/MessagesPage';
import NotificationsPage from './pages/NotificationsPage';
import { AuthProvider } from './context/AuthContext';
import './App.css';

// Authentication result pages
const SignupSuccessPage = () => (
  <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[rgb(var(--color-primary-50))] to-[rgb(var(--color-accent-50))] p-6">
    <div className="bg-white rounded-2xl shadow-xl p-8 md:p-10 max-w-md w-full text-center">
      <div className="w-16 h-16 bg-[rgb(var(--color-success))]/20 rounded-full flex items-center justify-center mx-auto mb-4">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 text-[rgb(var(--color-success))]">
          <path fillRule="evenodd" d="M19.916 4.626a.75.75 0 01.208 1.04l-9 13.5a.75.75 0 01-1.154.114l-6-6a.75.75 0 011.06-1.06l5.353 5.353 8.493-12.739a.75.75 0 011.04-.208z" clipRule="evenodd" />
        </svg>
      </div>
      <h1 className="text-2xl font-display font-bold text-[rgb(var(--color-secondary-900))] mb-2">Account Created!</h1>
      <p className="text-[rgb(var(--color-secondary-600))] mb-6">Your account has been successfully created. You can now sign in.</p>
      <a href="/login" className="block w-full py-3 px-4 bg-[rgb(var(--color-primary-600))] hover:bg-[rgb(var(--color-primary-700))] text-white font-medium rounded-xl transition-colors">Go to Login</a>
    </div>
  </div>
);

const PostSuccessPage = () => (
  <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[rgb(var(--color-primary-50))] to-[rgb(var(--color-accent-50))] p-6">
    <div className="bg-white rounded-2xl shadow-xl p-8 md:p-10 max-w-md w-full text-center">
      <div className="w-16 h-16 bg-[rgb(var(--color-success))]/20 rounded-full flex items-center justify-center mx-auto mb-4">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 text-[rgb(var(--color-success))]">
          <path fillRule="evenodd" d="M19.916 4.626a.75.75 0 01.208 1.04l-9 13.5a.75.75 0 01-1.154.114l-6-6a.75.75 0 011.06-1.06l5.353 5.353 8.493-12.739a.75.75 0 011.04-.208z" clipRule="evenodd" />
        </svg>
      </div>
      <h1 className="text-2xl font-display font-bold text-[rgb(var(--color-secondary-900))] mb-2">Property Listed!</h1>
      <p className="text-[rgb(var(--color-secondary-600))] mb-6">Your property has been successfully listed. It will be available after review.</p>
      <a href="/profile" className="block w-full py-3 px-4 bg-[rgb(var(--color-primary-600))] hover:bg-[rgb(var(--color-primary-700))] text-white font-medium rounded-xl transition-colors">Go to Profile</a>
    </div>
  </div>
);

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Initial loading screen */}
          <Route path="/" element={<LoadingScreen />} />
          
          {/* Auth routes */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/signup-success" element={<SignupSuccessPage />} />
          <Route path="/forgot-password" element={<ComingSoonPage />} />
          <Route path="/post-success" element={<PostSuccessPage />} />
          
          {/* Main app routes */}
          <Route path="/" element={<MainLayout />}>
            <Route path="home" element={<HomePage />} />
            <Route path="feed" element={<FeedPage />} />
            <Route path="property/:id" element={<PropertyListingPage />} />
            <Route path="profile" element={<ProfilePage />} />
            <Route path="profile/:id" element={<ProfilePage />} />
            <Route path="search" element={<SearchPage />} />
            <Route path="saved" element={<SavedPropertiesPage />} />
            <Route path="post" element={<PostPropertyPage />} />
            <Route path="settings" element={<SettingsPage />} />
            
            {/* Coming Soon pages */}
            <Route path="messages" element={<MessagesPage />} />
            <Route path="messages/:id" element={<ComingSoonPage />} />
            <Route path="notifications" element={<NotificationsPage />} />
            <Route path="help" element={<ComingSoonPage />} />
            <Route path="blog" element={<ComingSoonPage />} />
            <Route path="guide" element={<ComingSoonPage />} />
            <Route path="verification" element={<ComingSoonPage />} />
            <Route path="terms" element={<ComingSoonPage />} />
            <Route path="privacy" element={<ComingSoonPage />} />
            <Route path="cookies" element={<ComingSoonPage />} />
            <Route path="refunds" element={<ComingSoonPage />} />
            
            {/* Catch all route */}
            <Route path="*" element={<ComingSoonPage />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;