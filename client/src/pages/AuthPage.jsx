import { useState , useEffect} from 'react';
import AuthForm from '../components/AuthForm';
import { useNavigate } from 'react-router-dom';
export default function AuthPage() {
  const [mode, setMode] = useState('login');
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      // ✅ already logged in → redirect to homepage
      navigate('/');
    }
  }, []);
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-green-100">
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 w-96">
        <h1 className="text-2xl font-bold mb-4 text-center">
          {mode === 'login' ? 'Login' : 'Sign Up'}
        </h1>
        <AuthForm mode={mode} />
        <p className="text-sm text-center mt-4">
          {mode === 'login' ? 'Don’t have an account?' : 'Already have one?'}{' '}
          <button
            className="text-blue-600 hover:underline"
            onClick={() => setMode(mode === 'login' ? 'signup' : 'login')}
          >
            {mode === 'login' ? 'Sign Up' : 'Login'}
          </button>
        </p>
      </div>
    </div>
  );
}
