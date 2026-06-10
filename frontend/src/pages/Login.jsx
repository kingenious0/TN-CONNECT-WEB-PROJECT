import { useState } from 'react'

function Login({ navigateTo }) {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    remember: false
  })
  
  const [showPassword, setShowPassword] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e) => {
    const val = e.target.type === 'checkbox' ? e.target.checked : e.target.value
    setFormData({
      ...formData,
      [e.target.name]: val
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    setTimeout(() => {
      alert(`Successfully logged in as: ${formData.email}`)
      setIsSubmitting(false)
      navigateTo('home')
    }, 1500)
  }

  return (
    <main className="min-h-screen w-full bg-navy relative overflow-hidden flex flex-col justify-between text-white font-body">
      {/* Background Graphic Accents */}
      <div className="absolute inset-0 opacity-15 pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-primary rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] bg-tertiary rounded-full blur-[100px]"></div>
      </div>



      {/* Main Container */}
      <div className="flex-grow flex items-center justify-center py-0 md:py-12 px-0 md:px-6 relative z-10 w-full">
        <div className="w-full max-w-[1100px] flex flex-col md:flex-row bg-white rounded-none md:rounded-3xl shadow-none md:shadow-2xl overflow-hidden border-x-0 md:border border-slate-200/50 min-h-screen md:min-h-[650px]">
          
          {/* BRAND VISUAL SIDE (LEFT) - HIDDEN ON MOBILE */}
          <div className="relative hidden md:flex w-full md:w-1/2 bg-navy overflow-hidden flex-col justify-between p-12 md:p-16 text-white border-r border-slate-100">
            {/* Texture Overlay */}
            <div className="absolute inset-0 pattern-overlay opacity-30 pointer-events-none"></div>
            {/* Background blobs */}
            <div className="absolute top-[-10%] right-[-10%] w-80 h-80 bg-primary opacity-20 rounded-full blur-[80px]"></div>
            <div className="absolute bottom-[-5%] left-[-5%] w-72 h-72 bg-white opacity-10 rounded-full blur-[60px]"></div>
            
            <div className="relative z-10">
              {/* Header Brand */}
              <div className="flex items-center gap-3 mb-10 cursor-pointer" onClick={() => navigateTo('home')}>
                <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-lg p-1">
                  <img 
                    alt="TN Universities Connect Logo" 
                    className="w-full h-full object-contain" 
                    src="https://lh3.googleusercontent.com/aida/AP1WRLu_SpP1LgQ87QvvQaushQ0RzJQBjt2dc8-fFszHW2t7Cunz4GjS123FO-2QoqJOj_KwWuGW4XNkoXz-rizvN92dP-GerCk0G8NmT0ThuuNRBcMwF-NnQUW2vqnp3ZbYlxE5Lyci5hVgxSMi19SKS3AyV6dKPb0Z-Oge227EwjCBdRs9J336dYENPXllu-UBHXammk0aHPDuu9H4FSG6cSAoTfVatN3bPO3nBMAVe0_kF-ehf9A3TvJEY3w" 
                  />
                </div>
                <span className="font-display text-lg font-black tracking-tight text-white">TN Universities Connect</span>
              </div>
              
              <h1 className="font-display text-4xl font-black leading-tight mb-6 mt-8 text-white">
                Guide <span className="text-tertiary">•</span> Work <span className="text-tertiary">•</span> Inspire
              </h1>
              <p className="text-sm text-slate-300 leading-relaxed max-w-sm">
                TN Universities Connect is an educational and career-focused platform designed to connect students, universities, employers, and opportunities across Ghana.
              </p>
            </div>

            {/* Bottom Security Badge */}
            <div className="relative z-10 mt-auto">
              <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 w-fit">
                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-tertiary">
                  <span className="material-symbols-outlined text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>verified_user</span>
                </div>
                <div>
                  <p className="font-bold text-sm">Enterprise Security</p>
                  <p className="text-white/60 text-xs">Standard bank-level data encryption</p>
                </div>
              </div>
            </div>
            
            {/* Workspace Backdrop Image */}
            <img 
              alt="Modern Workspace" 
              className="absolute inset-0 w-full h-full object-cover opacity-20 mix-blend-overlay pointer-events-none" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAOuyrW9jK9OmSqkV6iEpDbgluVWMH2SCIPzrb_N6jiuRydXnInGZoBGW4LDeSH24FV_2XMKReFBTCFiJ-AjL-2e0_4S7TdXlzr7MuLKldoE8DRqW9M59NiXl5iI-m8oW9Q5aO8qpjqd4GtJHSSebOLIsugFWOkPhYZbzytLxn7hMbsB00Z9zVNDkRYLRl9SsVDKEmMWf9haYtjmpb3TnAYxpdOppU1mern3v0CF0WXCujGq9BMOEU-Jh5XpFGdaaRY5lO-j42Kvvq0" 
            />
          </div>

          {/* LOGIN FORM SIDE (RIGHT) */}
          <div className="w-full md:w-1/2 flex flex-col justify-center p-6 sm:p-8 md:p-16 bg-white text-slate-800 min-h-screen md:min-h-0">
            <div className="max-w-md mx-auto w-full">
              
              <div className="mb-6 md:mb-10 text-center md:text-left">
                <h2 className="font-display text-2xl md:text-3xl text-navy font-bold mb-2">Welcome Back</h2>
                <p className="text-slate-500 text-sm">Please enter your credentials to continue.</p>
              </div>
              
              <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                
                {/* Email Field */}
                <div className="space-y-1.5">
                  <label className="font-semibold text-xs text-slate-500 uppercase px-1" htmlFor="email">Email Address</label>
                  <div className="relative group">
                    <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors">alternate_email</span>
                    <input 
                      required
                      type="email" 
                      id="email" 
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="john.doe@student.edu" 
                      className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:border-2 focus:border-primary focus:ring-0 outline-none transition-all text-sm placeholder:text-slate-400/60"
                    />
                  </div>
                </div>

                {/* Password Field */}
                <div className="space-y-1.5">
                  <div className="flex justify-between items-center px-1">
                    <label className="font-semibold text-xs text-slate-500 uppercase" htmlFor="password">Password</label>
                    <button type="button" onClick={() => navigateTo('forgot-password')} className="text-xs font-bold text-primary hover:underline transition-colors cursor-pointer bg-transparent border-none p-0">Forgot Password?</button>
                  </div>
                  <div className="relative group">
                    <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors">lock</span>
                    <input 
                      required
                      type={showPassword ? 'text' : 'password'} 
                      id="password" 
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="••••••••" 
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
                </div>

                {/* Remember Me */}
                <div className="flex items-center gap-2 px-1">
                  <input 
                    type="checkbox" 
                    id="remember" 
                    name="remember"
                    checked={formData.remember}
                    onChange={handleChange}
                    className="w-5 h-5 rounded border-slate-300 text-primary focus:ring-primary transition-all cursor-pointer"
                  />
                  <label className="text-sm text-slate-500 cursor-pointer select-none" htmlFor="remember">Keep me logged in</label>
                </div>

                {/* Action Button */}
                <button 
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 bg-primary text-white font-bold rounded-xl shadow-lg shadow-primary/20 hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-2 mt-2 cursor-pointer text-sm"
                >
                  {isSubmitting ? (
                    <>
                      <span className="material-symbols-outlined animate-spin text-lg">progress_activity</span>
                      Signing In...
                    </>
                  ) : (
                    <>
                      Sign In to Dashboard
                      <span className="material-symbols-outlined text-[20px]">login</span>
                    </>
                  )}
                </button>
              </form>

              {/* Divider */}
              <div className="relative my-6 md:my-8">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-slate-200"></div>
                </div>
                <div className="relative flex justify-center text-xs uppercase tracking-widest">
                  <span className="bg-white px-4 text-slate-400 font-bold">Or connect with</span>
                </div>
              </div>

              {/* Social Logins */}
              <div className="grid grid-cols-2 gap-3 md:gap-4">
                <button className="flex items-center justify-center gap-2 py-3 border border-slate-200 rounded-xl hover:bg-slate-50 hover:border-slate-300 transition-all font-semibold text-xs md:text-sm cursor-pointer">
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"></path>
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"></path>
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"></path>
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"></path>
                  </svg>
                  Google
                </button>
                <button onClick={() => navigateTo('otp-verification')} className="flex items-center justify-center gap-2 py-3 border border-slate-200 rounded-xl hover:bg-slate-50 hover:border-slate-300 transition-all font-semibold text-xs md:text-sm cursor-pointer">
                  <span className="material-symbols-outlined text-[20px] text-navy">sms</span>
                  OTP
                </button>
              </div>

              {/* Footer Link */}
              <div className="mt-6 md:mt-10 text-center">
                <p className="text-sm text-slate-500 font-semibold">
                  New to TN Universities Connect? 
                  <button onClick={() => navigateTo('registration')} className="text-primary font-bold hover:text-primary/80 hover:underline transition-colors ml-1 cursor-pointer">Create an account</button>
                </p>
              </div>
            </div>
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

export default Login
