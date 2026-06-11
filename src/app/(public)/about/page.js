import Link from "next/link";

export const metadata = {
  title: "About Us — TN CONNECT",
  description: "Discover the mission, vision, and features of TN CONNECT — connecting universities, students, and alumni.",
};

const partnerUniversities = [
  {
    name: "Kwame Nkrumah University of Science and Technology (KNUST)",
    logo: "/logos/knust.jpg"
  },
  {
    name: "University of Ghana (UG)",
    logo: "/logos/ug.png"
  },
  {
    name: "University of Cape Coast (UCC)",
    logo: "/logos/ucc.png"
  },
  {
    name: "University of Education, Winneba (UEW)",
    logo: "/logos/uew.jpg"
  },
  {
    name: "University of Mines and Technology (UMaT)",
    logo: "/logos/UMaT LOGO.jpg"
  },
  {
    name: "University for Development Studies (UDS)",
    logo: "/logos/UDS logo.jpg"
  },
  {
    name: "University of Skills Training and Entrepreneurial Development (USTED)",
    logo: "/logos/aamusted_gh_logo.jpg"
  },
  {
    name: "Koforidua Technical University (KTU)",
    logo: "/logos/koforidua-technical-university-logo.png"
  }
];

export default function AboutPage() {
  return (
    <>
      {/* Header Banner */}
      <section className="bg-navy text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,_var(--color-primary)_0%,_transparent_60%)]"></div>
        <div className="container-content relative z-10 text-center max-w-3xl">
          <h1 className="font-headline-lg text-4xl md:text-5xl mb-6">About TN CONNECT</h1>
          <p className="font-body-lg text-lg text-white/80 leading-relaxed">
            The definitive platform for academic networking and institutional connectivity. Bridging campus boundaries to enable student excellence.
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-24 bg-white">
        <div className="container-content max-w-[1280px]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            <div className="p-10 rounded-2xl bg-surface-container-low border border-surface-border hover:border-primary transition-all duration-300">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-6">
                <span className="material-symbols-outlined text-2xl">rocket_launch</span>
              </div>
              <h2 className="font-headline-md text-2xl text-navy mb-4">Our Mission</h2>
              <p className="font-body-md text-navy/70 leading-relaxed">
                To empower students by centralizing educational opportunities, simplifying academic networking, and removing campus barriers. We believe every student deserves immediate, secure access to peer collaboration, expert mentorship, and industry-grade careers.
              </p>
            </div>
            <div className="p-10 rounded-2xl bg-surface-container-low border border-surface-border hover:border-secondary transition-all duration-300">
              <div className="w-12 h-12 rounded-lg bg-secondary/10 flex items-center justify-center text-secondary mb-6">
                <span className="material-symbols-outlined text-2xl">visibility</span>
              </div>
              <h2 className="font-headline-md text-2xl text-navy mb-4">Our Vision</h2>
              <p className="font-body-md text-navy/70 leading-relaxed">
                To build a highly verified and kinetic academic ecosystem. By leveraging student authentication standards, TN CONNECT aims to become the benchmark framework for collaborative collegiate networks globally.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Platform Features Detail */}
      <section className="py-24 bg-surface-container-low">
        <div className="container-content max-w-[1280px]">
          <div className="text-center mb-20">
            <h2 className="font-headline-lg text-3xl md:text-4xl text-navy mb-4">Core Platform Infrastructure</h2>
            <div className="w-20 h-1 bg-secondary mx-auto mb-6"></div>
            <p className="font-body-lg text-navy/60 max-w-2xl mx-auto">
              Engineered with modern protocols to ensure speed, security, and fluid user experience.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="bg-white p-8 rounded-xl border border-surface-border">
              <div className="text-primary font-bold text-lg mb-4 flex items-center gap-2">
                <span className="material-symbols-outlined">shield_person</span> Security First
              </div>
              <p className="font-body-md text-navy/60 leading-relaxed">
                Complete data isolation, verified student directories, and granular profile control keep the community secure and clean.
              </p>
            </div>
            <div className="bg-white p-8 rounded-xl border border-surface-border">
              <div className="text-secondary font-bold text-lg mb-4 flex items-center gap-2">
                <span className="material-symbols-outlined">diversity_3</span> Peer Networks
              </div>
              <p className="font-body-md text-navy/60 leading-relaxed">
                Seamless peer search filters enable finding study partners, research co-authors, and student developers in seconds.
              </p>
            </div>
            <div className="bg-white p-8 rounded-xl border border-surface-border">
              <div className="text-tertiary font-bold text-lg mb-4 flex items-center gap-2">
                <span className="material-symbols-outlined">school</span> Institution Portals
              </div>
              <p className="font-body-md text-navy/60 leading-relaxed">
                Customized university workspaces let administrations publish announcements, post local jobs, and track events.
              </p>
            </div>
          </div>
        </div>
      </section>

          {/* Connected Institutions */}
      <section className="py-24 bg-white">
        <div className="container-content max-w-[1280px]">
          <div className="text-center mb-16">
            <h2 className="font-headline-lg text-3xl text-navy mb-4">Connected Institutions</h2>
            <div className="w-20 h-1 bg-primary mx-auto mb-6"></div>
            <p className="font-body-lg text-navy/60 max-w-2xl mx-auto">
              Connecting students, departments, and alumni from premium colleges.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {partnerUniversities.map((uni) => (
              <div key={uni.name} className="p-6 rounded-lg border border-surface-border flex flex-col items-center justify-between text-center bg-surface hover:bg-surface-container transition-colors min-h-[180px]">
                {uni.logo ? (
                  <img src={uni.logo} alt={`${uni.name} Logo`} className="h-16 w-auto object-contain mb-4" />
                ) : (
                  <span className="material-symbols-outlined text-primary text-3xl mb-4 block">account_balance</span>
                )}
                <div className="font-headline-md text-sm md:text-base text-navy font-bold">{uni.name}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Meet the Directors */}
      <section id="directors" className="py-24 bg-surface-container-low scroll-mt-20">
        <div className="container-content max-w-[1280px]">
          <div className="text-center mb-16">
            <h2 className="font-headline-lg text-3xl md:text-4xl text-navy mb-4">Meet the Directors</h2>
            <div className="w-20 h-1 bg-secondary mx-auto mb-6"></div>
            <p className="font-body-lg text-navy/60 max-w-2xl mx-auto">
              The driving force behind TN CONNECT's technical innovation and operational excellence.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl mx-auto">
            {/* Director 1 */}
            <div className="bg-white rounded-2xl border border-surface-border p-8 shadow-md flex flex-col sm:flex-row items-center gap-8 card-hover">
              <div className="w-32 h-32 rounded-2xl overflow-hidden shrink-0 border border-surface-border">
                <img src="/director_tech.png" alt="Director of Technology" className="w-full h-full object-cover" />
              </div>
              <div className="text-center sm:text-left space-y-3">
                <div>
                  <h3 className="font-headline-md text-xl text-navy">Dr. Evelyn Ampadu</h3>
                  <p className="text-sm font-label-bold text-primary uppercase tracking-wider">Director of Technology</p>
                </div>
                <p className="text-sm text-navy/70 leading-relaxed">
                  Leading technical vision, platform infrastructure security, and system scaling architecture to ensure reliable performance.
                </p>
              </div>
            </div>

            {/* Director 2 */}
            <div className="bg-white rounded-2xl border border-surface-border p-8 shadow-md flex flex-col sm:flex-row items-center gap-8 card-hover">
              <div className="w-32 h-32 rounded-2xl overflow-hidden shrink-0 border border-surface-border">
                <img src="/director_ops.png" alt="Director of Operations" className="w-full h-full object-cover" />
              </div>
              <div className="text-center sm:text-left space-y-3">
                <div>
                  <h3 className="font-headline-md text-xl text-navy">Mr. Marcus Owusu</h3>
                  <p className="text-sm font-label-bold text-secondary uppercase tracking-wider">Director of Operations</p>
                </div>
                <p className="text-sm text-navy/70 leading-relaxed">
                  Overseeing institutional relationships, student community operations, partnership onboarding, and policy alignment.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-navy text-white text-center relative overflow-hidden">
        <div className="container-content relative z-10 max-w-2xl">
          <h2 className="font-headline-lg text-3xl mb-6">Ready to get started?</h2>
          <p className="font-body-lg text-white/70 mb-10">
            Join the premium student and alumni network today and elevate your academic footprint.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/registration" className="bg-primary text-white px-10 py-4 rounded-lg font-bold hover:bg-red-700 transition-all shadow-lg shadow-primary/30">
              Register Now
            </Link>
            <Link href="/contact" className="bg-transparent text-white border-2 border-white/30 px-10 py-4 rounded-lg font-bold hover:bg-white/10 transition-all">
              Contact Team
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
