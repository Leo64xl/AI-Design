import React, { useState, useEffect } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
import eye from '../../../../assets/eye.svg'
import './ResetPasswordForm.css'

interface ResetPasswordResponse {
  success: boolean;
  message: string;
  action: string;
  redirectUrl?: string; 
}

const ResetPasswordForm = () => {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [message, setMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  
  const token = searchParams.get('token')

  useEffect(() => {
    if (!token) {
      navigate('/reset-password-error?type=invalid&message=' + encodeURIComponent('Token no válido'))
    }
  }, [token, navigate])

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!newPassword || !confirmPassword) {
      setMessage('Todos los campos son obligatorios.')
      setIsSuccess(false)
      return
    }

    if (newPassword !== confirmPassword) {
      setMessage('Las contraseñas no coinciden.')
      setIsSuccess(false)
      return
    }

    if (newPassword.length < 3 || newPassword.length > 16) {
      setMessage('La contraseña debe tener entre 3 y 16 caracteres.')
      setIsSuccess(false)
      return
    }
    
    setMessage('')
    setIsLoading(true)
    setIsSuccess(false)
    
    try {
      const response = await axios.post<ResetPasswordResponse>('http://localhost:5000/reset-password', {
        token,
        newPassword,
        confirmPassword
      })
      
      setMessage(response.data.message)
      setIsSuccess(response.data.success)
      
      if (response.data.success) {
        
        if (response.data.action === 'go_success' && response.data.redirectUrl) {
          
          window.location.href = response.data.redirectUrl;
        } else {
          
          setTimeout(() => {
            navigate('/reset-password-success', { 
              state: { 
                email: '',
                message: response.data.message
              }
            });
          }, 2000);
        }
      }
      
    } catch (error: any) {
      console.log('Error en reset password:', error.response);
      
      const errorData = error.response?.data;
      
      if (error.response?.status === 400) {
        if (errorData?.action === 'request_new') {
          setMessage('El enlace ha expirado. Solicita uno nuevo.')
          setTimeout(() => {
            navigate('/forgot-password')
          }, 3000)
        } else if (errorData?.action === 'go_login') {
          setMessage('Enlace inválido o usuario no encontrado.')
          setTimeout(() => {
            navigate('/')
          }, 3000)
        } else {
          setMessage(errorData?.message || 'Error en la validación.')
        }
      } else {
        setMessage('Error interno del servidor. Intenta más tarde.')
      }
      setIsSuccess(false)
      
    } finally {
      setIsLoading(false)
    }
  }

  const toggleNewPasswordVisibility = () => {
    setShowNewPassword(!showNewPassword)
  }

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword)
  }

  if (!token) {
    return null 
  }

  return (
    <div className="reset-password-bg">
      <div className="reset-password-container">
        <div className="reset-icon">🔑</div>
        <h1 className="reset-title">Restablecer Contraseña</h1>
        <p className="reset-subtitle">
          Ingresa tu nueva contraseña. Asegúrate de que sea segura y fácil de recordar.
        </p>
        
        <form className="reset-form" onSubmit={handleResetPassword}>
          <div className="input-group">
            <label htmlFor="newPassword">Nueva contraseña</label>
            <div className="password-wrapper">
              <input
                type={showNewPassword ? "text" : "password"}
                id="newPassword"
                name="newPassword"
                value={newPassword}
                onChange={e => {
                  setNewPassword(e.target.value)
                  if (message && !isSuccess) {
                    setMessage('')
                  }
                }}
                placeholder="Ingresa tu nueva contraseña"
                required
                minLength={3}
                maxLength={16}
                autoComplete="new-password"
                autoFocus
                disabled={isLoading}
              />
              <img
                className="eye-icon"
                src={eye}
                alt="Mostrar/Ocultar contraseña"
                onClick={toggleNewPasswordVisibility}
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
                onChange={e => {
                  setConfirmPassword(e.target.value)
                  if (message && !isSuccess) {
                    setMessage('')
                  }
                }}
                placeholder="Confirma tu nueva contraseña"
                required
                minLength={3}
                maxLength={16}
                autoComplete="new-password"
                disabled={isLoading}
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

          {message && (
            <div className={`message ${isSuccess ? 'success' : 'error'}`}>
              <p className="message-text">{message}</p>
              {isSuccess && (
                <div className="success-details">
                  <p>✅ Tu contraseña ha sido actualizada</p>
                  <p>🔐 Ahora puedes iniciar sesión con tu nueva contraseña</p>
                  <p>🔄 Redirigiendo a página de confirmación en 2 segundos...</p>
                </div>
              )}
            </div>
          )}

          <button 
            type="submit" 
            className="reset-button" 
            disabled={isLoading || isSuccess}
          >
            {isLoading ? (
              <>
                <span className="spinner"></span>
                Actualizando...
              </>
            ) : isSuccess ? (
              '✅ Contraseña Actualizada'
            ) : (
              'Restablecer contraseña'
            )}
          </button>
        </form>

        <div className="security-info">
          <h3>🔐 Consejos de seguridad:</h3>
          <ul>
            <li>Usa entre 3 y 16 caracteres</li>
            <li>Combina letras y números</li>
            <li>No uses información personal</li>
            <li>Mantén tu contraseña privada</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default ResetPasswordForm