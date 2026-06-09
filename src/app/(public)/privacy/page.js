"use client";

import { useState, useEffect } from "react";

export default function PrivacyPage() {
  const [activeSection, setActiveSection] = useState("introduction");

  const sections = [
    { id: "introduction", label: "Introduction" },
    { id: "data-collection", label: "Information We Collect" },
    { id: "data-usage", label: "How We Use Information" },
    { id: "data-protection", label: "Data Protection & Rights" },
    { id: "cookies-tracking", label: "Cookies & Session Data" },
    { id: "changes-policy", label: "Policy Updates" },
    { id: "contact-us", label: "Contact Privacy Team" },
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
            Privacy Policy
          </h1>
          <p className="text-on-surface-variant leading-relaxed text-lg">
            At TN CONNECT, we take your privacy and data security seriously. This policy explains how we collect, use, and protect your information when registering as a community member.
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
            <nav className="space-y-1" aria-label="Privacy policy table of contents">
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
            
            <section id="introduction" className="scroll-mt-24 space-y-4">
              <h2 className="font-headline-md text-2xl text-on-surface border-b border-surface-border pb-3">
                1. Introduction
              </h2>
              <p>
                TN CONNECT ("we," "our," or "the platform") is dedicated to facilitating student networking and academic connectivity. This Privacy Policy details our commitment to safeguarding the personal credentials of our community members, including current students, alumni, and administrators.
              </p>
              <p>
                By creating a member profile and verifying your account through our One-Time Password (OTP) process, you acknowledge and agree to the data collection and usage practices detailed herein.
              </p>
            </section>

            <section id="data-collection" className="scroll-mt-24 space-y-4">
              <h2 className="font-headline-md text-2xl text-on-surface border-b border-surface-border pb-3">
                2. Information We Collect
              </h2>
              <p>
                To provide a secure and customized experience on the network, we collect specific member information during registration:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong className="text-on-surface">Legal Full Name:</strong> Used to confirm your identity within the community portal.
                </li>
                <li>
                  <strong className="text-on-surface">Educational Institution:</strong> The school or college name you currently attend or graduated from.
                </li>
                <li>
                  <strong className="text-on-surface">Programme or Course:</strong> Your specific academic course of study.
                </li>
                <li>
                  <strong className="text-on-surface">Phone Number:</strong> Required for account identity verification via SMS OTP codes.
                </li>
                <li>
                  <strong className="text-on-surface">Email Address (Optional):</strong> Recommended to receive system notifications, updates, and secure account reminders.
                </li>
              </ul>
            </section>

            <section id="data-usage" className="scroll-mt-24 space-y-4">
              <h2 className="font-headline-md text-2xl text-on-surface border-b border-surface-border pb-3">
                3. How We Use Information
              </h2>
              <p>
                Your data is never sold, traded, or shared with third-party advertising companies. We process and use your information exclusively to:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Register your active membership status and generate your profile.</li>
                <li>Deliver secure 6-digit confirmation codes via SMS OTP for phone verification.</li>
                <li>Secure sign-in credentials, handle password resets, and verify session activity.</li>
                <li>Allow administrators to manage member details, view statistical growth reports, and maintain platform integrity.</li>
              </ul>
            </section>

            <section id="data-protection" className="scroll-mt-24 space-y-4">
              <h2 className="font-headline-md text-2xl text-on-surface border-b border-surface-border pb-3">
                4. Data Protection & Rights
              </h2>
              <p>
                We execute strong technical and organizational measures to defend your information from unauthorized access, modification, or deletion:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Passwords are strictly salted and hashed using standard <strong className="text-on-surface">bcrypt</strong> algorithms before storage.</li>
                <li>Phone verified numbers can only be edited through secure re-verification to prevent hijacking.</li>
                <li>You retain the right to update your profile metadata (Name, School, Program, Email) or deactivate/delete your account by contacting support.</li>
              </ul>
            </section>

            <section id="cookies-tracking" className="scroll-mt-24 space-y-4">
              <h2 className="font-headline-md text-2xl text-on-surface border-b border-surface-border pb-3">
                5. Cookies & Session Data
              </h2>
              <p>
                TN CONNECT utilizes JSON Web Tokens (JWT) and cookies to coordinate secure login sessions. The cookies used are configured with <code className="bg-surface-container-low px-1.5 py-0.5 rounded text-primary">HttpOnly</code>, <code className="bg-surface-container-low px-1.5 py-0.5 rounded text-primary">Secure</code>, and <code className="bg-surface-container-low px-1.5 py-0.5 rounded text-primary">SameSite=Strict</code> attributes to prevent client-side script interception (XSS).
              </p>
              <p>
                Sessions automatically log out after periods of inactivity. An on-screen inactivity alert warning displays to allow you to extend your session safely.
              </p>
            </section>

            <section id="changes-policy" className="scroll-mt-24 space-y-4">
              <h2 className="font-headline-md text-2xl text-on-surface border-b border-surface-border pb-3">
                6. Policy Updates
              </h2>
              <p>
                We may modify this privacy policy periodically to reflect changes in our verification methods, administrative rules, or security standards. If changes are significant, verified users will be alerted through portal notifications or system email messages.
              </p>
            </section>

            <section id="contact-us" className="scroll-mt-24 space-y-6">
              <h2 className="font-headline-md text-2xl text-on-surface border-b border-surface-border pb-3">
                7. Contact Privacy Team
              </h2>
              <p>
                If you have questions about how we handle user data or want to submit an account deletion request, please reach out to our privacy compliance officer:
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center bg-surface-container-low p-6 rounded-2xl border border-surface-border">
                <div>
                  <h5 className="font-label-bold text-on-surface mb-1">TN CONNECT Legal Department</h5>
                  <p className="text-sm">Compliance Officer: compliance@tnconnect.org</p>
                </div>
                <a href="/contact" className="btn-primary flex items-center gap-2">
                  <span className="material-symbols-outlined text-sm">mail</span>
                  Contact Form
                </a>
              </div>
            </section>

          </article>
        </div>
      </div>
    </div>
  );
}
