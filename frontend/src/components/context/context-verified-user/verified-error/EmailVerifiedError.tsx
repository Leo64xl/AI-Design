import React from 'react'
import { Link, useSearchParams, useNavigate } from 'react-router-dom'  
import './EmailVerifiedError.css'

const EmailVerifiedError = () => {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()  
  const errorType = searchParams.get('type') || 'expired'
  const message = searchParams.get('message') || ''

  const getErrorContent = () => {
    switch(errorType) {
      case 'expired':
        return {
          icon: '⏰',
          title: 'Enlace Expirado',
          message: 'Tu enlace de verificación ha expirado. No te preocupes, puedes generar uno nuevo.',
          action: 'Generar Nuevo Enlace',  
          link: '/resend-verification',     
          bgColor: '#ff9800',
          showResendOption: true          
        }
      case 'invalid':
        return {
          icon: '❌',
          title: 'Enlace Inválido',
          message: 'El enlace de verificación no es valido.',
          action: 'Iniciar Sesión',
          link: '/',
          bgColor: '#f44336',
          showResendOption: false
        }
      case 'used':
        return {
          icon: '✅',
          title: 'Ya Verificado',
          message: 'Este enlace ya fue utilizado anteriormente. Tu cuenta ya está verificada.',
          action: 'Iniciar Sesión',
          link: '/',
          bgColor: '#4caf50',
          showResendOption: false
        }
      default:
        return {
          icon: '⚠️',
          title: 'Error de Verificación',
          message: 'Ha ocurrido un error durante la verificación.',
          action: 'Reintentar',
          link: '/register',
          bgColor: '#9e9e9e',
          showResendOption: false
        }
    }
  }

  const content = getErrorContent()

  const handleResendClick = () => {
    if (content.showResendOption) {
      navigate('/resend-verification', {
        state: {
          reason: 'expired_from_email',
          source: 'error_page'
        }
      })
    }
  }

  return (
    <div className="error-verification-bg" style={{ background: `linear-gradient(135deg, ${content.bgColor} 0%, #424242 100%)` }}>
      <div className="error-verification-container">
        <div className="error-icon">{content.icon}</div>
        <h1 className="error-title">{content.title}</h1>
        <p className="error-message">{content.message}</p>
        
        <div className="error-actions">
          {content.showResendOption ? (
            <button 
              onClick={handleResendClick}
              className="error-btn primary"
            >
              {content.action}
            </button>
          ) : (
            <Link to={content.link} className="error-btn primary">
              {content.action}
            </Link>
          )}                            
        </div>
               
        <div className="help-section">
          <p className="help-text">
            <strong>¿Necesitas ayuda? Contáctanos:</strong>
            <br />
            <a 
              href={`mailto:soporte-ai-design@gmail.com?subject=Problema%20con%20verificación%20de%20email&body=Hola,%20tengo%20problemas%20con%20la%20verificación%20de%20mi%20cuenta.%20Tipo%20de%20error:%20${errorType}`}
              className="contact-email"
            >
              📧 soporte-ai-design@gmail.com
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}

export default EmailVerifiedError