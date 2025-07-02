import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import './ResetPasswordSuccess.css'

const ResetPasswordSuccess = () => {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const [countdown, setCountdown] = useState(5)
  const [isAutoRedirect, setIsAutoRedirect] = useState(true)
  
  // Obtener parámetros opcionales de la URL
  const message = searchParams.get('message') || ''
  const email = searchParams.get('email') || ''
  
  useEffect(() => {
    // Auto-redirect countdown
    if (isAutoRedirect && countdown > 0) {
      const timer = setTimeout(() => {
        setCountdown(countdown - 1)
      }, 1000)
      
      return () => clearTimeout(timer)
    } else if (isAutoRedirect && countdown === 0) {
      navigate('/')
    }
  }, [countdown, isAutoRedirect, navigate])

  const handleGoToLogin = () => {
    navigate('/', { 
      state: { 
        message: 'Contraseña actualizada exitosamente. Puedes iniciar sesión con tu nueva contraseña.',
        email: email
      }
    })
  }

  const handleStopAutoRedirect = () => {
    setIsAutoRedirect(false)
    setCountdown(0)
  }

  const handleTryLogin = () => {
    navigate('/', { 
      state: { 
        email: email,
        message: 'Inicia sesión con tu nueva contraseña'
      }
    })
  }

  return (
    <div className="reset-success-bg">
      <div className="reset-success-container">
        
        {/* Icono de éxito animado */}
        <div className="success-icon-wrapper">
          <div className="success-icon">✅</div>
          <div className="success-checkmark">
            <div className="check-circle">
              <div className="check-mark"></div>
            </div>
          </div>
        </div>

        {/* Título principal */}
        <h1 className="success-title">¡Contraseña Actualizada!</h1>
        
        {/* Mensaje principal */}
        <p className="success-message">
          {message || 'Tu contraseña ha sido cambiada exitosamente. Ahora puedes iniciar sesión con tu nueva contraseña.'}
        </p>

        {/* Información de éxito */}
        <div className="success-info">
          <div className="info-item">
            <span className="info-icon">🔐</span>
            <span className="info-text">Contraseña actualizada correctamente</span>
          </div>
          <div className="info-item">
            <span className="info-icon">✅</span>
            <span className="info-text">Tu cuenta está segura y protegida</span>
          </div>
          {email && (
            <div className="info-item">
              <span className="info-icon">📧</span>
              <span className="info-text">Confirmación enviada a: {email}</span>
            </div>
          )}
        </div>

        {/* Acciones principales */}
        <div className="success-actions">
          <button 
            onClick={handleGoToLogin}
            className="success-btn primary"
          >
            🔑 Iniciar Sesión Ahora
          </button>
          
          <Link to="/forgot-password" className="success-btn secondary">
            🔄 Cambiar Otra Contraseña
          </Link>
        </div>

        {/* Auto-redirect info */}
        {isAutoRedirect && countdown > 0 && (
          <div className="auto-redirect-info">
            <p className="redirect-text">
              🔄 Redirigiendo al login automáticamente en {countdown} segundos...
            </p>
            <button 
              onClick={handleStopAutoRedirect}
              className="stop-redirect-btn"
            >
              Cancelar redirección
            </button>
          </div>
        )}

        {/* Información adicional */}
        <div className="additional-info">
          <h3>🛡️ Información de seguridad:</h3>
          <ul className="security-tips">
            <li>Tu contraseña anterior ya no es válida</li>
            <li>Se ha enviado una notificación a tu correo</li>
            <li>Mantén tu nueva contraseña segura</li>
            <li>No compartas tus credenciales con nadie</li>
          </ul>
        </div>

        {/* Enlaces adicionales */}
        <div className="help-links">
          <p className="help-text">
            <strong>¿Necesitas ayuda?</strong>
          </p>
          <div className="help-actions">
            <a href="mailto:soporte-ai-design@gmail.com" className="help-link">
              📧 Contactar Soporte
            </a>
            <Link to="/register" className="help-link">
              ➕ Crear Nueva Cuenta
            </Link>
          </div>
        </div>

      </div>
    </div>
  )
}

export default ResetPasswordSuccess