"use client";

import { useState, useEffect } from "react";

export default function SecurityPage() {
  const [activeSection, setActiveSection] = useState("encryption");

  const sections = [
    { id: "encryption", label: "Encryption & Hashing" },
    { id: "otp-security", label: "OTP & Brute-Force Defense" },
    { id: "session-security", label: "Session & Token Safety" },
    { id: "input-validation", label: "Input Sanitization" },
    { id: "rbac", label: "Access Control & Roles" },
    { id: "auditing-backups", label: "Infrastructure & Audits" },
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
            Security Standards
          </h1>
          <p className="text-on-surface-variant leading-relaxed text-lg">
            How we protect the TN CONNECT community. This document outlines our application architecture, verification defenses, and database encryption standards.
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
            <nav className="space-y-1" aria-label="Security standards table of contents">
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
            
            <section id="encryption" className="scroll-mt-24 space-y-4">
              <h2 className="font-headline-md text-2xl text-on-surface border-b border-surface-border pb-3">
                1. Encryption & Data Hashing
              </h2>
              <p>
                All student data in transit between the web client and our API Gateway is encrypted using industry-standard Transport Layer Security (TLS/SSL).
              </p>
              <p>
                Passwords stored in the database are hashed with a unique cryptographic salt using the <strong className="text-on-surface">bcrypt algorithm</strong>. Under no circumstances are plain text passwords saved in logs, database tables, or server memory.
              </p>
            </section>

            <section id="otp-security" className="scroll-mt-24 space-y-4">
              <h2 className="font-headline-md text-2xl text-on-surface border-b border-surface-border pb-3">
                2. OTP & Brute-Force Defense
              </h2>
              <p>
                To secure student identity verification and prevent automated attacks, the following parameters are enforced:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong className="text-on-surface">Validity Window:</strong> One-Time Passwords (OTP) generated for registration and password resets expire automatically after exactly 5 minutes.
                </li>
                <li>
                  <strong className="text-on-surface">Failed Attempt Lockout:</strong> If a user enters an incorrect 6-digit code 3 times sequentially, the verification session is locked. The frontend disables further attempts and triggers an automatic redirect back to the registration screen.
                </li>
                <li>
                  <strong className="text-on-surface">API Gateway Rate Limiting:</strong> Requests to endpoints managing code generation and verification are actively rate-limited to mitigate bot traffic.
                </li>
              </ul>
            </section>

            <section id="session-security" className="scroll-mt-24 space-y-4">
              <h2 className="font-headline-md text-2xl text-on-surface border-b border-surface-border pb-3">
                3. Session & Token Safety
              </h2>
              <p>
                TN CONNECT utilizes signed JSON Web Tokens (JWT) to establish identity verification. Tokens are secured on client devices via cookies containing:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li><code className="bg-surface-container-low px-1.5 py-0.5 rounded text-primary">HttpOnly</code>: Prevents scripts from accessing token payload, safeguarding sessions against XSS interception.</li>
                <li><code className="bg-surface-container-low px-1.5 py-0.5 rounded text-primary">Secure</code>: Forces cookies to only be transmitted via encrypted HTTPS networks.</li>
                <li><code className="bg-surface-container-low px-1.5 py-0.5 rounded text-primary">SameSite=Strict</code>: Protects against Cross-Site Request Forgery (CSRF) exploits.</li>
              </ul>
              <p>
                Additionally, inactive accounts will be prompted by an inactivity overlay before their session expires, allowing users to extend their login session or safely sign out.
              </p>
            </section>

            <section id="input-validation" className="scroll-mt-24 space-y-4">
              <h2 className="font-headline-md text-2xl text-on-surface border-b border-surface-border pb-3">
                4. Input Sanitization & SQL Injection Defense
              </h2>
              <p>
                All data input fields (including registration profile data and login details) undergo verification at two levels: on the client interface to give real-time feedback, and independently on the backend server.
              </p>
              <p>
                Database queries use parameterized statements and Object Relational Mapping (ORM) tools. This prevents input characters from being interpreted as database commands, neutralizing SQL Injection (SQLi) vulnerabilities. React's default template compilation model further defends against Cross-Site Scripting (XSS) code injections.
              </p>
            </section>

            <section id="rbac" className="scroll-mt-24 space-y-4">
              <h2 className="font-headline-md text-2xl text-on-surface border-b border-surface-border pb-3">
                5. Access Control & Role Policies
              </h2>
              <p>
                Role-Based Access Control (RBAC) separates member accounts from administrative portals:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Standard members have access only to their own profile dashboard, which is read-only for verified identifiers (phone numbers).</li>
                <li>Administrators log in via a separate, private portal using strict role level verification.</li>
                <li>Permissions (e.g., viewing logs, deactivating accounts, exporting records) are verified at the server API layer on every single request.</li>
              </ul>
            </section>

            <section id="auditing-backups" className="scroll-mt-24 space-y-4">
              <h2 className="font-headline-md text-2xl text-on-surface border-b border-surface-border pb-3">
                6. Infrastructure & System Auditing
              </h2>
              <p>
                To maintain historical transparency and system health:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong className="text-on-surface">Audit Logs:</strong> Every administrative action (modifying user data, changing status, deleting accounts, data exports) is permanently logged in a read-only audit database.
                </li>
                <li>
                  <strong className="text-on-surface">System Backups:</strong> Automated daily backups of database records are processed and encrypted in isolated, secure cloud destinations.
                </li>
              </ul>
            </section>

          </article>
        </div>
      </div>
    </div>
  );
}
