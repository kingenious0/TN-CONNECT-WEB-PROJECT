import { useState } from 'react'

function Navbar({ currentPage, navigateTo }) {
  const [isOpen, setIsOpen] = useState(false)

  const links = [
    { name: 'Home', id: 'home' },
    { name: 'About', id: 'about' },
    { name: 'Contact', id: 'contact' },
    { name: 'Registration', id: 'registration' }
  ]

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
          <button 
            onClick={() => navigateTo('login')}
            className={`px-8 py-2.5 rounded-lg transition-all shadow-md active:scale-95 cursor-pointer text-white ${
              currentPage === 'login' ? 'bg-primary' : 'bg-navy hover:bg-primary'
            }`}
          >
            Login
          </button>
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
        <div className="md:hidden bg-white border-b border-slate-200 px-6 py-4 flex flex-col gap-4 font-semibold text-base shadow-lg absolute w-full left-0">
          {links.map((link) => (
            <button
              key={link.id}
              onClick={() => {
                navigateTo(link.id)
                setIsOpen(false)
              }}
              className={`text-left py-2 cursor-pointer transition-colors ${
                currentPage === link.id ? 'text-primary' : 'text-navy/70'
              }`}
            >
              {link.name}
            </button>
          ))}
          <button 
            onClick={() => {
              navigateTo('login')
              setIsOpen(false)
            }}
            className={`px-6 py-3 rounded-lg text-center transition-all shadow-md active:scale-95 cursor-pointer w-full text-white ${
              currentPage === 'login' ? 'bg-primary' : 'bg-navy hover:bg-primary'
            }`}
          >
            Login
          </button>
        </div>
      )}
    </nav>
  )
}

export default Navbar
