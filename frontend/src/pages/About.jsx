import Hero from '../components/Hero'

function About({ navigateTo }) {
  return (
    <div className="flex-grow">
      {/* Hero Section */}
      <Hero
        title={<>Empowering the Next Generation of <span className="text-gold">Leaders</span>.</>}
        subtitle="TN Universities Connect is the premier ecosystem for university professionals and students, fostering high-octane collaboration and professional stability across academic boundaries."
        primaryBtnText="Join Our Mission"
        onPrimaryClick={() => navigateTo('registration')}
        secondaryBtnText="Learn More"
        onSecondaryClick={() => navigateTo('contact')}
      />

      {/* Featured Image Section */}
      <section className="relative z-20 px-6 md:px-16 max-w-4xl mx-auto mb-20 mt-12">
        <div className="relative group">
          <div className="absolute -inset-2 bg-gradient-to-r from-bright-red to-gold rounded-2xl blur opacity-25 group-hover:opacity-45 transition duration-1000"></div>
          <div className="relative bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-2xl">
            <img 
              alt="Student Collaboration" 
              className="w-full h-[450px] object-cover" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBDhD7TWuWHNb3qbLGq1k5mbEsLI4P0An74RS7l-vhKdqhEQOxlxkDrPxNtf0ECfpc5zSHW6nFYBDpNGTDXJK-WoFVDtd_ctFDL9He3QQGSmevg__S_mhy5V4sPXbCUW-DK25o-X9dLSNAB5WP9roHI06PZIZlemCBJl-Js_V0W9IBX1AquhLH5wdtCD1JGLMHlOggevSYo_Bid-pMYiN3M5rAe1uLlPVddCCgVXYosoC0WDpDsCJKS-GCJJar1gOiBa8dzyEX8o8_1"
            />
            <div className="absolute top-4 right-4 bg-navy px-4 py-2 text-white font-bold rounded shadow-lg border-l-4 border-gold text-xs uppercase tracking-wider">
              Est. 2024
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Stats (Bento Style) */}
      <section className="max-w-7xl mx-auto px-6 md:px-16 py-24">
        <div className="mb-12 text-center md:text-left">
          <h2 className="font-display text-4xl text-navy mb-4 font-bold">Our Foundation</h2>
          <div className="h-1 w-24 bg-bright-red"></div>
        </div>
        
        <div className="bento-grid">
          {/* Mission Card */}
          <div className="col-span-12 md:col-span-7 bg-white p-8 md:p-12 border border-slate-200 rounded-xl relative overflow-hidden group shadow-sm">
            <div className="absolute top-0 left-0 w-full h-1 bg-navy transition-all group-hover:h-2"></div>
            <span className="material-symbols-outlined text-navy text-5xl mb-6">rocket_launch</span>
            <h3 className="font-display text-2xl text-navy mb-4 font-bold">The Mission</h3>
            <p className="font-body text-slate-600 leading-relaxed text-sm md:text-base">
              To bridge the gap between academic theory and industry reality by creating a high-velocity connectivity hub. We provide the tools, networking, and support structures necessary for students and faculty to transition into commanding professional roles with absolute confidence and authority.
            </p>
            <div className="mt-8 grid grid-cols-2 gap-6">
              <div className="border-l-4 border-gold pl-4">
                <div className="text-4xl md:text-5xl text-navy font-black leading-none">25+</div>
                <div className="font-bold text-xs text-slate-500 uppercase tracking-wider mt-1">Partner Universities</div>
              </div>
              <div className="border-l-4 border-bright-red pl-4">
                <div className="text-4xl md:text-5xl text-navy font-black leading-none">10k+</div>
                <div className="font-bold text-xs text-slate-500 uppercase tracking-wider mt-1">Active Members</div>
              </div>
            </div>
          </div>

          {/* Who We Serve */}
          <div className="col-span-12 md:col-span-5 bg-navy text-white p-8 md:p-12 border border-navy rounded-xl flex flex-col justify-between shadow-sm">
            <div>
              <h3 className="font-display text-2xl text-gold mb-6 font-bold">Who We Serve</h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-gold mt-1">check_circle</span>
                  <div>
                    <span className="font-bold block text-sm md:text-base">Visionary Students</span>
                    <span className="text-white/70 text-xs md:text-sm">Undergraduates looking to dominate their career paths.</span>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-gold mt-1">check_circle</span>
                  <div>
                    <span className="font-bold block text-sm md:text-base">Academic Leaders</span>
                    <span className="text-white/70 text-xs md:text-sm">Faculty aiming to integrate real-world insights into curricula.</span>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-gold mt-1">check_circle</span>
                  <div>
                    <span className="font-bold block text-sm md:text-base">Industry Mentors</span>
                    <span className="text-white/70 text-xs md:text-sm">Professionals eager to guide the next wave of innovation.</span>
                  </div>
                </li>
              </ul>
            </div>
            <button 
              onClick={() => navigateTo('contact')}
              className="w-full mt-8 border-2 border-white/20 hover:border-gold hover:text-gold py-3 font-bold transition-all flex items-center justify-center gap-2 cursor-pointer text-sm"
            >
              Get Involved <span className="material-symbols-outlined">arrow_forward</span>
            </button>
          </div>

          {/* Core Values */}
          <div className="col-span-12 md:col-span-4 bg-white p-6 border border-slate-200 rounded-xl hover:border-navy transition-all group shadow-sm">
            <div className="w-12 h-12 bg-slate-100 rounded flex items-center justify-center mb-4 group-hover:bg-navy transition-colors">
              <span className="material-symbols-outlined text-navy group-hover:text-white">shield</span>
            </div>
            <h4 className="font-bold text-sm md:text-base mb-2">Professional Stability</h4>
            <p className="text-xs md:text-sm text-slate-500">We build foundations that resist the volatility of the modern market.</p>
          </div>
          
          <div className="col-span-12 md:col-span-4 bg-white p-6 border border-slate-200 rounded-xl hover:border-bright-red transition-all group shadow-sm">
            <div className="w-12 h-12 bg-slate-100 rounded flex items-center justify-center mb-4 group-hover:bg-bright-red transition-colors">
              <span className="material-symbols-outlined text-bright-red group-hover:text-white">bolt</span>
            </div>
            <h4 className="font-bold text-sm md:text-base mb-2">High-Octane Energy</h4>
            <p className="text-xs md:text-sm text-slate-500">Momentum is our currency. We drive action through decisive networking.</p>
          </div>

          <div className="col-span-12 md:col-span-4 bg-white p-6 border border-slate-200 rounded-xl hover:border-gold transition-all group shadow-sm">
            <div className="w-12 h-12 bg-slate-100 rounded flex items-center justify-center mb-4 group-hover:bg-gold transition-colors">
              <span className="material-symbols-outlined text-gold group-hover:text-navy">handshake</span>
            </div>
            <h4 className="font-bold text-sm md:text-base mb-2">Radical Collaboration</h4>
            <p className="text-xs md:text-sm text-slate-500">Breaking silos between departments and industries is our standard.</p>
          </div>
        </div>
      </section>

      {/* Goals Section */}
      <section className="bg-slate-50 py-24 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-6 md:px-16">
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl text-navy font-bold">Our Strategic Goals</h2>
            <p className="font-body text-slate-500 mt-2">Defining the trajectory for the future of higher education connectivity.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-12">
            <div className="space-y-4">
              <span className="text-6xl text-bright-red opacity-20 font-black font-display">01</span>
              <h3 className="font-display text-2xl text-navy font-bold">Digital Dominance</h3>
              <p className="text-slate-600 text-sm md:text-base leading-relaxed">
                Establishing a robust online platform that serves as the central nervous system for academic and professional data exchange across West Africa.
              </p>
            </div>
            
            <div className="space-y-4">
              <span className="text-6xl text-gold opacity-30 font-black font-display">02</span>
              <h3 className="font-display text-2xl text-navy font-bold">Leadership Pipeline</h3>
              <p className="text-slate-600 text-sm md:text-base leading-relaxed">
                Identifying and nurturing high-potential students through bespoke mentorship programs that guarantee placement in top-tier corporate environments.
              </p>
            </div>

            <div className="space-y-4">
              <span className="text-6xl text-navy opacity-20 font-black font-display">03</span>
              <h3 className="font-display text-2xl text-navy font-bold">Unified Community</h3>
              <p className="text-slate-600 text-sm md:text-base leading-relaxed">
                Fostering an unbreakable bond between alumni and current students to ensure a perpetual cycle of guidance, work, and inspiration.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6 md:px-16">
          <div className="bg-navy rounded-2xl p-12 md:p-20 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-12">
            <div className="absolute inset-0 opacity-10 pointer-events-none">
              <div className="absolute top-0 right-0 w-96 h-96 bg-bright-red rounded-full blur-3xl -mr-48 -mt-48"></div>
              <div className="absolute bottom-0 left-0 w-96 h-96 bg-gold rounded-full blur-3xl -ml-48 -mb-48"></div>
            </div>
            
            <div className="relative z-10 text-center md:text-left max-w-2xl">
              <h2 className="font-display text-3xl md:text-4xl text-white leading-tight font-bold">
                Ready to connect with the <span className="text-gold">authority</span> of the future?
              </h2>
              <p className="text-white/80 mt-4 text-base md:text-lg">
                Join TN Universities Connect today and become part of a movement that is redefining excellence in the academic landscape.
              </p>
            </div>
            
            <div className="relative z-10 flex flex-col sm:flex-row gap-4 w-full md:w-auto">
              <button 
                onClick={() => navigateTo('registration')}
                className="bg-primary text-white font-bold px-8 py-4 rounded shadow-lg hover:scale-105 active:scale-95 transition-all text-center cursor-pointer text-sm"
              >
                Start Registration
              </button>
              <button 
                onClick={() => navigateTo('contact')}
                className="bg-white text-navy font-bold px-8 py-4 rounded shadow-lg hover:bg-gold transition-all text-center cursor-pointer text-sm"
              >
                Contact Support
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default About
