function Hero({ 
  badge, 
  title, 
  subtitle, 
  primaryBtnText, 
  onPrimaryClick, 
  secondaryBtnText, 
  onSecondaryClick, 
  bgImage 
}) {
  return (
    <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden bg-navy text-white py-20 text-center hero-clip">
      {/* Background Image */}
      {bgImage && (
        <div className="absolute inset-0 z-0">
          <img 
            alt="Hero Background" 
            className="w-full h-full object-cover opacity-40" 
            src={bgImage} 
          />
          <div className="absolute inset-0 hero-overlay opacity-90"></div>
        </div>
      )}
      
      {/* Ambient background blur elements */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary rounded-full blur-3xl -mr-48 -mt-48"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-gold rounded-full blur-3xl -ml-48 -mb-48"></div>
      </div>

      <div className="relative z-10 px-6 md:px-16 max-w-5xl mx-auto w-full flex flex-col items-center pb-12 md:pb-16">
        {/* Badge */}
        {badge && (
          <div className="inline-flex items-center gap-2 bg-secondary/20 text-secondary border border-secondary/30 px-4 py-2 rounded-full mb-8 font-semibold text-xs tracking-wider uppercase">
            <span className="material-symbols-outlined text-[18px]">verified</span>
            <span>{badge}</span>
          </div>
        )}

        {/* Title */}
        <h1 className="font-display text-4xl sm:text-5xl md:text-7xl font-black mb-8 leading-tight max-w-4xl">
          {title}
        </h1>

        {/* Subtitle */}
        {subtitle && (
          <p className="font-body text-base sm:text-lg md:text-xl text-white/80 mb-12 max-w-3xl leading-relaxed">
            {subtitle}
          </p>
        )}

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center w-full sm:w-auto">
          {primaryBtnText && (
            <button 
              onClick={onPrimaryClick}
              className="bg-primary text-white px-12 py-5 rounded-xl font-bold text-lg shadow-2xl shadow-primary/30 hover:brightness-110 hover:-translate-y-0.5 active:scale-95 transition-all cursor-pointer text-center"
            >
              {primaryBtnText}
            </button>
          )}
          {secondaryBtnText && (
            <button 
              onClick={onSecondaryClick}
              className="bg-transparent text-white border-2 border-gold text-gold px-12 py-5 rounded-xl font-bold text-lg hover:bg-gold/10 active:scale-95 transition-all backdrop-blur-sm cursor-pointer text-center"
            >
              {secondaryBtnText}
            </button>
          )}
        </div>
      </div>
    </section>
  )
}

export default Hero
