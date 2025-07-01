import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './components/login/Login'
import Register from './components/register/Register'
import EmailVerified from './components/verified/EmailVerified'
import EmailVerifiedError from './components/verifiedError/EmailVerifiedError'
import ResendVerified from './components/resendVerified/ResendVerified'

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
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App