import { useState } from 'react'

function Registration({ navigateTo }) {
  const [formData, setFormData] = useState({
    fullName: '',
    schoolName: '',
    course: '',
    phone: '',
    email: '',
    password: ''
  })
  
  const [passwordStrength, setPasswordStrength] = useState({
    level: 0,
    text: 'Use 8+ characters with a mix of letters and numbers.',
    colorClass: 'text-slate-500'
  })
  
  const [showPassword, setShowPassword] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handlePasswordChange = (e) => {
    const val = e.target.value
    setFormData({ ...formData, password: val })
    
    let strength = 0
    if (val.length >= 8) strength++
    if (/[A-Z]/.test(val) && /[a-z]/.test(val)) strength++
    if (/[0-9]/.test(val)) strength++
    if (/[^A-Za-z0-9]/.test(val)) strength++
    
    let text = 'Use 8+ characters with a mix of letters and numbers.'
    let colorClass = 'text-slate-500'
    
    if (val.length === 0) {
      // Keep default
    } else if (strength === 1) {
      text = 'Weak password'
      colorClass = 'text-primary'
    } else if (strength === 2) {
      text = 'Fair security'
      colorClass = 'text-amber-600'
    } else if (strength === 3) {
      text = 'Strong security'
      colorClass = 'text-indigo-600'
    } else if (strength === 4) {
      text = 'Excellent security'
      colorClass = 'text-green-600'
    }
    
    setPasswordStrength({ level: strength, text, colorClass })
  }

  const handleChange = (e) => {
    if (e.target.name === 'password') {
      handlePasswordChange(e)
    } else {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value
      })
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    setTimeout(() => {
      setIsSubmitting(false)
      navigateTo('otp-verification')
    }, 1500)
  }

  const universities = [
    'University of Ghana',
    'KNUST',
    'University of Cape Coast',
    'UMaT',
    'UPSA'
  ]

  return (
    <main className="w-full bg-navy relative overflow-hidden flex flex-col text-white font-body" style={{ minHeight: 'calc(100vh - 5rem)' }}>
      {/* Background Graphic Accents */}
      <div className="absolute inset-0 opacity-15 pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-primary rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] bg-tertiary rounded-full blur-[100px]"></div>
        <div className="absolute top-[40%] left-[20%] w-[300px] h-[300px] bg-secondary rounded-full blur-[80px]"></div>
      </div>



      {/* Centered Content Section */}
      <div className="flex-grow flex flex-col items-center justify-center py-6 md:py-12 px-0 md:px-6 relative z-10 w-full">
        <div className="w-full max-w-2xl">
          
          {/* Progress bar header section */}
          <div className="mb-8 text-center px-4">
            <span className="font-bold text-xs uppercase tracking-[0.2em] text-tertiary block mb-2">Step 1 of 3</span>
            <h2 className="font-display text-2xl md:text-3xl font-extrabold text-white mb-6">Create Your Profile</h2>
            
            {/* Horizontal progress bar */}
            <div className="w-full bg-white/10 h-1.5 rounded-full max-w-md mx-auto relative">
              {/* Ghana Red active bar segment */}
              <div className="absolute top-0 left-0 bg-primary h-full rounded-full shadow-[0_0_12px_rgba(215,25,32,0.6)]" style={{ width: '0%' }}></div>
              {/* Stepper Dot Indicators */}
              <div className="absolute top-1/2 left-0 -translate-y-1/2 -translate-x-1/2 w-4 h-4 bg-primary border-4 border-navy rounded-full"></div>
              <div className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 w-4 h-4 bg-white/20 border-4 border-navy rounded-full"></div>
              <div className="absolute top-1/2 left-full -translate-y-1/2 -translate-x-1/2 w-4 h-4 bg-white/20 border-4 border-navy rounded-full"></div>
            </div>
          </div>

          {/* Registration Form Card */}
          <div className="bg-white text-slate-800 rounded-none md:rounded-3xl p-6 md:p-12 shadow-none md:shadow-2xl border-y md:border border-slate-200/50 relative overflow-hidden w-full">
            {/* Decorative Top Accent Stripe */}
            <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-primary via-tertiary to-secondary"></div>
            
            <header className="mb-8 text-center md:text-left">
              <h3 className="font-display text-xl md:text-2xl font-bold text-navy mb-2">Member Information</h3>
              <p className="text-slate-500 text-sm leading-relaxed">
                We'll use this information to customize your experience and help you connect with others in the community.
              </p>
            </header>

            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
                
                {/* Legal Full Name */}
                <div className="space-y-1.5 col-span-1 md:col-span-2">
                  <label className="block font-semibold text-xs text-slate-500 uppercase px-1" htmlFor="fullName">Legal Full Name</label>
                  <div className="relative group">
                    <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors">person</span>
                    <input 
                      required
                      type="text" 
                      id="fullName" 
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      placeholder="As it appears on ID (e.g. Johnathan Doe)" 
                      className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:border-2 focus:border-primary focus:ring-0 transition-all text-sm outline-none placeholder:text-slate-400/60"
                    />
                  </div>
                </div>

                {/* Current Educational Institution Select */}
                <div className="space-y-1.5 col-span-1 md:col-span-2">
                  <label className="block font-semibold text-xs text-slate-500 uppercase px-1" htmlFor="schoolName">Current University/College</label>
                  <div className="relative group">
                    <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors">school</span>
                    <select
                      required
                      id="schoolName"
                      name="schoolName"
                      value={formData.schoolName}
                      onChange={handleChange}
                      className="w-full pl-12 pr-10 py-3.5 bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:border-2 focus:border-primary focus:ring-0 transition-all text-sm outline-none appearance-none"
                    >
                      <option value="" disabled>Select your University/College</option>
                      {universities.map((uni) => (
                        <option key={uni} value={uni}>{uni}</option>
                      ))}
                    </select>
                    <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">arrow_drop_down</span>
                  </div>
                </div>

                {/* Programme/Major */}
                <div className="space-y-1.5 col-span-1 md:col-span-2">
                  <label className="block font-semibold text-xs text-slate-500 uppercase px-1" htmlFor="course">Programme / Major</label>
                  <div className="relative group">
                    <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors">auto_stories</span>
                    <input 
                      required
                      type="text" 
                      id="course" 
                      name="course"
                      value={formData.course}
                      onChange={handleChange}
                      placeholder="e.g. BSc. Computer Engineering" 
                      className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:border-2 focus:border-primary focus:ring-0 transition-all text-sm outline-none placeholder:text-slate-400/60"
                    />
                  </div>
                </div>

                {/* Phone Number */}
                <div className="space-y-1.5 col-span-1">
                  <label className="block font-semibold text-xs text-slate-500 uppercase px-1" htmlFor="phone">Phone Number</label>
                  <div className="relative group">
                    <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors">call</span>
                    <input 
                      required
                      type="tel" 
                      id="phone" 
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+233 XX XXX XXXX" 
                      className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:border-2 focus:border-primary focus:ring-0 transition-all text-sm outline-none placeholder:text-slate-400/60"
                    />
                  </div>
                </div>

                {/* Email Address */}
                <div className="space-y-1.5 col-span-1">
                  <label className="block font-semibold text-xs text-slate-500 uppercase px-1" htmlFor="email">Email Address <span className="text-slate-400 font-normal normal-case ml-1">(Optional)</span></label>
                  <div className="relative group">
                    <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors">mail</span>
                    <input 
                      type="email" 
                      id="email" 
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="john.doe@student.edu" 
                      className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:border-2 focus:border-primary focus:ring-0 transition-all text-sm outline-none placeholder:text-slate-400/60"
                    />
                  </div>
                </div>

                {/* Password */}
                <div className="space-y-1.5 col-span-1 md:col-span-2">
                  <label className="block font-semibold text-xs text-slate-500 uppercase px-1" htmlFor="password">Security Password</label>
                  <div className="relative group">
                    <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors">lock</span>
                    <input 
                      required
                      type={showPassword ? 'text' : 'password'} 
                      id="password" 
                      name="password"
                      value={formData.password}
                      onChange={handlePasswordChange}
                      placeholder="••••••••••••" 
                      className="w-full pl-12 pr-12 py-3.5 bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:border-2 focus:border-primary focus:ring-0 transition-all text-sm outline-none placeholder:text-slate-400/60"
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
                  
                  {/* Password Strength Indicator */}
                  <div className="mt-3 px-1">
                    <div className="flex gap-2 h-1.5 mb-2">
                      <div className={`h-full flex-1 rounded-full transition-all duration-300 ${passwordStrength.level >= 1 ? (passwordStrength.level === 1 ? 'bg-primary' : (passwordStrength.level === 2 ? 'bg-amber-500' : (passwordStrength.level === 3 ? 'bg-indigo-500' : 'bg-green-500'))) : 'bg-slate-200'}`}></div>
                      <div className={`h-full flex-1 rounded-full transition-all duration-300 ${passwordStrength.level >= 2 ? (passwordStrength.level === 2 ? 'bg-amber-500' : (passwordStrength.level === 3 ? 'bg-indigo-500' : 'bg-green-500')) : 'bg-slate-200'}`}></div>
                      <div className={`h-full flex-1 rounded-full transition-all duration-300 ${passwordStrength.level >= 3 ? (passwordStrength.level === 3 ? 'bg-indigo-500' : 'bg-green-500') : 'bg-slate-200'}`}></div>
                      <div className={`h-full flex-1 rounded-full transition-all duration-300 ${passwordStrength.level >= 4 ? 'bg-green-500' : 'bg-slate-200'}`}></div>
                    </div>
                    <p className={`text-xs font-semibold ${passwordStrength.colorClass}`}>
                      {passwordStrength.text}
                    </p>
                  </div>
                </div>
              </div>

              {/* Information Notice */}
              <div className="bg-slate-50 border-l-4 border-secondary p-4 flex gap-3 items-start mt-6 rounded-r-xl">
                <span className="material-symbols-outlined text-secondary text-[20px]">info</span>
                <p className="text-xs text-slate-500 italic leading-tight">
                  By proceeding, you agree to our verification process. TN Universities Connect ensures your academic credentials match institutional records for premium access.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="pt-6 flex flex-col sm:flex-row gap-4">
                <button 
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 bg-primary text-white py-4 rounded-xl font-bold text-sm shadow-xl shadow-primary/20 hover:brightness-110 active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  {isSubmitting ? (
                    <>
                      <span className="material-symbols-outlined animate-spin text-lg">progress_activity</span>
                      Processing...
                    </>
                  ) : (
                    <>
                      Save and Continue
                      <span className="material-symbols-outlined text-lg">arrow_forward</span>
                    </>
                  )}
                </button>
                <button 
                  type="button"
                  onClick={() => navigateTo('home')}
                  className="px-6 py-4 text-slate-500 hover:text-navy font-bold text-sm hover:bg-slate-100 transition-colors rounded-xl text-center"
                >
                  Cancel
                </button>
              </div>
              
              <p className="text-center text-sm font-semibold text-slate-500 mt-6">
                Already a member? <button type="button" onClick={() => navigateTo('login')} className="text-primary font-bold hover:underline transition-all cursor-pointer">Sign in instead</button>
              </p>
            </form>
          </div>

        </div>
      </div>


    </main>
  )
}

export default Registration
