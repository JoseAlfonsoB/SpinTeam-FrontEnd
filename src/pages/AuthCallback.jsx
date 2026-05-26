// src/pages/AuthCallback.jsx
import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const AuthCallback = () => {
  const navigate = useNavigate();
  const { loginWithGoogleToken } = useAuth();
  const hasRun = useRef(false); // Evita doble ejecución por React StrictMode

  useEffect(() => {
    if (hasRun.current) return;
    hasRun.current = true;

    const params = new URLSearchParams(window.location.search);
    const token = params.get('token');

    if (token) {
      // Leemos el rol ANTES de cualquier operación async para que no se pierda
      const selectedRole = localStorage.getItem('selected_role');
      localStorage.removeItem('selected_role');

      loginWithGoogleToken(token)
        .then((loggedUser) => {
          // Prioridad: 1) rol seleccionado en la página de registro, 2) rol guardado en la BD
          const role = selectedRole || (loggedUser && loggedUser.role);

          if (role === 'docente') {
            navigate('/generator');
          } else if (role === 'alumno') {
            navigate('/unidas');
          } else {
            navigate('/register-role');
          }
        })
        .catch((error) => {
          console.error('Google auth failed:', error);
          navigate('/login?error=google_auth_failed');
        });
    } else {
      localStorage.removeItem('selected_role');
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