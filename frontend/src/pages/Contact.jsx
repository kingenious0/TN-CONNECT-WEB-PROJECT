import { useState } from 'react'
import Hero from '../components/Hero'

function Contact() {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    subject: 'Technical Support',
    message: ''
  })
  const [status, setStatus] = useState('idle') // idle, sending, success

  const handleSubmit = (e) => {
    e.preventDefault()
    setStatus('sending')
    
    setTimeout(() => {
      setStatus('success')
      setFormState({
        name: '',
        email: '',
        subject: 'Technical Support',
        message: ''
      })
      
      setTimeout(() => {
        setStatus('idle')
      }, 3000)
    }, 1500)
  }

  const handleChange = (e) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value
    })
  }

  return (
    <div className="flex-grow">
      {/* Hero Section */}
      <Hero
        title={<>Get in Touch with the <span className="text-gradient">Connect</span> Experts</>}
        subtitle="We're here to guide, work, and inspire. Whether you have questions about registration or technical issues, our team is ready to assist."
      />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 md:px-16 py-24">

      {/* Bento Layout for Content */}
      <div className="grid grid-cols-12 gap-8">
        
        {/* Contact Form Section (Bento Large) */}
        <section className="col-span-12 lg:col-span-7 bg-white border border-slate-200 p-8 md:p-12 shadow-sm rounded-2xl kinetic-border">
          <h2 className="font-display text-2xl text-navy mb-8 font-bold">Send us a Message</h2>
          <form className="grid grid-cols-1 md:grid-cols-2 gap-6" onSubmit={handleSubmit}>
            
            {/* Full Name */}
            <div className="flex flex-col gap-2">
              <label className="font-bold text-xs text-slate-500 uppercase">Full Name</label>
              <input 
                required
                type="text"
                name="name"
                value={formState.name}
                onChange={handleChange}
                placeholder="John Doe"
                className="w-full h-12 bg-white border border-slate-300 rounded-xl px-4 focus:border-2 focus:border-primary focus:ring-0 transition-all outline-none text-sm"
              />
            </div>

            {/* Email Address */}
            <div className="flex flex-col gap-2">
              <label className="font-bold text-xs text-slate-500 uppercase">Email Address</label>
              <input 
                required
                type="email"
                name="email"
                value={formState.email}
                onChange={handleChange}
                placeholder="john@example.com"
                className="w-full h-12 bg-white border border-slate-300 rounded-xl px-4 focus:border-2 focus:border-primary focus:ring-0 transition-all outline-none text-sm"
              />
            </div>

            {/* Subject */}
            <div className="flex flex-col gap-2 md:col-span-2">
              <label className="font-bold text-xs text-slate-500 uppercase">Subject</label>
              <select 
                name="subject"
                value={formState.subject}
                onChange={handleChange}
                className="w-full h-12 bg-white border border-slate-300 rounded-xl px-4 focus:border-2 focus:border-primary focus:ring-0 transition-all outline-none text-sm"
              >
                <option value="Technical Support">Technical Support</option>
                <option value="Registration Inquiry">Registration Inquiry</option>
                <option value="Partnership Proposal">Partnership Proposal</option>
                <option value="Other">Other</option>
              </select>
            </div>

            {/* Message */}
            <div className="flex flex-col gap-2 md:col-span-2">
              <label className="font-bold text-xs text-slate-500 uppercase">Message</label>
              <textarea 
                required
                name="message"
                value={formState.message}
                onChange={handleChange}
                placeholder="How can we help you today?" 
                rows="5"
                className="w-full bg-white border border-slate-300 rounded-xl p-4 focus:border-2 focus:border-primary focus:ring-0 transition-all outline-none text-sm"
              ></textarea>
            </div>

            {/* Submit Button */}
            <div className="md:col-span-2">
              <button 
                type="submit"
                disabled={status !== 'idle'}
                className={`w-full md:w-auto px-8 py-3.5 text-white font-bold rounded-xl shadow-md transition-all active:scale-95 cursor-pointer text-sm flex items-center justify-center gap-2 ${
                  status === 'success' 
                    ? 'bg-green-600' 
                    : 'bg-primary hover:opacity-90'
                }`}
              >
                {status === 'idle' && 'Send Message'}
                {status === 'sending' && (
                  <>
                    <span className="material-symbols-outlined animate-spin text-lg">refresh</span> 
                    Sending...
                  </>
                )}
                {status === 'success' && (
                  <>
                    <span className="material-symbols-outlined text-lg">check_circle</span> 
                    Sent Successfully
                  </>
                )}
              </button>
            </div>
          </form>
        </section>

        {/* Sidebar Info (Bento Small Blocks) */}
        <aside className="col-span-12 lg:col-span-5 flex flex-col gap-8">
          
          {/* Support Channels */}
          <div className="bg-primary text-white p-8 rounded-2xl shadow-md flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-3xl">headset_mic</span>
              <h3 className="font-display text-2xl font-bold">Direct Support</h3>
            </div>
            <p className="opacity-95 text-xs md:text-sm leading-relaxed">
              Expect a response within 24 hours from our dedicated support team.
            </p>
            
            <div className="mt-4 space-y-4">
              <div className="flex items-center gap-4 group cursor-pointer">
                <div className="w-12 h-12 bg-white/10 flex items-center justify-center rounded-lg group-hover:bg-white group-hover:text-primary transition-all">
                  <span className="material-symbols-outlined">mail</span>
                </div>
                <div>
                  <p className="opacity-75 text-xs font-bold uppercase">Support Email</p>
                  <p className="font-display text-lg font-bold">support@tnconnect.com</p>
                </div>
              </div>
              <div className="flex items-center gap-4 group cursor-pointer">
                <div className="w-12 h-12 bg-white/10 flex items-center justify-center rounded-lg group-hover:bg-white group-hover:text-primary transition-all">
                  <span className="material-symbols-outlined">call</span>
                </div>
                <div>
                  <p className="opacity-75 text-xs font-bold uppercase">Ghana Office</p>
                  <p className="font-display text-lg font-bold">+233 24 000 0000</p>
                </div>
              </div>
            </div>
          </div>

          {/* Location Detail */}
          <div className="bg-white border border-slate-200 p-8 rounded-2xl shadow-sm">
            <h3 className="font-display text-xl text-navy mb-4 font-bold flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">location_on</span>
              Headquarters
            </h3>
            <address className="not-italic text-sm md:text-base text-slate-500 mb-6 leading-relaxed">
              TN Universities Connect<br />
              Liberation Road, Airport Area<br />
              Accra, Ghana
            </address>
            
            {/* Static Map Image */}
            <div className="w-full h-48 bg-slate-100 overflow-hidden rounded-xl relative border border-slate-200">
              <img 
                className="w-full h-full object-cover grayscale contrast-125" 
                alt="Map representation of office in Accra" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDf2Lzw6GSSVEslyOnRL5F_a6zi47FxwdsZUKv3n-czgFDMkfnfUXbOctM2a4NaJ-pHBzbH0HcDlOBVTNPKv_gPC91mPokwzOot5lScSN_XQUQ9E3oFPRV3LrAmku7DEAb5E2UNZU2JQzpS-SuQyOxqGx8ciFMMoXTifa7APVRyFGjs-m6Rn9xORvROM9wGZa4kJV79o_9gXVDBQX9tQDdbi6KYHY7sVCMyNBMLrDXnNtq6bnf6fDhsHJJtHlCZgQxHbe70qSFBEXH4"
              />
              <div className="absolute inset-0 bg-primary/10 mix-blend-multiply"></div>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <span className="material-symbols-outlined text-primary text-4xl" style={{ fontVariationSettings: "'FILL' 1" }}>location_on</span>
              </div>
            </div>
          </div>

          {/* Hours */}
          <div className="bg-slate-100 border-l-4 border-secondary p-6 rounded-r-xl">
            <p className="font-bold text-xs text-secondary mb-2 uppercase tracking-wider">Operational Hours</p>
            <div className="flex justify-between text-sm text-navy">
              <span>Monday — Friday</span>
              <span className="font-bold">08:00 AM — 05:00 PM</span>
            </div>
            <div className="flex justify-between text-xs text-slate-500 mt-2">
              <span>Sat & Sun</span>
              <span>Closed</span>
            </div>
          </div>
        </aside>
      </div>

      {/* Social & Quick Links Grid */}
      <section className="mt-24 grid grid-cols-1 md:grid-cols-4 gap-8 border-t border-slate-200 pt-12">
        <div>
          <img 
            alt="TN Universities Connect Logo" 
            className="h-12 w-auto mb-4 object-contain" 
            src="https://lh3.googleusercontent.com/aida/AP1WRLu_SpP1LgQ87QvvQaushQ0RzJQBjt2dc8-fFszHW2t7Cunz4GjS123FO-2QoqJOj_KwWuGW4XNkoXz-rizvN92dP-GerCk0G8NmT0ThuuNRBcMwF-NnQUW2vqnp3ZbYlxE5Lyci5hVgxSMi19SKS3AyV6dKPb0Z-Oge227EwjCBdRs9J336dYENPXllu-UBHXammk0aHPDuu9H4FSG6cSAoTfVatN3bPO3nBMAVe0_kF-ehf9A3TvJEY3w" 
          />
          <p className="text-xs text-slate-400 leading-relaxed">
            © 2026 TN Universities Connect. Empowering Ghana's tertiary ecosystem through digital integration.
          </p>
        </div>
        
        <div className="flex flex-col gap-3">
          <h4 className="font-bold text-sm text-primary uppercase">Social Channels</h4>
          <div className="flex gap-4">
            <a href="#" className="w-10 h-10 border border-slate-300 flex items-center justify-center hover:bg-primary hover:text-white rounded-lg transition-all text-slate-500">
              <span className="material-symbols-outlined text-lg">share</span>
            </a>
            <a href="#" className="w-10 h-10 border border-slate-300 flex items-center justify-center hover:bg-primary hover:text-white rounded-lg transition-all text-slate-500">
              <span className="material-symbols-outlined text-lg">rss_feed</span>
            </a>
            <a href="#" className="w-10 h-10 border border-slate-300 flex items-center justify-center hover:bg-primary hover:text-white rounded-lg transition-all text-slate-500">
              <span className="material-symbols-outlined text-lg">forum</span>
            </a>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <h4 className="font-bold text-sm text-primary uppercase">Legal</h4>
          <ul className="space-y-2 text-xs md:text-sm font-semibold text-slate-500">
            <li><a href="#" className="hover:text-primary transition-colors">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-primary transition-colors">Terms of Service</a></li>
          </ul>
        </div>

        <div className="flex flex-col gap-3">
          <h4 className="font-bold text-sm text-primary uppercase">Need Help Fast?</h4>
          <p className="text-xs text-slate-400 mb-1">Check our FAQ for instant answers.</p>
          <a href="#" className="text-primary font-bold text-xs md:text-sm flex items-center gap-1 group">
            View Help Center 
            <span className="material-symbols-outlined text-lg group-hover:translate-x-1 transition-transform">arrow_forward</span>
          </a>
        </div>
      </section>
    </main>
    </div>
  )
}

export default Contact
