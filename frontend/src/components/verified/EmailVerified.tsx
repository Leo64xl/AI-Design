import React, { useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import './EmailVerified.css'

const EmailVerified = () => {
  const [searchParams] = useSearchParams()
  const [isAlreadyVerified] = useState(searchParams.get('already') === 'true')

  const handleCloseWindow = () => {
    window.close()
    
    setTimeout(() => {
      if (!window.closed) {
        alert('Por favor, cierra esta pestaña manualmente')
      }
    }, 100)
  }

  return (
    <div className="email-verified-bg">
      <div className="email-verified-container">
        <div className="success-icon">✅</div>
        <h1 className="success-title">
          {isAlreadyVerified ? '¡Ya estas verificado!' : '¡Correo verificado!'}
        </h1>
        <p className="success-message">
          {isAlreadyVerified 
            ? 'Verificacion realizada. Puedes cerrar esta ventana.'
            : '🎉 Tu cuenta ha sido verificada correctamente. Puedes cerrar esta ventana.'
          }
        </p>
        
        <div className="action-buttons">
          <button 
            onClick={handleCloseWindow}
            className="close-btn primary"
          >
            Cerrar ventana
          </button>          
        </div>        
        <p className="instruction-text">
          🔒 Verificación completada. Esta ventana ya no es necesaria, puedes cerrarla y volver a la app.  
        </p>
      </div>
    </div>
  )
}

export default EmailVerified