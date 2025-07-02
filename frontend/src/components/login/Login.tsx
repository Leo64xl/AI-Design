import React, { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { LoginUser, reset } from '../../features/authSlice'
import eye from '../../assets/eye.svg'
import { RootState, AppDispatch } from '../../app/store'
import axios from 'axios'  
import './Login.css' 

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [localMessage, setLocalMessage] = useState('');
  const [localError, setLocalError] = useState('');  
  const [isLocalLoading, setIsLocalLoading] = useState(false);  

  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const emailInputRef = useRef<HTMLInputElement>(null);
  const { user, isError, isSuccess, isLoading, message } = useSelector((state: RootState) => state.auth);

  const CONVERSATION_ROUTE = '/conversation';

  useEffect(() => {
    const stateMessage = location.state?.message;
    const stateEmail = location.state?.email;
    
    if (stateMessage) {
      setLocalMessage(stateMessage);
      setTimeout(() => setLocalMessage(''), 5000);
    }
    
    if (stateEmail) {
      setEmail(stateEmail);
    }
  }, [location.state]);

  useEffect(() => {
    if (user || isSuccess) {
      navigate(CONVERSATION_ROUTE);
    }
    dispatch(reset());
  }, [user, isSuccess, navigate, dispatch]);

  useEffect(() => {
    if (emailInputRef.current) {
      emailInputRef.current.focus();
    }
  }, []);

  const handleAuth = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!email || !password) {
      setLocalError('Todos los campos son obligatorios');
      return;
    }
    
    setLocalMessage('');
    setLocalError('');
    setIsLocalLoading(true);
    
    try {
      
      const response = await axios.post('http://localhost:5000/login', {
        email: email,
        password: password
      });
      
      dispatch(LoginUser({ email, password }));
      
    } catch (error: any) {
      setIsLocalLoading(false);
      
      if (error.response?.status === 403) {
        const { action, verified, email: userEmail, msg } = error.response.data;
        
        if (action === 'resend_verification' && verified === 'expired') {
          setLocalMessage('Redirigiendo para generar nuevo enlace...');
          setTimeout(() => {
            navigate('/resend-verification', { 
              state: { 
                email: userEmail, 
                reason: 'expired_verification',
                source: 'login'
              }
            });
          }, 1500);
          return;
        }
        
        if (action === 'verify_email' && verified === 'pending') {
          setLocalMessage('Redirigiendo para verificar correo...');
          setTimeout(() => {
            navigate('/resend-verification', { 
              state: { 
                email: userEmail, 
                reason: 'pending_verification',
                source: 'login'
              }
            });
          }, 1500);
          return;
        }
        
        if (error.response.data.role === 'banned') {
          setLocalError('Tu cuenta ha sido baneada permanentemente.');
          return;
        }
        
        setLocalError(msg || 'Error de verificación');
        
      } else if (error.response?.status === 404) {
        
        setLocalError('Credenciales incorrectas');
        
      } else if (error.response?.status === 429) {
      
        setLocalError('Demasiados intentos de login. Intenta más tarde.');
        
      } else if (error.response?.status === 400) {
       
        setLocalError('Todos los campos son obligatorios');
        
      } else {
     
        setLocalError(error.response?.data?.msg || 'Error al iniciar sesión');
      }
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const isFormLoading = isLoading || isLocalLoading;
  
  const displayError = localError || (isError ? message : '');

  return (
    <div className="login-bg">
      <div className="login-container">
        <h1 className="login-title">Bienvenido</h1>
        <p className="login-subtitle">Inicia sesión para continuar</p>
        
        {localMessage && (
          <div className="success-message" style={{ marginBottom: '1rem' }}>
            {localMessage}
          </div>
        )}
        
        <form className="login-form" onSubmit={handleAuth}>
          <div className="input-group">
            <label htmlFor="email">Correo electrónico</label>
            <input
              ref={emailInputRef}
              type="email"
              id="email"
              name="email"           
              value={email}
              onChange={e => {
                setEmail(e.target.value);
                setLocalError(''); 
              }}
              placeholder='Ingresa tu correo'
              autoComplete="email"
              required              
            />
          </div>
          <div className="input-group">
            <label htmlFor="password">Contraseña</label>
            <div className="password-wrapper">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={password}
                onChange={e => {
                  setPassword(e.target.value);
                  setLocalError(''); 
                }}
                placeholder='Ingresa tu contraseña'
                autoComplete="current-password"
                required                
              />
              <img
                className="eye-icon"
                src={eye}
                alt="Mostrar/Ocultar contraseña"
                onClick={togglePasswordVisibility}
                tabIndex={0}
                style={{ cursor: 'pointer' }}
              />
            </div>
          </div>

          <div className="forgot-password-link">
            <Link to="/forgot-password" className="forgot-link">
              ¿Olvidaste tu contraseña?
            </Link>
          </div>
          
          {displayError && <p className="error-message">{displayError}</p>}
          
          <button type="submit" className="login-button" disabled={isFormLoading}>
            {isFormLoading ? 'Cargando...' : 'Iniciar sesión'}
          </button>
          <p className="register-link">
            ¿Aún no tienes cuenta?{' '}
            <Link to="/register">
              <span className="register-link-highlight">Crea una ahora</span>
            </Link>
          </p>
        </form>
      </div>
    </div>
  )
}

export default Login