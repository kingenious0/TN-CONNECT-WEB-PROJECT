import Hero from '../components/Hero'

function Home({ navigateTo }) {
  return (
    <div className="flex-grow">
      {/* Hero Section */}
      <Hero
        title={<>Empowering Your <br /><span className="text-gradient">Academic Journey</span></>}
        subtitle="TN Universities Connect is the professional digital hub designed to bridge the gap between campus resources and student excellence. Experience a connected community like never before."
        primaryBtnText="Join the Network"
        onPrimaryClick={() => navigateTo('registration')}
        secondaryBtnText="Platform Tour"
        onSecondaryClick={() => navigateTo('about')}
        bgImage="https://lh3.googleusercontent.com/aida-public/AB6AXuBRl10Pto_kBeznkPYBG0larODlXr2SL_0roicT3Pw8vRZUtqeaNTCGLDZVF9Ua-BHX5IkixTnDvH7ruJ7G2DDXvUCzSM24h7iE0AbJ26ehbeua-LrFk-raNYTtbadJ7MNZc2KyuUnUhd1gegoRas_GAzVEVcB3SFpCtELi0C5ZCGgO6wFCRWSlafotRB1v-f9eS4n8rhXaJkjiHLJNh__H_-7gI_ngEBN66pE7UkwiiPJtpFG0IdARVnOhuQLicWeE5K8tHuNt6Byf"
      />

      {/* Why Join? Section */}
      <section className="py-24 bg-slate-50">
        <div className="px-6 md:px-16 max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="font-display text-4xl text-navy mb-6 font-bold">Why Choose TN Universities Connect?</h2>
            <div className="w-24 h-1 bg-secondary mx-auto mb-8"></div>
            <p className="text-navy/70 text-lg max-w-2xl mx-auto">
              Professional-grade features designed for the modern scholar and academic organization.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {/* Feature 1 */}
            <div className="bg-white p-10 rounded-2xl border border-slate-200 hover:border-tertiary hover:shadow-lg transition-all duration-300 group">
              <div className="w-16 h-16 rounded-xl bg-tertiary/10 flex items-center justify-center text-tertiary mb-8 group-hover:bg-tertiary group-hover:text-white transition-all">
                <span className="material-symbols-outlined text-3xl">hub</span>
              </div>
              <h3 className="font-display text-2xl text-navy mb-4 font-bold">Centralized Hub</h3>
              <p className="text-navy/60 leading-relaxed text-sm md:text-base">
                Access all your campus resources, student organizations, and events from a single, unified professional dashboard.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white p-10 rounded-2xl border border-slate-200 hover:border-secondary hover:shadow-lg transition-all duration-300 group">
              <div className="w-16 h-16 rounded-xl bg-secondary/10 flex items-center justify-center text-secondary mb-8 group-hover:bg-secondary group-hover:text-white transition-all">
                <span className="material-symbols-outlined text-3xl">verified_user</span>
              </div>
              <h3 className="font-display text-2xl text-navy mb-4 font-bold">Instant Verification</h3>
              <p className="text-navy/60 leading-relaxed text-sm md:text-base">
                Secure, instant student status verification for exclusive benefits and verified campus networking.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white p-10 rounded-2xl border border-slate-200 hover:border-primary hover:shadow-lg transition-all duration-300 group">
              <div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-8 group-hover:bg-primary group-hover:text-white transition-all">
                <span className="material-symbols-outlined text-3xl">bolt</span>
              </div>
              <h3 className="font-display text-2xl text-navy mb-4 font-bold">Kinetic Performance</h3>
              <p className="text-navy/60 leading-relaxed text-sm md:text-base">
                Optimized for high-speed engagement. Manage your profile and connect with peers with unparalleled efficiency.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* The Team Behind the Project */}
      <section className="py-24 bg-white overflow-hidden">
        <div className="px-6 md:px-16 max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="lg:w-1/2">
              <h2 className="font-display text-4xl text-navy mb-6 font-bold">The Team Behind the Project</h2>
              <div className="w-20 h-1.5 bg-primary mb-8"></div>
              <p className="text-navy/70 text-lg mb-8 leading-relaxed">
                We are a dedicated collective of designers, engineers, and educators driven by the vision of a more connected academic world. Under the Kinetic Authority brand, we build tools that empower the next generation.
              </p>
              
              <div className="space-y-4 mb-10 text-sm font-semibold">
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-tertiary">check_circle</span>
                  <span className="text-navy">Expert-led development</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-tertiary">check_circle</span>
                  <span className="text-navy">Student-centric design philosophy</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-tertiary">check_circle</span>
                  <span className="text-navy">Global academic perspective</span>
                </div>
              </div>
              
              <button 
                onClick={() => navigateTo('about')}
                className="bg-navy text-white px-10 py-4 rounded-lg font-bold hover:bg-secondary transition-all cursor-pointer"
              >
                Meet the Directors
              </button>
            </div>

            <div className="lg:w-1/2 relative">
              <div className="absolute -top-6 -left-6 w-full h-full border-4 border-secondary rounded-2xl z-0"></div>
              <img 
                alt="The Team Behind the Project" 
                className="relative z-10 w-full h-auto rounded-2xl shadow-2xl object-cover" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuC_2bE7P466CH0am8nOyvU9S8otVs9HHrZakgiXUOnNDWyn4hY91mIJCXtLvlA4kMqoXaVsYHIQtjuDqHi-b-y_Anj2IZVjKRlymhvHwtSgRP4nsexTMvi-ruiCe5MwD9SZId24bE89Z61c6W2R5DeQROEX32j-58aOcxAMN4NEjrJzAto4I_zBJYKdUft05hOw1vXpaONShBJqgbnc1AG-6oKrocVt0g1mqhxKCLSzBPaRx7krO4IqBCWaHlV-8Y80XDp1cgIIrBBM"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 bg-slate-100 border-y border-slate-200">
        <div className="px-6 md:px-16 max-w-7xl mx-auto">
          <h2 className="font-display text-4xl text-navy text-center mb-20 font-bold">Voices from Our Community</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Card 1 */}
            <div className="bg-white p-10 rounded-2xl shadow-sm border border-slate-200">
              <div className="flex gap-1 text-secondary mb-6">
                <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
              </div>
              <p className="italic text-navy/80 mb-8 text-sm md:text-base leading-relaxed">
                "TN Universities Connect has completely changed how I find study groups. It's professional, intuitive, and truly effective."
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-navy/10 overflow-hidden">
                  <img 
                    alt="Alex Rivera" 
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCFrQmY0Tg6yHq6LNSdjglHWN5EEEB6SQGbg7Pk93ib5d-fc2sK1Sz4GGQb-f8P5clztnw8jcE2HclgaTvMwXbSk-QdYw0opofBGWvoTeuk2fms8oAmyTE38mYYAh6rN_JvfcONE4SFn0SMjOeYInzE25pkWOpbHeP3L7ATJfA4-H2jG0TZ-yp4MzVeydwCl_o1GS00beSOKaHIh-hTH0C36kMt98HcNZT-QC1Kn1T1qr5kFo9Q8vp1v7wKW2QmqlbE3OqU2Xo4CHwr"
                  />
                </div>
                <div>
                  <div className="font-bold text-navy text-sm">Alex Rivera</div>
                  <div className="text-xs text-navy/60 font-semibold">Computer Science Junior</div>
                </div>
              </div>
            </div>

            {/* Card 2 */}
            <div className="bg-white p-10 rounded-2xl shadow-sm border border-slate-200">
              <div className="flex gap-1 text-secondary mb-6">
                <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
              </div>
              <p className="italic text-navy/80 mb-8 text-sm md:text-base leading-relaxed">
                "As a club president, managing events and attendance has never been easier. The verification feature is a game-changer."
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-navy/10 overflow-hidden">
                  <img 
                    alt="Sarah Jenkins" 
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuD9eSve4n_RJX6QgekpBgVaZcYxBzWOwtFZBbFHyyrbaB-X1xnNLG77rXfff2GDhgE5P9YqzkeByY2QnKaRFzLC5lfH-za0kx9ow-yPaQDb6w_2RfPCL53CI8F__5AnP_OL4wtlv85B3r8gkpGhH5zHrMKxe85MQHgNimF6apzgp3Ho_ba_3C7dU5mt8eOb14YM7YijKrf7LasAjtjmtFv7m6Xdju8BwMiF7AD1NBGujV5VtzfKAYBKpynD6nVplVVN_typEZB99moy"
                  />
                </div>
                <div>
                  <div className="font-bold text-navy text-sm">Sarah Jenkins</div>
                  <div className="text-xs text-navy/60 font-semibold">History Senior</div>
                </div>
              </div>
            </div>

            {/* Card 3 */}
            <div className="bg-white p-10 rounded-2xl shadow-sm border border-slate-200">
              <div className="flex gap-1 text-secondary mb-6">
                <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
              </div>
              <p className="italic text-navy/80 mb-8 text-sm md:text-base leading-relaxed">
                "Finally, a student platform that feels modern and professional. The mobile experience is absolutely flawless."
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-navy/10 overflow-hidden">
                  <img 
                    alt="Michael Chen" 
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuBsZzgtH-ESHnfMtKiDGWyAQLbQI_woYe8xMu8CqivtRnJXGvgp09ilx5aUlRfjcFELCgf5-LiWW4VYJBygn20BtTvtN1mpvg54Lvk93i1DqvHSeBJc4iOaNkrW6Qtab9D0wLX6PWUN3pkd2Wp7D17mxT2LwlnyX3U0-8plOeu2asnqc4wZ_5GebnaMV_Q-BF8yY5I_LKrpvCsQGzv6oUiFyr2_GUfM9VKEV6RtDRncyi1a32baaxFYxTVqq9bx5aTo4eFlDWGrDo5m"
                  />
                </div>
                <div>
                  <div className="font-bold text-navy text-sm">Michael Chen</div>
                  <div className="text-xs text-navy/60 font-semibold">Business Freshman</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6 md:px-16">
        <div className="max-w-7xl mx-auto bg-navy rounded-3xl p-16 md:p-24 text-center relative overflow-hidden">
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary opacity-20 rounded-full blur-[100px] pointer-events-none"></div>
          <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-secondary opacity-20 rounded-full blur-[100px] pointer-events-none"></div>
          
          <div className="relative z-10">
            <h2 className="font-display text-4xl md:text-5xl text-white mb-8 font-bold">Ready to transform your student life?</h2>
            <p className="font-body text-lg md:text-xl text-white/70 mb-12 max-w-2xl mx-auto">
              Join the Kinetic Authority network and build your campus future today.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-6">
              <button 
                onClick={() => navigateTo('registration')}
                className="bg-primary text-white px-12 py-5 rounded-xl font-bold text-lg hover:brightness-110 transition-all shadow-xl shadow-primary/20 cursor-pointer text-center"
              >
                Create Professional Account
              </button>
              <button 
                onClick={() => navigateTo('contact')}
                className="bg-white text-navy px-12 py-5 rounded-xl font-bold text-lg hover:bg-slate-100 transition-all cursor-pointer text-center"
              >
                Institutional Inquiry
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home
