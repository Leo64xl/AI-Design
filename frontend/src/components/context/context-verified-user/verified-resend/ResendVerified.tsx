import React, { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import axios from 'axios'  
import './ResendVerified.css'

interface ResendSuccessResponse {
  msg: string;
  email?: string;
  action?: string;
}

interface ResendErrorResponse {
  msg: string;
  action?: string;
  verified?: boolean | string;
}

const ResendVerified = () => {
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [isAlreadyVerified, setIsAlreadyVerified] = useState(false)
  
  const navigate = useNavigate()
  const location = useLocation()
  
  React.useEffect(() => {
    const emailFromState = location.state?.email
    const reason = location.state?.reason
    const source = location.state?.source

    if (emailFromState) {
      setEmail(emailFromState)
    }

    if (reason === 'expired_from_email' && source === 'error_page') {
      setMessage('Tu enlace de verificación ha expirado. Por favor, ingresa tu correo electrónico para generar uno nuevo.')
    } else if (reason === 'expired_verification' && source === 'login') {
      
      setMessage('Tu enlace anterior expiró. Genera uno nuevo para poder iniciar sesión.')
    } else if (reason === 'pending_verification' && source === 'login') {
 
      setMessage('Debes verificar tu correo antes de iniciar sesión. Genera un nuevo enlace si no lo recibiste.')
    }
  }, [location.state])

  const handleResendVerification = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!email) {
      setMessage('Por favor, ingresa tu correo electrónico.')
      setIsSuccess(false)
      setIsAlreadyVerified(false)
      return
    }
    
    setMessage('')
    setIsLoading(true)
    setIsSuccess(false)
    setIsAlreadyVerified(false)
    
    try {
    
      const response = await axios.post<ResendSuccessResponse>('http://localhost:5000/resend-verification', {
        email: email.toLowerCase()
      })
      
      setMessage(response.data.msg)
      setIsSuccess(true)
      
      setTimeout(() => {
        navigate('/', { 
          state: { 
            email: email 
          }
        })
      }, 5000)
      
    } catch (error: any) {
      console.log('Error en resend:', error.response);
      
      const errorResponse = error.response?.data as ResendErrorResponse
      
      if (error.response?.status === 400 && 
          (errorResponse?.action === 'login' || 
           errorResponse?.verified === true ||
           errorResponse?.msg?.includes('ya está verificada'))) {
        
        setMessage('¡Tu cuenta ya está verificada! Puedes iniciar sesión normalmente.')
        setIsAlreadyVerified(true)
        setIsSuccess(false)
        
      } 
      
      else if (error.response?.status === 404 && 
               errorResponse?.action === 'check_email_or_register') {
        
        setMessage('No se encontró una cuenta con este correo. Verifica el email o regístrate.')
        setIsSuccess(false)
        setIsAlreadyVerified(false)
        
      } 
      
      else if (error.response?.status === 429) {
        
        setMessage('Demasiados intentos de reenvío. Espera unos minutos antes de intentar nuevamente.')
        setIsSuccess(false)
        setIsAlreadyVerified(false)
        
      }
      
      else if (error.response?.status === 400 && 
               errorResponse?.action === 'provide_email') {
        
        setMessage('El email es obligatorio.')
        setIsSuccess(false)
        setIsAlreadyVerified(false)
        
      }
      
      else if (error.response?.status === 400 && 
               errorResponse?.action === 'contact_support') {
        
        setMessage('Tu cuenta tiene un estado inválido. Contacta al soporte técnico.')
        setIsSuccess(false)
        setIsAlreadyVerified(false)
        
      }
      
      else if (error.response?.status === 500) {
        
        setMessage('Error del servidor. Intenta nuevamente en unos momentos.')
        setIsSuccess(false)
        setIsAlreadyVerified(false)
        
      }
     
      else {
        
        setMessage(errorResponse?.msg || 'Error al enviar verificación. Intenta nuevamente.')
        setIsSuccess(false)
        setIsAlreadyVerified(false)
      }
      
    } finally {
      setIsLoading(false)
    }
  }

  const handleTryAnotherEmail = () => {
    setEmail('')
    setMessage('')
    setIsAlreadyVerified(false)
    setIsSuccess(false)
  }

  const getSubtitle = () => {
    const reason = location.state?.reason
    const source = location.state?.source

    if (reason === 'expired_from_email' && source === 'error_page') {
      return 'Tu enlace del email expiró. Genera uno nuevo aquí.'
    } else if (reason === 'expired_verification' && source === 'login') {
      return 'Tu enlace anterior expiró. Genera uno nuevo para poder iniciar sesión.'
    } else if (reason === 'pending_verification' && source === 'login') {
      return 'Verifica tu correo para completar el registro e iniciar sesión.'
    } else {
      return 'Ingresa tu email para generar un nuevo enlace de verificación.'
    }
  }

  return (
    <div className="resend-verification-bg">
      <div className="resend-verification-container">
        <div className="resend-icon">📧</div>
        <h1 className="resend-title">Generar Nueva Verificación</h1>
        <p className="resend-subtitle">
          {getSubtitle()}
        </p>
        
        <form 
          className="resend-form" 
          onSubmit={handleResendVerification}
        >
          <div className="input-group">
            <label htmlFor="email">Correo electrónico</label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={e => {
                setEmail(e.target.value)
                
                if (message && !isSuccess && !isAlreadyVerified) {
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
            <div className={`message-container ${
              isSuccess ? "success-message" : 
              isAlreadyVerified ? "verified-message" :
              "error-message"
            }`}>
              <p className="message-text">{message}</p>
              
              {isAlreadyVerified && (
                <div className="message-actions">
                  <Link to="/" className="action-btn primary">
                    🔑 Ir al Login
                  </Link>
                  <button 
                    type="button"
                    onClick={handleTryAnotherEmail}
                    className="action-btn secondary"
                  >
                    📧 Probar otro correo
                  </button>
                </div>
              )}
              
              {message.includes('No se encontró una cuenta') && (
                <div className="message-actions">
                  <Link to="/register" className="action-btn primary">
                    ➕ Crear cuenta nueva
                  </Link>
                  <button 
                    type="button"
                    onClick={handleTryAnotherEmail}
                    className="action-btn secondary"
                  >
                    🔄 Intentar otro email
                  </button>
                </div>
              )}
            </div>
          )}

          <button 
            type="submit" 
            className="resend-button" 
            disabled={isLoading || isSuccess || isAlreadyVerified}
          >
            {isLoading ? (
              <>
                <span className="spinner"></span>
                Enviando...
              </>
            ) : isSuccess ? (
              '✅ Enlace Enviado'
            ) : isAlreadyVerified ? (
              '✅ Cuenta Verificada'
            ) : (
              'Generar Nuevo Enlace'
            )}
          </button>

          <div className="resend-actions">
            <Link to="/" className="back-login">
              ← Volver al Login
            </Link>
            <Link to="/register" className="go-register">
              Crear cuenta nueva →
            </Link>
          </div>
        </form>

        {isSuccess && (
          <div className="success-notice">
            <div className="success-icon">✅</div>
            <p className="success-text">
              <strong>¡Enlace enviado exitosamente!</strong>
            </p>
            <div className="success-details">
              <p>📧 Revisa tu correo: <strong>{email}</strong></p>
              <p>⏰ El enlace es válido por 10 minutos</p>
              <p>🔄 Serás redirigido al login en 5 segundos...</p>
            </div>
            
            <div className="success-actions">
              <Link to="/" className="success-btn">
                Ir al Login ahora
              </Link>
            </div>
          </div>
        )}

        {isAlreadyVerified && (
          <div className="verified-notice">
            <div className="verified-icon">🎉</div>
            <p className="verified-text">
              <strong>¡Tu cuenta ya está lista!</strong>
            </p>
            <p className="verified-subtext">
              No necesitas verificar nuevamente tu correo.
            </p>
            <div className="verified-actions">
              <Link to="/" className="login-now-btn">
                🔑 Iniciar Sesión Ahora
              </Link>
              <button 
                onClick={handleTryAnotherEmail}
                className="try-another-btn"
              >
                📧 Probar otro correo
              </button>
            </div>
          </div>
        )}

        <div className="help-section">
          <details className="help-details">
            <summary className="help-summary">¿Necesitas ayuda?</summary>
            <div className="help-content">
              <ul className="help-list">
                <li>📧 Revisa tu carpeta de spam o correo no deseado</li>
                <li>⏰ El enlace de verificación expira en 10 minutos</li>
                <li>🔄 Puedes generar un nuevo enlace cuando necesites</li>
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

export default ResendVerified