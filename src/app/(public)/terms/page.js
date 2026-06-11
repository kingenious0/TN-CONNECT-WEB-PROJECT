"use client";

import { useState, useEffect } from "react";

export default function TermsPage() {
  const [activeSection, setActiveSection] = useState("acceptance");

  const sections = [
    { id: "acceptance", label: "Acceptance of Terms" },
    { id: "eligibility", label: "Account Eligibility" },
    { id: "verification", label: "Verification & Security" },
    { id: "user-conduct", label: "User Conduct Guidelines" },
    { id: "termination", label: "Deactivation & Termination" },
    { id: "disclaimers", label: "Disclaimers & Liability" },
    { id: "changes-terms", label: "Modifications to Terms" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200;

      for (const section of sections) {
        const el = document.getElementById(section.id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section.id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      window.scrollTo({
        top: el.offsetTop - 120,
        behavior: "smooth",
      });
      setActiveSection(id);
    }
  };

  return (
    <div className="section-padding bg-surface-container-low min-h-screen">
      <div className="container-content">
        {/* Page Header */}
        <header className="max-w-3xl mb-16 animate-fade-in-up">
          <span className="font-label-bold text-xs uppercase tracking-[0.2em] text-primary mb-3 block">
            TN CONNECT Legal Documentation
          </span>
          <h1 className="font-headline-lg text-4xl md:text-5xl text-on-surface mb-6">
            Terms of Service
          </h1>
          <p className="text-on-surface-variant leading-relaxed text-lg">
            Welcome to TN CONNECT. These terms outline the rules and expectations for members participating in our student networking and collaboration platform.
          </p>
          <div className="mt-6 flex items-center gap-3 text-sm text-on-surface-variant/70">
            <span className="material-symbols-outlined text-base text-secondary">calendar_today</span>
            <span>Last Updated: May 2026</span>
          </div>
        </header>

        {/* Main Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-gap-md lg:gap-gap-lg items-start">
          {/* Sticky Sidebar Navigation */}
          <aside className="lg:col-span-4 sticky top-28 bg-surface-container-lowest p-6 rounded-2xl border border-surface-border shadow-md hidden lg:block">
            <h4 className="font-label-bold text-xs uppercase tracking-wider text-secondary mb-6 px-2">
              On This Page
            </h4>
            <nav className="space-y-1" aria-label="Terms of service table of contents">
              {sections.map((sec) => (
                <button
                  key={sec.id}
                  type="button"
                  onClick={() => scrollToSection(sec.id)}
                  className={`w-full text-left py-2.5 px-4 rounded-xl text-sm font-medium transition-all duration-200 flex items-center justify-between ${
                    activeSection === sec.id
                      ? "bg-primary/5 text-primary font-bold shadow-sm"
                      : "text-on-surface-variant hover:text-on-surface hover:bg-surface-container-low"
                  }`}
                >
                  {sec.label}
                  {activeSection === sec.id && (
                    <span className="material-symbols-outlined text-base text-primary">chevron_right</span>
                  )}
                </button>
              ))}
            </nav>
          </aside>

          {/* Policy Text Container */}
          <article className="lg:col-span-8 bg-surface-container-lowest rounded-2xl p-6 md:p-12 border border-surface-border shadow-lg space-y-12 text-on-surface-variant leading-relaxed">
            
            <section id="acceptance" className="scroll-mt-24 space-y-4">
              <h2 className="font-headline-md text-2xl text-on-surface border-b border-surface-border pb-3">
                1. Acceptance of Terms
              </h2>
              <p>
                By accessing, browsing, registering, or using TN CONNECT, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service. If you do not agree, you are not authorized to use the platform.
              </p>
            </section>

            <section id="eligibility" className="scroll-mt-24 space-y-4">
              <h2 className="font-headline-md text-2xl text-on-surface border-b border-surface-border pb-3">
                2. Account Eligibility
              </h2>
              <p>
                TN CONNECT is a restricted platform designed specifically for:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Currently enrolled students of verified educational institutions.</li>
                <li>Alumni belonging to registered university communities.</li>
                <li>Authorized staff, partners, or academic platform administrators.</li>
              </ul>
              <p>
                You must provide accurate, current, and complete details about your academic institution, course, and contact information. Falsifying institutional records or credentials will result in deactivation.
              </p>
            </section>

            <section id="verification" className="scroll-mt-24 space-y-4">
              <h2 className="font-headline-md text-2xl text-on-surface border-b border-surface-border pb-3">
                3. Verification & Security
              </h2>
              <p>
                To maintain a reliable student space, account registration enforces multi-factor identity checks:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong className="text-on-surface">OTP Identity Verification:</strong> Registration is only completed after confirming ownership of your phone number using the secure 6-digit SMS code.
                </li>
                <li>
                  <strong className="text-on-surface">Lockout Restrictions:</strong> Entering incorrect OTP codes 3 times will lock the session, requiring you to restart registration.
                </li>
                <li>
                  <strong className="text-on-surface">Password Requirements:</strong> Passwords must meet basic strength guidelines (8+ characters, complex mix). You are responsible for keeping your login credentials confidential.
                </li>
              </ul>
            </section>

            <section id="user-conduct" className="scroll-mt-24 space-y-4">
              <h2 className="font-headline-md text-2xl text-on-surface border-b border-surface-border pb-3">
                4. User Conduct Guidelines
              </h2>
              <p>
                Members are expected to communicate professionally and respectfully. Forbidden activities on the portal include:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Impersonating other students, alumni, or institutional administrators.</li>
                <li>Posting spam, unsolicited promotional material, or commercial advertising.</li>
                <li>Harassing, abusing, or threat-scoring other platform members.</li>
                <li>Using scripts, bots, or scrapers to extract member listings or directory databases.</li>
              </ul>
            </section>

            <section id="termination" className="scroll-mt-24 space-y-4">
              <h2 className="font-headline-md text-2xl text-on-surface border-b border-surface-border pb-3">
                5. Deactivation & Termination
              </h2>
              <p>
                Platform administrators reserve the right to review, edit, or delete member profiles, and toggle account statuses between active and inactive. 
              </p>
              <p>
                Your access may be terminated immediately for violations of these terms, fraud, or code manipulation. You can request deactivation of your account voluntarily by filing a support request through the Contact page.
              </p>
            </section>

            <section id="disclaimers" className="scroll-mt-24 space-y-4">
              <h2 className="font-headline-md text-2xl text-on-surface border-b border-surface-border pb-3">
                6. Disclaimers & Liability
              </h2>
              <p>
                TN CONNECT is provided on an "as is" and "as available" basis without warranties of any kind. We do not guarantee that the site will always be online, free of errors, or that information updated by other members is completely accurate.
              </p>
              <p>
                Under no circumstances shall the platform or its administration team be liable for direct, indirect, or incidental damages resulting from your use of the platform.
              </p>
            </section>

            <section id="changes-terms" className="scroll-mt-24 space-y-4">
              <h2 className="font-headline-md text-2xl text-on-surface border-b border-surface-border pb-3">
                7. Modifications to Terms
              </h2>
              <p>
                We reserve the right to change these Terms of Service at any time. When updates occur, they will be posted on this page with the modified "Last Updated" timestamp. Continued use of the platform constitutes agreement to the updated rules.
              </p>
            </section>

          </article>
        </div>
      </div>
    </div>
  );
}
