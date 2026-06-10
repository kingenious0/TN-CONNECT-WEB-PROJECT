import { useState } from 'react'

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

function ResetPassword({ navigateTo }) {
  const [form, setForm] = useState({
    password: '',
    confirmPassword: ''
  })
  const [showPassword, setShowPassword] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (form.password !== form.confirmPassword) {
      alert('Passwords do not match!')
      return
    }
    setSubmitting(true)
    setTimeout(() => {
      setSubmitting(false)
      setSuccess(true)
    }, 1500)
  }

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }

  return (
    <main className="w-full bg-navy relative overflow-hidden flex flex-col text-white font-body" style={{ minHeight: 'calc(100vh - 5rem)' }}>
      {/* Background Graphic Accents */}
      <div className="absolute inset-0 opacity-15 pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-primary rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] bg-tertiary rounded-full blur-[100px]"></div>
      </div>



      {/* Centered Content Section */}
      <div className="flex-grow flex flex-col items-center justify-center py-6 md:py-12 px-0 md:px-6 relative z-10 w-full">
        <div className="w-full max-w-md">
          {/* Card Container */}
          <div className="bg-white text-slate-800 rounded-none md:rounded-3xl p-6 md:p-10 shadow-none md:shadow-2xl border-y md:border border-slate-200/50 relative overflow-hidden w-full">
            {/* Decorative Accent Stripe */}
            <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-primary via-tertiary to-secondary"></div>
            
            {success ? (
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
            ) : (
              <>
                <header className="mb-8 text-center md:text-left">
                  <h1 className="font-display text-2xl md:text-3xl text-navy font-bold mb-2">Create New Password</h1>
                  <p className="text-slate-500 text-sm leading-relaxed">
                    Enter your new password details below to secure your account.
                  </p>
                </header>

                <form onSubmit={handleSubmit} className="space-y-6">
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
                        required
                        id="password"
                        name="password"
                        type={showPassword ? 'text' : 'password'}
                        value={form.password}
                        onChange={handleChange}
                        placeholder="••••••••"
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
                        required
                        id="confirmPassword"
                        name="confirmPassword"
                        type={showPassword ? 'text' : 'password'}
                        value={form.confirmPassword}
                        onChange={handleChange}
                        placeholder="••••••••"
                        className="w-full pl-12 pr-12 py-3.5 bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:border-2 focus:border-primary focus:ring-0 outline-none transition-all text-sm placeholder:text-slate-400/60"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full bg-primary text-white py-4 rounded-xl font-bold shadow-xl shadow-primary/30 hover:brightness-110 active:scale-[0.99] transition-all flex items-center justify-center gap-3 disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer text-sm"
                  >
                    {submitting ? (
                      <>
                        <span className="material-symbols-outlined animate-spin text-lg">progress_activity</span>
                        Resetting Password...
                      </>
                    ) : (
                      <>
                        Reset Password
                        <span className="material-symbols-outlined text-lg">check_circle</span>
                      </>
                    )}
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      </div>


    </main>
  )
}

export default ResetPassword
