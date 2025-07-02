import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './components/login/Login'
import Register from './components/register/Register'
import EmailVerified from './components/context/context-verified-user/verified-success/EmailVerified'
import EmailVerifiedError from './components/context/context-verified-user/verified-error/EmailVerifiedError'
import ResendVerified from './components/context/context-verified-user/verified-resend/ResendVerified'
import ForgotPassword from './components/context/context-reset-pass/reset-password/ForgotPassword'
import ResetPasswordForm from './components/context/context-reset-pass/reset-password-form/ResetPasswordForm'
import ResetPasswordError from './components/context/context-reset-pass/reset-password-error/ResetPasswordError'
import ResetPasswordSuccess from './components/context/context-reset-pass/reset-password-success/ResetPasswordSuccess'

const App: React.FC = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/email-verified-success" element={<EmailVerified />} />
          <Route path="/email-verification-error" element={<EmailVerifiedError />} />
          <Route path="/resend-verification" element={<ResendVerified />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password-form" element={<ResetPasswordForm />} />
          <Route path="/reset-password-error" element={<ResetPasswordError />} />         
          <Route path="/reset-password-success" element={<ResetPasswordSuccess />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App