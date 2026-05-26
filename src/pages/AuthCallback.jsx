// src/pages/AuthCallback.jsx
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const AuthCallback = () => {
  const navigate = useNavigate();
  const { loginWithGoogleToken } = useAuth();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get('token');

    if (token) {
      loginWithGoogleToken(token)
        .then(() => {
          navigate('/generator');
        })
        .catch((error) => {
          console.error('Google auth failed:', error);
          navigate('/login?error=google_auth_failed');
        });
    } else {
      navigate('/login?error=google_auth_failed');
    }
  }, [navigate, loginWithGoogleToken]);

  return (
    <div className="flex items-center justify-center h-screen bg-[#f3f4f6]">
      <div className="flex flex-col items-center gap-3">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-BlueDark-950"></div>
        <p className="text-sm font-bold text-GrayBlue-500 uppercase tracking-widest">Autenticando...</p>
      </div>
    </div>
  );
};

export default AuthCallback;