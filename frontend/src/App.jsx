import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import About from './pages/About'
import Contact from './pages/Contact'
import Registration from './pages/Registration'
import Login from './pages/Login'
import ForgotPassword from './pages/ForgotPassword'
import ResetPassword from './pages/ResetPassword'
import OtpVerification from './pages/OtpVerification'
import EmailVerification from './pages/EmailVerification'

function App() {
  const [currentPage, setCurrentPage] = useState(() => {
    const hash = window.location.hash.replace('#', '')
    return ['home', 'about', 'contact', 'registration', 'login', 'forgot-password', 'reset-password', 'otp-verification', 'email-verification'].includes(hash) ? hash : 'home'
  })

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '')
      if (['home', 'about', 'contact', 'registration', 'login', 'forgot-password', 'reset-password', 'otp-verification', 'email-verification'].includes(hash)) {
        setCurrentPage(hash)
      }
    }
    window.addEventListener('hashchange', handleHashChange)
    return () => window.removeEventListener('hashchange', handleHashChange)
  }, [])

  const navigateTo = (page) => {
    window.location.hash = `#${page}`
    setCurrentPage(page)
    window.scrollTo(0, 0)
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-between selection:bg-secondary selection:text-white pt-20">
      {/* Navbar */}
      <Navbar currentPage={currentPage} navigateTo={navigateTo} />

      {/* Main Content Area */}
      <div className="flex-grow flex flex-col">
        {currentPage === 'home' && <Home navigateTo={navigateTo} />}
        {currentPage === 'about' && <About navigateTo={navigateTo} />}
        {currentPage === 'contact' && <Contact />}
        {currentPage === 'registration' && <Registration navigateTo={navigateTo} />}
        {currentPage === 'login' && <Login navigateTo={navigateTo} />}
        {currentPage === 'forgot-password' && <ForgotPassword navigateTo={navigateTo} />}
        {currentPage === 'reset-password' && <ResetPassword navigateTo={navigateTo} />}
        {currentPage === 'otp-verification' && <OtpVerification navigateTo={navigateTo} />}
        {currentPage === 'email-verification' && <EmailVerification navigateTo={navigateTo} />}
      </div>

      {/* Footer */}
      <Footer navigateTo={navigateTo} />
    </div>
  )
}

export default App
