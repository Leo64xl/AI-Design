import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import './ForgotPassword.css'

interface ForgotPasswordResponse {
  success: boolean;
  message: string;
  action: string;
}

const ForgotPassword = () => {
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  
  const navigate = useNavigate()

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!email) {
      setMessage('Por favor, ingresa tu correo electrónico.')
      setIsSuccess(false)
      return
    }
    
    setMessage('')
    setIsLoading(true)
    setIsSuccess(false)
    
    try {
      const response = await axios.post<ForgotPasswordResponse>('http://localhost:5000/forgot-password', {
        email: email.toLowerCase()
      })
      
      setMessage(response.data.message)
      setIsSuccess(response.data.success)
      
      if (response.data.success) {
        setTimeout(() => {
          navigate('/', { 
            state: { 
              email: email,
              message: 'Si el correo existe, recibirás un enlace de recuperación.'
            }
          })
        }, 5000)
      }
      
    } catch (error: any) {
      console.log('Error en forgot password:', error.response);
      
      if (error.response?.status === 429) {
        setMessage('Demasiados intentos. Espera 15 minutos antes de intentar nuevamente.')
      } else {
        setMessage('Error interno del servidor. Intenta más tarde.')
      }
      setIsSuccess(false)
      
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="forgot-password-bg">
      <div className="forgot-password-container">
        <div className="forgot-icon">🔐</div>
        <h1 className="forgot-title">¿Olvidaste tu contraseña?</h1>
        <p className="forgot-subtitle">
          No te preocupes, te ayudaremos a recuperarla. Ingresa tu correo electrónico y te enviaremos un enlace para restablecerla.
        </p>
        
        <form className="forgot-form" onSubmit={handleForgotPassword}>
          <div className="input-group">
            <label htmlFor="email">Correo electrónico</label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={e => {
                setEmail(e.target.value)
                if (message && !isSuccess) {
                  setMessage('')
                }
              }}
              placeholder="Ingresa tu correo"
              required
              autoComplete="email"
              autoFocus
              disabled={isLoading}
            />
          </div>

          {message && (
            <div className={`message ${isSuccess ? 'success' : 'error'}`}>
              <p className="message-text">{message}</p>
              {isSuccess && (
                <div className="success-details">
                  <p>📧 Revisa tu bandeja de entrada y spam</p>
                  <p>⏰ El enlace es válido por 15 minutos</p>
                  <p>🔄 Redirigiendo al login en 5 segundos...</p>
                </div>
              )}
            </div>
          )}

          <button 
            type="submit" 
            className="forgot-button" 
            disabled={isLoading || isSuccess}
          >
            {isLoading ? (
              <>
                <span className="spinner"></span>
                Enviando...
              </>
            ) : isSuccess ? (
              '✅ Enlace Enviado'
            ) : (
              'Enviar enlace de recuperación'
            )}
          </button>

          <div className="forgot-actions">
            <Link to="/" className="back-login">
              ← Volver al Login
            </Link>
            <Link to="/register" className="go-register">
              Crear cuenta nueva →
            </Link>
          </div>
        </form>

        <div className="help-section">
          <details className="help-details">
            <summary className="help-summary">¿Necesitas ayuda?</summary>
            <div className="help-content">
              <ul className="help-list">
                <li>📧 Revisa tu carpeta de spam o correo no deseado</li>
                <li>⏰ El enlace de recuperación expira en 15 minutos</li>
                <li>🔐 Solo puedes tener un enlace activo a la vez</li>
                <li>📞 Si sigues teniendo problemas, contacta soporte: 
                  <a href="mailto:soporte-ai-design@gmail.com" className="contact-email">
                    soporte-ai-design@gmail.com
                  </a>
                </li>
              </ul>
            </div>
          </details>
        </div>
      </div>
    </div>
  )
}

export default ForgotPassword