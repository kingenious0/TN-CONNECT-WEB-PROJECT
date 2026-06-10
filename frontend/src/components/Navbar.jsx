import { useState, useRef, useEffect } from 'react'

function Navbar({ currentPage, navigateTo }) {
  const [isOpen, setIsOpen] = useState(false)
  const [showDropdown, setShowDropdown] = useState(false)
  const dropdownRef = useRef(null)
  const dropdownTimeout = useRef(null)

  const links = [
    { name: 'Home', id: 'home' },
    { name: 'About', id: 'about' },
    { name: 'Contact', id: 'contact' }
  ]

  const authLinks = [
    { name: 'Sign Up', id: 'registration', icon: 'person_add', desc: 'Create a new account' },
    { name: 'Sign In', id: 'login', icon: 'login', desc: 'Access your dashboard' }
  ]

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowDropdown(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleDropdownEnter = () => {
    clearTimeout(dropdownTimeout.current)
    setShowDropdown(true)
  }

  const handleDropdownLeave = () => {
    dropdownTimeout.current = setTimeout(() => {
      setShowDropdown(false)
    }, 200)
  }

  const isAuthPage = currentPage === 'login' || currentPage === 'registration'

  return (
    <nav className="w-full fixed top-0 left-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-200">
      <div className="flex justify-between items-center px-6 md:px-16 max-w-7xl mx-auto h-20">
        
        {/* Logo and Brand */}
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigateTo('home')}>
          <img 
            alt="TN Universities Connect Logo" 
            className="h-12 w-auto object-contain" 
            src="https://lh3.googleusercontent.com/aida/AP1WRLu_SpP1LgQ87QvvQaushQ0RzJQBjt2dc8-fFszHW2t7Cunz4GjS123FO-2QoqJOj_KwWuGW4XNkoXz-rizvN92dP-GerCk0G8NmT0ThuuNRBcMwF-NnQUW2vqnp3ZbYlxE5Lyci5hVgxSMi19SKS3AyV6dKPb0Z-Oge227EwjCBdRs9J336dYENPXllu-UBHXammk0aHPDuu9H4FSG6cSAoTfVatN3bPO3nBMAVe0_kF-ehf9A3TvJEY3w" 
          />
          <span className="font-display text-2xl font-bold text-navy hidden sm:inline">TN Universities Connect</span>
        </div>
 
        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center gap-8 font-semibold text-sm">
          {links.map((link) => (
            <button
              key={link.id}
              onClick={() => navigateTo(link.id)}
              className={`transition-colors cursor-pointer pb-1 ${
                currentPage === link.id
                  ? 'text-primary border-b-2 border-primary'
                  : 'text-navy/70 hover:text-primary'
              }`}
            >
              {link.name}
            </button>
          ))}

          {/* Get Started Dropdown */}
          <div 
            className="relative"
            ref={dropdownRef}
            onMouseEnter={handleDropdownEnter}
            onMouseLeave={handleDropdownLeave}
          >
            <button 
              onClick={() => setShowDropdown(!showDropdown)}
              className={`px-7 py-2.5 rounded-xl transition-all shadow-md active:scale-95 cursor-pointer text-white flex items-center gap-2 ${
                isAuthPage ? 'bg-primary' : 'bg-navy hover:bg-primary'
              }`}
            >
              Get Started
              <span 
                className={`material-symbols-outlined text-[18px] transition-transform duration-300 ${showDropdown ? 'rotate-180' : ''}`}
              >
                expand_more
              </span>
            </button>

            {/* Dropdown Panel */}
            <div 
              className={`absolute right-0 top-full mt-3 w-64 bg-white rounded-2xl shadow-2xl border border-slate-200/80 overflow-hidden transition-all duration-300 origin-top-right ${
                showDropdown 
                  ? 'opacity-100 scale-100 translate-y-0 pointer-events-auto' 
                  : 'opacity-0 scale-95 -translate-y-2 pointer-events-none'
              }`}
            >
              {/* Accent stripe */}
              <div className="h-1 bg-gradient-to-r from-primary via-tertiary to-secondary"></div>

              <div className="p-2">
                {authLinks.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      navigateTo(item.id)
                      setShowDropdown(false)
                    }}
                    className={`w-full flex items-center gap-4 px-4 py-3.5 rounded-xl transition-all cursor-pointer group ${
                      currentPage === item.id
                        ? 'bg-primary/5 text-primary'
                        : 'text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${
                      currentPage === item.id
                        ? 'bg-primary/10 text-primary'
                        : 'bg-slate-100 text-slate-500 group-hover:bg-primary/10 group-hover:text-primary'
                    }`}>
                      <span className="material-symbols-outlined text-[20px]">{item.icon}</span>
                    </div>
                    <div className="text-left">
                      <p className="font-bold text-sm">{item.name}</p>
                      <p className={`text-xs mt-0.5 ${
                        currentPage === item.id ? 'text-primary/60' : 'text-slate-400'
                      }`}>{item.desc}</p>
                    </div>
                    {currentPage === item.id && (
                      <span className="material-symbols-outlined text-primary text-[18px] ml-auto" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Hamburger Button */}
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-primary focus:outline-none cursor-pointer"
        >
          <span className="material-symbols-outlined text-3xl">
            {isOpen ? 'close' : 'menu'}
          </span>
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-b border-slate-200 px-6 py-4 flex flex-col gap-1 font-semibold text-base shadow-lg absolute w-full left-0">
          {links.map((link) => (
            <button
              key={link.id}
              onClick={() => {
                navigateTo(link.id)
                setIsOpen(false)
              }}
              className={`text-left py-3 px-3 rounded-xl cursor-pointer transition-colors ${
                currentPage === link.id ? 'text-primary bg-primary/5' : 'text-navy/70'
              }`}
            >
              {link.name}
            </button>
          ))}

          {/* Auth Section Divider */}
          <div className="my-2 border-t border-slate-100"></div>
          <p className="text-[10px] uppercase tracking-[0.2em] text-slate-400 font-bold px-3 mb-1">Account</p>
          
          {authLinks.map((item) => (
            <button 
              key={item.id}
              onClick={() => {
                navigateTo(item.id)
                setIsOpen(false)
              }}
              className={`flex items-center gap-3 py-3 px-3 rounded-xl transition-all cursor-pointer w-full ${
                currentPage === item.id 
                  ? 'bg-primary/5 text-primary' 
                  : 'text-navy/70 hover:bg-slate-50'
              }`}
            >
              <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${
                currentPage === item.id 
                  ? 'bg-primary/10 text-primary' 
                  : 'bg-slate-100 text-slate-500'
              }`}>
                <span className="material-symbols-outlined text-[18px]">{item.icon}</span>
              </div>
              <div className="text-left">
                <p className="font-bold text-sm">{item.name}</p>
                <p className="text-[11px] text-slate-400">{item.desc}</p>
              </div>
            </button>
          ))}
        </div>
      )}
    </nav>
  )
}

export default Navbar
