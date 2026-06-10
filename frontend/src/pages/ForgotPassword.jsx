import { useState, useEffect } from 'react'

function PasswordStrength({ value }) {
  let strength = 0
  if (value.length >= 8) strength++
  if (/[A-Z]/.test(value) && /[a-z]/.test(value)) strength++
  if (/[0-9]/.test(value)) strength++
  if (/[^A-Za-z0-9]/.test(value)) strength++

  const colors = ['', 'bg-primary', 'bg-amber-500', 'bg-indigo-500', 'bg-green-500']
  const labels = [
    'Use 8+ characters with a mix of letters and numbers.',
    'Weak password',
    'Fair security',
    'Strong security',
    'Excellent security'
  ]
  const labelColors = [
    'text-slate-500',
    'text-primary',
    'text-amber-600',
    'text-indigo-600',
    'text-green-600'
  ]

  return (
    <div className="mt-3 px-1">
      <div className="flex gap-2 h-1.5 mb-2">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className={`h-full flex-1 rounded-full transition-all duration-300 ${i <= strength ? colors[strength] : 'bg-slate-200'}`}
          />
        ))}
      </div>
      <p className={`text-xs font-semibold ${labelColors[strength]}`}>
        {labels[strength]}
      </p>
    </div>
  )
}

function ForgotPassword({ navigateTo }) {
  const [step, setStep] = useState(1) // 1: Enter email/phone, 2: Enter OTP & New Password, 3: Success
  const [identity, setIdentity] = useState('')
  const [form, setForm] = useState({
    code: '',
    password: '',
    confirmPassword: ''
  })
  const [showPassword, setShowPassword] = useState(false)
  const [timeLeft, setTimeLeft] = useState(300) // 5 minutes in seconds
  const [submitting, setSubmitting] = useState(false)
  const [failedAttempts, setFailedAttempts] = useState(0)
  const [isLocked, setIsLocked] = useState(false)
  const [lockoutCountdown, setLockoutCountdown] = useState(5)

  const isResendDisabled = timeLeft > 0

  // Timer Countdown logic for Step 2
  useEffect(() => {
    if (step !== 2 || isLocked || timeLeft <= 0) return
    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1)
    }, 1000)

    return () => clearInterval(timer)
  }, [timeLeft, step, isLocked])

  // Lockout countdown and redirect logic
  useEffect(() => {
    if (!isLocked) return
    const timer = setInterval(() => {
      setLockoutCountdown((prev) => {
        if (prev <= 1) {
          setIsLocked(false)
          setFailedAttempts(0)
          setStep(1)
          setIdentity('')
          setForm({ code: '', password: '', confirmPassword: '' })
          return 5
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [isLocked])

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  const handleIdentitySubmit = (e) => {
    e.preventDefault()
    setSubmitting(true)
    setTimeout(() => {
      setSubmitting(false)
      setStep(2)
      setTimeLeft(300)
      setFailedAttempts(0)
    }, 1500)
  }

  const handleResetSubmit = (e) => {
    e.preventDefault()
    if (form.password !== form.confirmPassword) {
      alert('Passwords do not match!')
      return
    }
    setSubmitting(true)
    setTimeout(() => {
      setSubmitting(false)
      
      // Simulate verification - for demo, code must be "123456"
      if (form.code !== '123456') {
        const attempts = failedAttempts + 1
        setFailedAttempts(attempts)
        setForm((prev) => ({ ...prev, code: '' }))
        
        if (attempts >= 3) {
          setIsLocked(true)
        } else {
          alert(`Invalid reset code. Attempts remaining: ${3 - attempts}`)
        }
      } else {
        setStep(3)
      }
    }, 2000)
  }

  const handleResend = () => {
    setTimeLeft(300)
    setForm((prev) => ({ ...prev, code: '' }))
    alert('A new reset code has been sent.')
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
        <div className="w-full max-w-md">
          {/* Back Link */}
          {step < 3 && !isLocked && (
            <div className="mb-6 text-left px-4">
              <button
                onClick={() => navigateTo('login')}
                className="inline-flex items-center gap-2 text-slate-300 hover:text-white transition-colors font-bold text-xs uppercase tracking-wider cursor-pointer bg-transparent border-none p-0"
              >
                <span className="material-symbols-outlined text-base">arrow_back</span>
                Back to Sign In
              </button>
            </div>
          )}

          {/* Card Container */}
          <div className="bg-white text-slate-800 rounded-none md:rounded-3xl p-6 md:p-10 shadow-none md:shadow-2xl border-y md:border border-slate-200/50 relative overflow-hidden w-full">
            {/* Decorative Accent stripe */}
            <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-primary via-tertiary to-secondary"></div>
            
            {isLocked ? (
              <div className="text-center py-6 space-y-6">
                <span className="material-symbols-outlined text-6xl text-primary animate-pulse rounded-full p-2 bg-primary/10">
                  gpp_bad
                </span>
                <h3 className="font-display text-2xl text-navy font-bold">Verification Locked</h3>
                <p className="text-slate-500 text-sm leading-relaxed">
                  You have entered the wrong code too many times. For security, this password reset session is locked.
                </p>
                <div className="p-4 bg-slate-100 rounded-xl inline-block">
                  <p className="text-sm font-semibold text-navy">
                    Redirecting to start in <span className="text-primary font-bold">{lockoutCountdown}s</span>...
                  </p>
                </div>
              </div>
            ) : step === 1 ? (
              <>
                <header className="mb-8 text-center md:text-left">
                  <h1 className="font-display text-2xl md:text-3xl text-navy font-bold mb-2">Reset Password</h1>
                  <p className="text-slate-500 text-sm leading-relaxed">
                    Enter your email or phone number and we'll send you a code to reset your password.
                  </p>
                </header>

                <form onSubmit={handleIdentitySubmit} className="space-y-6">
                  <div className="space-y-1.5">
                    <label className="block font-semibold text-xs text-slate-500 uppercase px-1" htmlFor="identity">
                      Email or Phone Number
                    </label>
                    <div className="relative group">
                      <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors">
                        alternate_email
                      </span>
                      <input
                        id="identity"
                        type="text"
                        value={identity}
                        onChange={(e) => setIdentity(e.target.value)}
                        placeholder="name@college.edu or +233..."
                        required
                        className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:border-2 focus:border-primary focus:ring-0 outline-none transition-all text-sm placeholder:text-slate-400/60"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full bg-primary text-white py-4 rounded-xl font-bold shadow-xl shadow-primary/30 hover:brightness-[1.12] active:scale-[0.99] transition-all flex items-center justify-center gap-3 disabled:opacity-75 disabled:cursor-not-allowed cursor-pointer text-sm"
                  >
                    {submitting ? (
                      <>
                        <span className="material-symbols-outlined animate-spin">progress_activity</span>
                        Sending code...
                      </>
                    ) : (
                      <>
                        Send Reset Code
                        <span className="material-symbols-outlined text-lg">arrow_forward</span>
                      </>
                    )}
                  </button>
                </form>
              </>
            ) : step === 2 ? (
              <>
                <header className="mb-8 text-center md:text-left">
                  <h1 className="font-display text-2xl text-navy font-bold mb-2">Create New Password</h1>
                  <p className="text-slate-500 text-sm leading-relaxed">
                    We sent a 6-digit verification code to <span className="font-semibold text-navy">{identity}</span>.
                    <br />
                    <span className="text-xs text-primary/75 font-semibold mt-2 block">
                      (For demo, use code <span className="font-bold underline">123456</span>)
                    </span>
                  </p>
                </header>

                <form onSubmit={handleResetSubmit} className="space-y-5">
                  {/* Code field */}
                  <div className="space-y-1.5">
                    <label className="block font-semibold text-xs text-slate-500 uppercase px-1" htmlFor="code">
                      Verification Code
                    </label>
                    <div className="relative group">
                      <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors">
                        pin
                      </span>
                      <input
                        id="code"
                        type="text"
                        maxLength={6}
                        value={form.code}
                        onChange={(e) => setForm({ ...form, code: e.target.value })}
                        placeholder="e.g. 123456"
                        required
                        className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:border-2 focus:border-primary focus:ring-0 outline-none transition-all text-sm placeholder:text-slate-400/60"
                      />
                    </div>
                  </div>

                  {/* New Password */}
                  <div className="space-y-1.5">
                    <label className="block font-semibold text-xs text-slate-500 uppercase px-1" htmlFor="password">
                      New Password
                    </label>
                    <div className="relative group">
                      <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors">
                        lock
                      </span>
                      <input
                        id="password"
                        type={showPassword ? 'text' : 'password'}
                        value={form.password}
                        onChange={(e) => setForm({ ...form, password: e.target.value })}
                        placeholder="••••••••"
                        required
                        minLength={8}
                        className="w-full pl-12 pr-12 py-3.5 bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:border-2 focus:border-primary focus:ring-0 outline-none transition-all text-sm placeholder:text-slate-400/60"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-primary transition-colors cursor-pointer"
                      >
                        <span className="material-symbols-outlined">
                          {showPassword ? 'visibility_off' : 'visibility'}
                        </span>
                      </button>
                    </div>
                    <PasswordStrength value={form.password} />
                  </div>

                  {/* Confirm Password */}
                  <div className="space-y-1.5">
                    <label className="block font-semibold text-xs text-slate-500 uppercase px-1" htmlFor="confirmPassword">
                      Confirm New Password
                    </label>
                    <div className="relative group">
                      <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors">
                        lock
                      </span>
                      <input
                        id="confirmPassword"
                        type={showPassword ? 'text' : 'password'}
                        value={form.confirmPassword}
                        onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
                        placeholder="••••••••"
                        required
                        className="w-full pl-12 pr-12 py-3.5 bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:border-2 focus:border-primary focus:ring-0 outline-none transition-all text-sm placeholder:text-slate-400/60"
                      />
                    </div>
                  </div>

                  <p className="text-center text-sm text-slate-500">
                    {timeLeft > 0 ? (
                      <>
                        Code expires in: <span className="font-bold text-primary">{formatTime(timeLeft)}</span>
                      </>
                    ) : (
                      <span className="text-primary font-bold">Code has expired.</span>
                    )}
                  </p>

                  <div className="flex flex-col sm:flex-row gap-4 justify-between items-center pt-2">
                    <button
                      type="button"
                      onClick={handleResend}
                      disabled={isResendDisabled}
                      className="w-full sm:w-auto border-2 border-slate-200 text-slate-500 hover:bg-slate-50 px-6 py-3.5 rounded-xl font-bold text-sm disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer text-center justify-center transition-all"
                    >
                      Resend Code
                    </button>

                    <button
                      type="submit"
                      disabled={submitting}
                      className="w-full sm:w-auto bg-primary text-white hover:brightness-110 px-6 py-3.5 rounded-xl font-bold text-sm transition-all cursor-pointer text-center justify-center shadow-lg shadow-primary/20"
                    >
                      {submitting ? 'Resetting...' : 'Reset Password'}
                    </button>
                  </div>
                </form>
              </>
            ) : (
              <div className="text-center py-6 space-y-6">
                <span className="material-symbols-outlined text-6xl text-green-600 animate-scale-in rounded-full bg-green-100 p-2">
                  check_circle
                </span>
                <h1 className="font-display text-2xl md:text-3xl text-navy font-bold">Password Reset Successful</h1>
                <p className="text-slate-500 text-sm max-w-xs mx-auto leading-relaxed">
                  Your password has been successfully updated. You can now sign in with your new credentials.
                </p>
                <div className="pt-4">
                  <button
                    onClick={() => navigateTo('login')}
                    className="w-full bg-primary text-white py-4 rounded-xl font-bold shadow-xl shadow-primary/30 hover:brightness-110 transition-all flex items-center justify-center gap-2 cursor-pointer text-sm"
                  >
                    Sign In Now
                    <span className="material-symbols-outlined">arrow_forward</span>
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

export default ForgotPassword
