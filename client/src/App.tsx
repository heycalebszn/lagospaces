import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { MainLayout } from './components/layout';
import HomePage from './pages/HomePage';
import FeedPage from './pages/FeedPage';
import MessagesPage from './pages/MessagesPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/signup-success" element={<div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-primary-50 to-accent-50 p-6">
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-10 max-w-md w-full text-center">
            <div className="w-16 h-16 bg-success/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 text-success">
                <path fillRule="evenodd" d="M19.916 4.626a.75.75 0 01.208 1.04l-9 13.5a.75.75 0 01-1.154.114l-6-6a.75.75 0 011.06-1.06l5.353 5.353 8.493-12.739a.75.75 0 011.04-.208z" clipRule="evenodd" />
              </svg>
            </div>
            <h1 className="text-2xl font-display font-bold text-secondary-900 mb-2">Account Created!</h1>
            <p className="text-secondary-600 mb-6">Your account has been successfully created. You can now sign in.</p>
            <a href="/login" className="btn-primary block w-full py-3">Go to Login</a>
          </div>
        </div>} />
        <Route path="/forgot-password" element={<div className="py-20 text-center text-secondary-500">Password reset page coming soon!</div>} />
        
        <Route path="/" element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route path="feed" element={<FeedPage />} />
          <Route path="messages" element={<MessagesPage />} />
          <Route path="saved" element={<div className="py-20 text-center text-secondary-500">Saved properties page coming soon!</div>} />
          <Route path="post" element={<div className="py-20 text-center text-secondary-500">Post property page coming soon!</div>} />
          <Route path="profile" element={<div className="py-20 text-center text-secondary-500">Profile page coming soon!</div>} />
          <Route path="settings" element={<div className="py-20 text-center text-secondary-500">Settings page coming soon!</div>} />
          <Route path="*" element={<div className="py-20 text-center text-secondary-500">Page not found</div>} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;