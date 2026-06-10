import { useState, useEffect, useRef } from 'react'

function OtpVerification({ navigateTo }) {
  const [step, setStep] = useState(2) // Step 2: Verification, Step 3: Success Confirmation
  const [otp, setOtp] = useState(['', '', '', '', '', ''])
  const [timeLeft, setTimeLeft] = useState(300) // 5 minutes in seconds
  const [submitting, setSubmitting] = useState(false)
  const [failedAttempts, setFailedAttempts] = useState(0)
  const [isLocked, setIsLocked] = useState(false)
  const [lockoutCountdown, setLockoutCountdown] = useState(5)
  const inputRefs = useRef([])

  const isResendDisabled = timeLeft > 0

  // Timer Countdown logic
  useEffect(() => {
    if (step !== 2 || isLocked || timeLeft <= 0) return
    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1)
    }, 1000)

    return () => clearInterval(timer)
  }, [timeLeft, step, isLocked])

  // Lockout Countdown and redirect logic
  useEffect(() => {
    if (!isLocked) return
    const timer = setInterval(() => {
      setLockoutCountdown((prev) => {
        if (prev <= 1) {
          navigateTo('registration')
          return 5 // Reset for next time
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [isLocked, navigateTo])

  // Format seconds to MM:SS
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  // Handle Input typing and advancing focus
  const handleInputChange = (value, index) => {
    if (isLocked) return
    if (isNaN(value)) return // Only allow digits

    const newOtp = [...otp]
    newOtp[index] = value.substring(value.length - 1) // Keep only the last character
    setOtp(newOtp)

    // Auto-advance to next input
    if (value && index < 5) {
      inputRefs.current[index + 1].focus()
    }

    // Auto-submit when all fields are filled
    if (newOtp.every((val) => val !== '') && !submitting) {
      triggerSubmit(newOtp.join(''))
    }
  }

  // Handle Backspace and focus shift
  const handleKeyDown = (e, index) => {
    if (isLocked) return
    if (e.key === 'Backspace') {
      if (!otp[index] && index > 0) {
        inputRefs.current[index - 1].focus()
      }
    }
  }

  // Handle pasting code
  const handlePaste = (e) => {
    if (isLocked) return
    e.preventDefault()
    const pasteData = e.clipboardData.getData('text').trim()
    if (pasteData.length === 6 && /^\d+$/.test(pasteData)) {
      const newOtp = pasteData.split('')
      setOtp(newOtp)
      triggerSubmit(pasteData)
    }
  }

  const triggerSubmit = (code) => {
    setSubmitting(true)
    setTimeout(() => {
      setSubmitting(false)
      // Simulate verification - for demo, code must be "123456"
      if (code !== '123456') {
        const attempts = failedAttempts + 1
        setFailedAttempts(attempts)
        setOtp(['', '', '', '', '', ''])
        inputRefs.current[0].focus()

        if (attempts >= 3) {
          setIsLocked(true)
        } else {
          alert(`Invalid verification code. Attempts remaining: ${3 - attempts}`)
        }
      } else {
        setStep(3) // Success/Confirmation
      }
    }, 1500)
  }

  const handleResend = () => {
    setTimeLeft(300)
    setOtp(['', '', '', '', '', ''])
    alert('Verification code has been resent to your phone.')
  }

  return (
    <main className="min-h-screen w-full bg-navy relative overflow-hidden flex flex-col justify-between text-white font-body">
      {/* Background Graphic Accents */}
      <div className="absolute inset-0 opacity-15 pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-primary rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] bg-tertiary rounded-full blur-[100px]"></div>
      </div>



      {/* Centered Content Section */}
      <div className="flex-grow flex flex-col items-center justify-center py-6 md:py-12 px-0 md:px-6 relative z-10 w-full">
        <div className="w-full max-w-2xl">
          {/* Back Navigation */}
          {step === 2 && !isLocked && (
            <div className="mb-6 text-left px-4">
              <button
                onClick={() => navigateTo('registration')}
                className="inline-flex items-center gap-2 text-slate-300 hover:text-white transition-colors font-bold text-xs uppercase tracking-wider cursor-pointer bg-transparent border-none p-0"
              >
                <span className="material-symbols-outlined text-base">arrow_back</span>
                Back to Profile Creation
              </button>
            </div>
          )}

          {/* Progress Stepper */}
          <div className="mb-8 text-center px-4">
            <span className="font-bold text-xs tracking-[0.2em] text-tertiary uppercase block mb-2">
              Step {step} of 3
            </span>
            <h2 className="font-display text-2xl md:text-3xl font-extrabold text-white mb-6">
              {step === 2 ? 'Verify Your Phone Number' : 'Account Verified'}
            </h2>
            
            <div className="w-full bg-white/10 h-1.5 rounded-full max-w-md mx-auto relative">
              <div 
                className="absolute top-0 left-0 bg-primary h-full rounded-full transition-all duration-700 ease-in-out shadow-[0_0_12px_rgba(215,25,32,0.6)]" 
                style={{ width: step === 2 ? '50%' : '100%' }}
              />
              <div className="absolute top-1/2 left-0 -translate-y-1/2 -translate-x-1/2 w-4 h-4 bg-primary border-4 border-navy rounded-full"></div>
              <div className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 w-4 h-4 bg-primary border-4 border-navy rounded-full"></div>
              <div className={`absolute top-1/2 left-full -translate-y-1/2 -translate-x-1/2 w-4 h-4 border-4 border-navy rounded-full ${step >= 3 ? 'bg-primary' : 'bg-white/20'}`}></div>
            </div>
          </div>

          {/* Card Container */}
          <div className="bg-white text-slate-800 rounded-none md:rounded-3xl p-6 md:p-12 shadow-none md:shadow-2xl border-y md:border border-slate-200/50 relative overflow-hidden w-full max-w-none md:max-w-md mx-auto">
            {/* Decorative Accent Stripe */}
            <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-primary via-tertiary to-secondary"></div>
            
            {isLocked ? (
              <div className="text-center py-6 space-y-6">
                <span className="material-symbols-outlined text-6xl text-primary animate-pulse rounded-full bg-primary/10 p-2">
                  gpp_bad
                </span>
                <h3 className="font-display text-2xl text-navy font-bold">Verification Locked</h3>
                <p className="text-slate-500 text-sm leading-relaxed">
                  You have entered the wrong code too many times. For security, this registration session is locked.
                </p>
                <div className="p-4 bg-slate-100 rounded-xl inline-block">
                  <p className="text-sm font-semibold text-navy">
                    Redirecting to registration in <span className="text-primary font-bold">{lockoutCountdown}s</span>...
                  </p>
                </div>
              </div>
            ) : step === 2 ? (
              <>
                <header className="text-center">
                  <h3 className="font-display text-xl md:text-2xl font-bold text-navy mb-2">Enter Verification Code</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">
                    We have sent a 6-digit confirmation code via SMS to your registered phone number.
                    <br />
                    <span className="text-xs text-primary/75 font-semibold mt-2 block">
                      (For demo purposes, enter <span className="underline font-bold">123456</span>)
                    </span>
                  </p>
                </header>

                {/* OTP Digit Inputs */}
                <div className="flex justify-center gap-2.5 my-8" onPaste={handlePaste}>
                  {otp.map((digit, index) => (
                    <input
                      key={index}
                      ref={(el) => (inputRefs.current[index] = el)}
                      type="text"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleInputChange(e.target.value, index)}
                      onKeyDown={(e) => handleKeyDown(e, index)}
                      className="w-10 h-12 md:w-12 md:h-14 text-center text-xl font-bold bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:border-2 focus:border-primary focus:ring-0 outline-none transition-all"
                    />
                  ))}
                </div>

                {/* Timer and Resend Actions */}
                <div className="text-center space-y-6">
                  <p className="text-sm text-slate-500">
                    {timeLeft > 0 ? (
                      <>
                        Code expires in: <span className="font-bold text-primary">{formatTime(timeLeft)}</span>
                      </>
                    ) : (
                      <span className="text-primary font-bold">The verification code has expired.</span>
                    )}
                  </p>

                  <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row justify-between items-center gap-4">
                    <button
                      type="button"
                      onClick={handleResend}
                      disabled={isResendDisabled}
                      className="w-full sm:w-auto border-2 border-slate-200 text-slate-500 hover:bg-slate-50 px-6 py-3.5 rounded-xl font-bold text-sm disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer text-center justify-center transition-all"
                    >
                      Resend Code
                    </button>

                    <button
                      type="button"
                      disabled={submitting || otp.some((val) => val === '')}
                      onClick={() => triggerSubmit(otp.join(''))}
                      className="w-full sm:w-auto bg-primary text-white hover:brightness-110 px-6 py-3.5 rounded-xl font-bold text-sm transition-all cursor-pointer text-center justify-center shadow-lg shadow-primary/20 disabled:opacity-50"
                    >
                      {submitting ? (
                        <>
                          <span className="material-symbols-outlined animate-spin mr-1">progress_activity</span>
                          Verifying...
                        </>
                      ) : (
                        <>
                          Verify & Continue
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </>
            ) : (
              /* Step 3: Success Confirmation */
              <div className="text-center py-6 space-y-6">
                <span className="material-symbols-outlined text-6xl text-green-600 animate-scale-in rounded-full bg-green-100 p-2">
                  check_circle
                </span>
                <h3 className="font-display text-2xl text-navy font-bold">Registration Completed</h3>
                <p className="text-slate-500 text-sm max-w-sm mx-auto leading-relaxed">
                  Thank you! Your phone number has been verified, and your TN Universities Connect member account is now active.
                </p>
                <div className="pt-6 border-t border-slate-100 flex flex-col gap-4">
                  <button
                    onClick={() => navigateTo('email-verification')}
                    className="w-full bg-primary text-white py-4 rounded-xl font-bold shadow-xl shadow-primary/30 hover:brightness-110 transition-all flex items-center justify-center gap-2 cursor-pointer text-sm"
                  >
                    Verify Email Address
                    <span className="material-symbols-outlined text-lg">mail</span>
                  </button>
                  <button
                    onClick={() => navigateTo('login')}
                    className="w-full bg-slate-100 text-navy hover:bg-slate-200 py-4 rounded-xl font-bold transition-all flex items-center justify-center gap-2 cursor-pointer text-sm"
                  >
                    Sign In to Your Dashboard
                    <span className="material-symbols-outlined text-lg">arrow_forward</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Minimal Footer */}
      <footer className="w-full relative z-20 py-6 border-t border-white/10 bg-navy/40 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 md:px-16 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-400">
          <p>© 2026 TN Universities Connect. All rights reserved.</p>
          <div className="flex gap-6">
            <button onClick={() => navigateTo('home')} className="hover:text-white transition-colors">Privacy Policy</button>
            <button onClick={() => navigateTo('home')} className="hover:text-white transition-colors">Terms of Service</button>
          </div>
        </div>
      </footer>
    </main>
  )
}

export default OtpVerification
