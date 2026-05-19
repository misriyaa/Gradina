import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Eye, EyeOff } from 'lucide-react';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await login(username, password);
      navigate('/');
    } catch (err) {
      if (!err.response) {
        setError('Cannot connect to server. Please check your network connection or the backend deployment.');
      } else if (err.response.status === 401) {
        setError('Invalid username or password.');
      } else {
        setError(`Server error (${err.response.status}). Please try again.`);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row font-sans antialiased bg-[#002042] md:bg-white">

      {/* Desktop Column: Branding Panel (Hidden on mobile, white on desktop) */}
      <div className="hidden md:flex md:w-1/2 bg-white text-[#002042] flex-col items-center justify-center p-12 text-center border-r border-gray-100">
        <div className="max-w-md space-y-6">

          {/* Logo sits clean on the desktop white background */}
          <div className="flex justify-center">
            <img
              src={new URL('../assets/logo.jpeg', import.meta.url).href}
              alt="Gradina Logo"
              className="h-28 w-auto object-contain"
            />
          </div>

          <div className="space-y-3">
            <h1 className="text-4xl font-bold tracking-tight text-[#002042]">Welcome Back</h1>
            <p className="text-gray-500 text-lg leading-relaxed">
              Sign in to access your dashboard and manage everything in one place.
            </p>
          </div>
        </div>
      </div>

      {/* Right/Main Column: Sign In Form (Deep Navy Blue background across all screen sizes) */}
      <div className="flex-1 flex items-center justify-center p-6 md:p-12 text-white">
        <div className="w-full max-w-md space-y-8">

          {/* Mobile Logo Header (Visible only on mobile screen sizes) */}
          <div className="flex flex-col items-center md:hidden mb-2">
            <img
              src={new URL('../assets/logo.jpeg', import.meta.url).href}
              alt="Gradina Logo"
              className="h-24 w-auto object-contain mix-blend-multiply multiply-dark-fix"
              style={{ filter: "brightness(1.1) contrast(1.1)" }}
            />
          </div>

          {/* Form Header */}
          <div className="space-y-2 text-left">
            <h2 className="text-3xl font-bold tracking-tight text-white">Sign In</h2>
            <p className="text-sm text-gray-300">Enter your credentials to continue</p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-5">

            {/* Username/Email Input */}
            <div className="space-y-1.5">
              <Input
                type="text"
                value={username}
                onChange={e => setUsername(e.target.value)}
                placeholder="Username or Email"
                required
                className="w-full px-4 py-3 h-12 bg-white/10 border border-white/20 text-white placeholder-gray-400 rounded-lg focus:ring-2 focus:ring-white focus:border-white focus:bg-white focus:text-[#002042] transition"
              />
            </div>

            {/* Password Input with Visibility Eye Icon */}
            <div className="space-y-1.5 relative">
              <Input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="Password"
                required
                className="w-full px-4 py-3 h-12 pr-10 bg-white/10 border border-white/20 text-white placeholder-gray-400 rounded-lg focus:ring-2 focus:ring-white focus:border-white focus:bg-white focus:text-[#002042] transition"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3.5 text-gray-400 hover:text-white transition focus:outline-none"
              >
                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>

            {/* Error Message Box */}
            {error && (
              <div className="text-sm text-red-200 bg-red-900/50 border border-red-500 rounded-lg px-4 py-3">
                {error}
              </div>
            )}

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={loading}
              className="w-full h-12 bg-white text-[#002042] font-semibold rounded-lg shadow-sm hover:bg-[#FF0000] hover:text-white transition-colors duration-200"
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </Button>
          </form>

          {/* Registration Link */}
          <p className="text-center text-sm text-gray-300 pt-2">
            Don't have an account?{' '}
            <Link to="/register" className="text-white font-semibold hover:underline">
              Register
            </Link>
          </p>

        </div>
      </div>

    </div>
  );
}