import React from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import './ResetPasswordError.css'

const ResetPasswordError = () => {
  const [searchParams] = useSearchParams()
  const errorType = searchParams.get('type') || 'invalid'
  const message = searchParams.get('message') || ''

  const getErrorContent = () => {
    switch(errorType) {
      case 'expired':
        return {
          icon: '⏰',
          title: 'Enlace Expirado',
          message: 'Tu enlace de recuperación ha expirado. Los enlaces son válidos por 15 minutos.',
          action: 'Solicitar Nuevo Enlace',
          link: '/forgot-password',
          bgColor: '#ff9800'
        }
      case 'invalid':
        return {
          icon: '❌',
          title: 'Enlace Inválido',
          message: 'El enlace de recuperación no es válido o ya fue utilizado.',
          action: 'Solicitar Nuevo Enlace',
          link: '/forgot-password',
          bgColor: '#f44336'
        }
      case 'error':
        return {
          icon: '⚠️',
          title: 'Error del Servidor',
          message: 'Ha ocurrido un error interno. Por favor, intenta nuevamente.',
          action: 'Reintentar',
          link: '/forgot-password',
          bgColor: '#9e9e9e'
        }
      default:
        return {
          icon: '❓',
          title: 'Error Desconocido',
          message: 'Ha ocurrido un error inesperado.',
          action: 'Volver al Inicio',
          link: '/',
          bgColor: '#607d8b'
        }
    }
  }

  const content = getErrorContent()

  return (
    <div className="reset-error-bg" style={{ background: `linear-gradient(135deg, ${content.bgColor} 0%, #424242 100%)` }}>
      <div className="reset-error-container">
        <div className="error-icon">{content.icon}</div>
        <h1 className="error-title">{content.title}</h1>
        <p className="error-message">
          {message || content.message}
        </p>
        
        <div className="error-actions">
          <Link to={content.link} className="error-btn primary">
            {content.action}
          </Link>
          <Link to="/" className="error-btn secondary">
            Ir al Login
          </Link>
        </div>
               
        <div className="help-section">
          <p className="help-text">
            <strong>¿Necesitas ayuda? Contáctanos:</strong>
          </p>
          <a href="mailto:soporte-ai-design@gmail.com" className="contact-email">
            📧 soporte-ai-design@gmail.com
          </a>
        </div>
      </div>
    </div>
  )
}

export default ResetPasswordError