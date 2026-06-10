function Footer({ navigateTo }) {
  return (
    <footer className="w-full bg-navy text-white pt-24 pb-12">
      <div className="px-6 md:px-16 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-16 mb-20">
          
          {/* Brand Col */}
          <div className="md:col-span-5">
            <div className="font-display text-3xl font-black text-white mb-8 tracking-tighter cursor-pointer" onClick={() => navigateTo('home')}>
              TN Universities Connect
            </div>
            <p className="font-body text-white/60 max-w-md mb-10 leading-relaxed text-sm md:text-base">
              The definitive platform for academic networking and institutional connectivity across Ghana.
            </p>
            <div className="flex gap-5">
              <a href="#" className="w-12 h-12 rounded-lg bg-white/5 flex items-center justify-center hover:bg-primary transition-all border border-white/10">
                <span className="material-symbols-outlined text-[20px]">share</span>
              </a>
              <a href="#" className="w-12 h-12 rounded-lg bg-white/5 flex items-center justify-center hover:bg-primary transition-all border border-white/10">
                <span className="material-symbols-outlined text-[20px]">public</span>
              </a>
              <a href="#" className="w-12 h-12 rounded-lg bg-white/5 flex items-center justify-center hover:bg-primary transition-all border border-white/10">
                <span className="material-symbols-outlined text-[20px]">podcasts</span>
              </a>
            </div>
          </div>

          {/* Nav Col */}
          <div className="md:col-span-2">
            <h4 className="font-display text-secondary font-bold uppercase tracking-widest mb-8 text-sm">Navigation</h4>
            <ul className="space-y-4 text-sm font-semibold text-white/70">
              <li><button onClick={() => navigateTo('home')} className="hover:text-primary transition-colors cursor-pointer text-left">Home</button></li>
              <li><button onClick={() => navigateTo('about')} className="hover:text-primary transition-colors cursor-pointer text-left">About Us</button></li>
              <li><button onClick={() => navigateTo('contact')} className="hover:text-primary transition-colors cursor-pointer text-left">Contact</button></li>
              <li><button onClick={() => navigateTo('registration')} className="hover:text-primary transition-colors cursor-pointer text-left">Registration</button></li>
            </ul>
          </div>

          {/* Legal Col */}
          <div className="md:col-span-2">
            <h4 className="font-display text-secondary font-bold uppercase tracking-widest mb-8 text-sm">Legal</h4>
            <ul className="space-y-4 text-sm font-semibold text-white/70">
              <li><a href="#" className="hover:text-primary transition-colors">Privacy</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Terms</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Security</a></li>
            </ul>
          </div>

          {/* Contact Col */}
          <div className="md:col-span-3">
            <h4 className="font-display text-secondary font-bold uppercase tracking-widest mb-8 text-sm">Contact</h4>
            <ul className="space-y-5 text-sm font-semibold text-white/70">
              <li className="flex items-start gap-3">
                <span className="material-symbols-outlined text-primary">mail</span>
                <span className="break-all">contact@kineticauthority.edu</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="material-symbols-outlined text-primary">location_on</span>
                <span>Kinetic Plaza, Floor 12<br />Metropolis, NY 10001</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6 text-white/40 text-xs font-bold uppercase tracking-widest">
          <p>© 2026 TN Universities Connect</p>
          <div className="flex gap-8">
            <span>Professional Grade</span>
            <span>v3.0.0 Alpha</span>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
