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
            <div className="flex gap-5">
              <a className="w-12 h-12 rounded-lg bg-white/5 flex items-center justify-center hover:bg-primary transition-all border border-white/10" href="#" aria-label="Share">
                <span className="material-symbols-outlined text-[20px]">share</span>
              </a>
              <a className="w-12 h-12 rounded-lg bg-white/5 flex items-center justify-center hover:bg-primary transition-all border border-white/10" href="#" aria-label="Website">
                <span className="material-symbols-outlined text-[20px]">public</span>
              </a>
              <a className="w-12 h-12 rounded-lg bg-white/5 flex items-center justify-center hover:bg-primary transition-all border border-white/10" href="#" aria-label="Podcasts">
                <span className="material-symbols-outlined text-[20px]">podcasts</span>
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
