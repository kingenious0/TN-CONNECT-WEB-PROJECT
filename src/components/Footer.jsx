import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full bg-navy text-white pt-24 pb-12" role="contentinfo" aria-label="Site footer">
      <div className="px-margin-mobile md:px-margin-desktop max-w-max-width-content mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-16 mb-20">
          
          {/* Brand Column */}
          <div className="md:col-span-5">
            <div className="font-headline-lg text-3xl font-black text-white mb-8 tracking-tighter" style={{ fontFamily: "var(--font-display)" }}>
              TN CONNECT
            </div>
            <p className="font-body-md text-white/60 max-w-md mb-10 leading-relaxed">
              The definitive platform for academic networking and institutional connectivity. Connecting students and alumni.
            </p>
            <div className="flex gap-4">
              <a className="w-11 h-11 rounded-lg bg-white/5 flex items-center justify-center hover:bg-primary transition-all border border-white/10 text-white/70 hover:text-white" href="#" aria-label="Instagram">
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/>
                </svg>
              </a>
              <a className="w-11 h-11 rounded-lg bg-white/5 flex items-center justify-center hover:bg-primary transition-all border border-white/10 text-white/70 hover:text-white" href="#" aria-label="TikTok">
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.02 1.59 4.19 1.12 1.23 2.72 1.96 4.37 2.11v3.82c-1.87-.07-3.67-.88-4.96-2.24-.07-.07-.13-.15-.2-.22v7.54c-.05 2.19-.89 4.33-2.45 5.86-1.74 1.76-4.22 2.66-6.69 2.38-2.61-.24-5-1.92-5.99-4.37C1.04 14.44 1.41 11.23 3.2 9.07c1.54-1.9 4-2.9 6.45-2.64v3.91c-1.39-.17-2.83.33-3.69 1.45-.92 1.14-1.07 2.76-.39 4.07.64 1.28 2.05 2.08 3.48 2.01 1.51-.01 2.87-1.11 3.16-2.58.07-.36.09-.72.09-1.09V0c-.13.02-.25.02-.37.02z"/>
                </svg>
              </a>
              <a className="w-11 h-11 rounded-lg bg-white/5 flex items-center justify-center hover:bg-primary transition-all border border-white/10 text-white/70 hover:text-white" href="#" aria-label="LinkedIn">
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </a>
              <a className="w-11 h-11 rounded-lg bg-white/5 flex items-center justify-center hover:bg-primary transition-all border border-white/10 text-white/70 hover:text-white" href="#" aria-label="Facebook">
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Navigation Column */}
          <div className="md:col-span-2">
            <h4 className="font-bold text-secondary uppercase tracking-widest mb-8 text-sm" style={{ fontFamily: "var(--font-sans)" }}>
              Navigation
            </h4>
            <ul className="space-y-4 font-medium text-white/70 text-sm">
              <li><Link className="hover:text-primary transition-colors" href="/">Home</Link></li>
              <li><Link className="hover:text-primary transition-colors" href="/about">About</Link></li>
              <li><Link className="hover:text-primary transition-colors" href="/contact">Contact</Link></li>
              <li><Link className="hover:text-primary transition-colors" href="/registration">Registration</Link></li>
            </ul>
          </div>

          {/* Legal Column */}
          <div className="md:col-span-2">
            <h4 className="font-bold text-secondary uppercase tracking-widest mb-8 text-sm" style={{ fontFamily: "var(--font-sans)" }}>
              Legal
            </h4>
            <ul className="space-y-4 font-medium text-white/70 text-sm">
              <li><Link className="hover:text-primary transition-colors" href="/privacy">Privacy</Link></li>
              <li><Link className="hover:text-primary transition-colors" href="/terms">Terms</Link></li>
              <li><Link className="hover:text-primary transition-colors" href="/security">Security</Link></li>
            </ul>
          </div>

          {/* Contact Column */}
          <div className="md:col-span-3">
            <h4 className="font-bold text-secondary uppercase tracking-widest mb-8 text-sm" style={{ fontFamily: "var(--font-sans)" }}>
              Contact
            </h4>
            <ul className="space-y-5 font-medium text-white/70 text-sm">
              <li className="flex items-start gap-3 overflow-hidden">
                <span className="material-symbols-outlined text-primary shrink-0">mail</span>
                <span className="break-all">ask@tnuniversitiesconnect.com</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="material-symbols-outlined text-primary shrink-0">location_on</span>
                <span>Kumasi, Ghana</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6 text-white/40 text-sm font-bold uppercase tracking-widest" style={{ fontFamily: "var(--font-sans)" }}>
          <p>© 2026 TN CONNECT. All rights reserved.</p>
          <div className="flex gap-8">
          </div>
        </div>
      </div>
    </footer>
  );
}
