import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import LoginForm from '../components/auth/LoginForm';

interface LoginFormData {
  email: string;
  password: string;
  rememberMe?: boolean;
}

const LoginPage = () => {
  const [error, setError] = useState<string | undefined>();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  
  const handleLogin = async (data: LoginFormData) => {
    setIsLoading(true);
    setError(undefined);
    
    try {
      // This would be replaced with an actual API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Simulate a successful login
      // In a real app, you would save the token to local storage or context
      
      if (data.email === 'demo@example.com' && data.password === 'password123') {
        // Navigate to home page after successful login
        navigate('/');
      } else {
        // Simulate an error
        setError('Invalid email or password. Try using demo@example.com and password123');
      }
    } catch (err) {
      setError('An error occurred while signing in. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-primary-50 to-accent-50">
      <header className="bg-white py-4 px-8 shadow-sm">
        <div className="max-w-7xl mx-auto">
          <Link to="/" className="flex items-center gap-2">
            <span className="text-primary-600 font-display font-bold text-xl">LagoSpaces</span>
          </Link>
        </div>
      </header>
      
      <main className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 md:p-10">
          <LoginForm
            onSubmit={handleLogin}
            isLoading={isLoading}
            error={error}
          />
        </div>
      </main>
      
      <footer className="py-6 px-4 bg-white border-t border-secondary-100">
        <div className="max-w-7xl mx-auto text-center text-sm text-secondary-500">
          <p>© 2023 LagoSpaces. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default LoginPage; 