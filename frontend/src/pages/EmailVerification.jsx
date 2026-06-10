import { useState } from 'react'

function EmailVerification({ navigateTo }) {
  const [method, setMethod] = useState('code') // 'code' or 'link'
  const [code, setCode] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)

  // Link simulation states
  const [linkStep, setLinkStep] = useState(0) // 0: Idle, 1: Loading 1, 2: Loading 2, 3: Success
  const linkMessages = [
    'Reading verification token...',
    'Validating secure signature...',
    'Updating account verification status...'
  ]

  const handleCodeSubmit = (e) => {
    e.preventDefault()
    setSubmitting(true)
    setTimeout(() => {
      setSubmitting(false)
      if (code === '123456') {
        setSuccess(true)
      } else {
        alert('Invalid email verification code. For demo, use 123456')
        setCode('')
      }
    }, 1500)
  }

  const startLinkSimulation = () => {
    setLinkStep(1)
    
    setTimeout(() => {
      setLinkStep(2)
      
      setTimeout(() => {
        setLinkStep(3)
        
        setTimeout(() => {
          setLinkStep(4)
          setSuccess(true)
        }, 1200)
      }, 1200)
    }, 1200)
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
          
          {/* Tab Selection */}
          {!success && linkStep === 0 && (
            <div className="flex mb-8 bg-white/10 p-1.5 rounded-2xl border border-white/10 mx-4 md:mx-0">
              <button
                type="button"
                className={`flex-grow py-3 px-6 rounded-xl font-bold text-sm transition-all duration-300 cursor-pointer ${
                  method === 'code'
                    ? 'bg-white text-navy shadow-md'
                    : 'text-white/70 hover:text-white'
                }`}
                onClick={() => setMethod('code')}
              >
                Enter Code
              </button>
              <button
                type="button"
                className={`flex-grow py-3 px-6 rounded-xl font-bold text-sm transition-all duration-300 cursor-pointer ${
                  method === 'link'
                    ? 'bg-white text-navy shadow-md'
                    : 'text-white/70 hover:text-white'
                }`}
                onClick={() => setMethod('link')}
              >
                Link Simulator
              </button>
            </div>
          )}

          {/* Card Container */}
          <div className="bg-white text-slate-800 rounded-none md:rounded-3xl p-6 md:p-10 shadow-none md:shadow-2xl border-y md:border border-slate-200/50 relative overflow-hidden w-full">
            {/* Decorative Accent Stripe */}
            <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-primary via-tertiary to-secondary"></div>
            
            {success ? (
              <div className="text-center py-6 space-y-6">
                <span className="material-symbols-outlined text-6xl text-green-600 animate-scale-in rounded-full bg-green-100 p-2">
                  mark_email_read
                </span>
                <h1 className="font-display text-2xl md:text-3xl text-navy font-bold">Email Verified Successfully</h1>
                <p className="text-slate-500 text-sm max-w-xs mx-auto leading-relaxed">
                  Thank you! Your email address has been successfully verified. You can now access all portal features.
                </p>
                <div className="pt-4">
                  <button
                    onClick={() => navigateTo('login')}
                    className="w-full bg-primary text-white py-4 rounded-xl font-bold shadow-xl shadow-primary/30 hover:brightness-110 transition-all flex items-center justify-center gap-2 cursor-pointer text-sm"
                  >
                    Sign In to Dashboard
                    <span className="material-symbols-outlined">arrow_forward</span>
                  </button>
                </div>
              </div>
            ) : method === 'code' ? (
              <>
                <header className="mb-8 text-center md:text-left">
                  <h1 className="font-display text-2xl md:text-3xl text-navy font-bold mb-2">Verify Your Email</h1>
                  <p className="text-slate-500 text-sm leading-relaxed">
                    We sent a verification code to your email. Enter it below to activate your account.
                    <br />
                    <span className="text-xs text-primary/75 font-semibold mt-2 block">
                      (For demo, use code <span className="underline font-bold">123456</span>)
                    </span>
                  </p>
                </header>

                <form onSubmit={handleCodeSubmit} className="space-y-6">
                  <div className="space-y-1.5">
                    <label className="block font-semibold text-xs text-slate-500 uppercase px-1" htmlFor="emailCode">
                      Verification Code
                    </label>
                    <div className="relative group">
                      <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors">
                        pin
                      </span>
                      <input
                        id="emailCode"
                        type="text"
                        maxLength={6}
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                        placeholder="e.g. 123456"
                        required
                        className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:border-2 focus:border-primary focus:ring-0 outline-none transition-all text-sm placeholder:text-slate-400/60"
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
                        Verifying Email...
                      </>
                    ) : (
                      <>
                        Confirm Verification
                        <span className="material-symbols-outlined text-lg">check_circle</span>
                      </>
                    )}
                  </button>
                </form>
              </>
            ) : (
              /* Link Simulation */
              <div className="text-center py-4 space-y-6">
                {linkStep === 0 ? (
                  <>
                    <header className="mb-6">
                      <span className="material-symbols-outlined text-5xl text-primary mb-4">mail_lock</span>
                      <h1 className="font-display text-2xl md:text-3xl text-navy font-bold mb-2">Link Verification</h1>
                      <p className="text-slate-500 text-sm leading-relaxed max-w-xs mx-auto">
                        Simulate clicking the activation link sent to your inbox to instantly verify your profile.
                      </p>
                    </header>
                    <button
                      onClick={startLinkSimulation}
                      className="w-full bg-navy text-white py-4 rounded-xl font-bold shadow-md hover:bg-primary hover:shadow-xl active:scale-[0.99] transition-all flex items-center justify-center gap-2 cursor-pointer text-sm"
                    >
                      <span className="material-symbols-outlined text-lg">ads_click</span>
                      Simulate Verification Link Click
                    </button>
                  </>
                ) : (
                  <div className="space-y-6 py-6">
                    {/* Custom Spinner */}
                    <div className="relative w-20 h-20 mx-auto flex items-center justify-center">
                      <div className="absolute inset-0 rounded-full border-4 border-slate-100"></div>
                      <div className="absolute inset-0 rounded-full border-4 border-primary border-t-transparent animate-spin"></div>
                      <span className="material-symbols-outlined text-3xl text-primary">sync</span>
                    </div>

                    <div className="space-y-3">
                      <h3 className="font-display text-lg text-navy font-bold">Verifying Token</h3>
                      <div className="max-w-xs mx-auto text-xs space-y-2 text-left">
                        <div className={`flex items-center gap-2 ${linkStep >= 1 ? 'text-green-600 font-semibold' : 'text-slate-400'}`}>
                          <span className="material-symbols-outlined text-sm">{linkStep > 1 ? 'check_circle' : 'circle'}</span>
                          <span>{linkMessages[0]}</span>
                        </div>
                        <div className={`flex items-center gap-2 ${linkStep >= 2 ? 'text-green-600 font-semibold' : 'text-slate-400'}`}>
                          <span className="material-symbols-outlined text-sm">{linkStep > 2 ? 'check_circle' : 'circle'}</span>
                          <span>{linkMessages[1]}</span>
                        </div>
                        <div className={`flex items-center gap-2 ${linkStep >= 3 ? 'text-green-600 font-semibold' : 'text-slate-400'}`}>
                          <span className="material-symbols-outlined text-sm">{linkStep > 3 ? 'check_circle' : 'circle'}</span>
                          <span>{linkMessages[2]}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
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

export default EmailVerification
