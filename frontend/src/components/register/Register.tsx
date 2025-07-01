import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import eye from '../../assets/eye.svg'
import axios from 'axios'
import './Register.css'

const Register = () => {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  
  const navigate = useNavigate()

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword)
  }

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden')
      return
    }
    
    if (password.length < 3 || password.length > 16) {
      setError('La contraseña debe tener entre 3 y 16 caracteres')
      return
    }
    
    setError('')
    setIsLoading(true)
    
    try {
      await axios.post('http://localhost:5000/users', {
        username,
        email,
        password,
        confPassword: confirmPassword,
        role: 'user'
      })
      
      setError('¡Registro exitoso! Revisa tu correo para verificar tu cuenta antes de iniciar sesión.')
      
      setTimeout(() => {
        navigate('/')
      }, 3000)
      
    } catch (error: any) {
      setError(error.response?.data?.msg || 'Error al registrar el usuario')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="register-bg">
      <div className="register-container">
        <h1 className="register-title">Crear cuenta</h1>
        <p className="register-subtitle">Únete a nuestra plataforma</p>
        
        <form 
          className="register-form" 
          onSubmit={handleRegister}
          autoComplete="on"  
        >
          <div className="input-group">
            <label htmlFor="username">Nombre de usuario</label>
            <input
              type="text"
              id="username"
              name="username"       
              value={username}
              onChange={e => setUsername(e.target.value)}
              placeholder="Ingresa tu nombre de usuario"
              required
              minLength={3}
              autoComplete="username"
            />
          </div>

          <div className="input-group">
            <label htmlFor="email">Correo electrónico</label>
            <input
              type="email"
              id="email"
              name="email"          
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="Ingresa tu correo"
              required
              autoComplete="email"
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
                onChange={e => setPassword(e.target.value)}
                placeholder="Ingresa tu contraseña"
                required
                minLength={3}    
                autoComplete="new-password"
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

          <div className="input-group">
            <label htmlFor="confirmPassword">Confirmar contraseña</label>
            <div className="password-wrapper">
              <input
                type={showConfirmPassword ? "text" : "password"}
                id="confirmPassword"
                name="confirmPassword"  
                value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)}
                placeholder="Confirma tu contraseña"
                required
                minLength={3}          
                autoComplete="new-password"
              />
              <img
                className="eye-icon"
                src={eye}
                alt="Mostrar/Ocultar contraseña"
                onClick={toggleConfirmPasswordVisibility}
                tabIndex={0}
                style={{ cursor: 'pointer' }}
              />
            </div>
          </div>

          {error && (
            <p className={error.includes('exitoso') ? "success-message" : "error-message"}>
              {error}
            </p>
          )}

          <button type="submit" className="register-button" disabled={isLoading}>
            {isLoading ? 'Registrando...' : 'Crear cuenta'}
          </button>

          <p className="login-link">
            ¿Ya tienes cuenta?{' '}
            <Link to="/">
              <span className="login-link-highlight">Inicia sesión</span>
            </Link>
          </p>
        </form>
      </div>
    </div>
  )
}

export default Register