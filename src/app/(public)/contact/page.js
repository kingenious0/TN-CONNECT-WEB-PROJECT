"use client";

import { useState } from "react";
import Link from "next/link";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real application, form submission logic would go here.
    setSubmitted(true);
  };

  return (
    <>
      {/* Header Banner */}
      <section className="bg-navy text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,_var(--color-primary)_0%,_transparent_60%)]"></div>
        <div className="container-content relative z-10 text-center max-w-3xl">
          <h1 className="font-headline-lg text-4xl md:text-5xl mb-6">Contact Us</h1>
          <p className="font-body-lg text-lg text-white/80 leading-relaxed">
            Have questions about TN CONNECT? Get in touch with our institutional onboarding or support team.
          </p>
        </div>
      </section>

      {/* Main Section */}
      <section className="py-24 bg-white">
        <div className="container-content max-w-[1280px]">
          <div className="flex flex-col lg:flex-row gap-16">
            
            {/* Contact Info Cards */}
            <div className="lg:w-5/12 space-y-8">
              <h2 className="font-headline-lg text-3xl text-navy">Get In Touch</h2>
              <p className="font-body-md text-navy/70 leading-relaxed">
                Whether you are a student organization president, university administrator, or interested alumnus, we are ready to assist.
              </p>

              <div className="grid grid-cols-1 gap-6">
                {/* Email Card */}
                <div className="flex gap-5 p-6 rounded-xl border border-surface-border bg-surface-container-low">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
                    <span className="material-symbols-outlined text-2xl">mail</span>
                  </div>
                  <div>
                    <h3 className="font-headline-md text-lg text-navy mb-1 font-bold">Email Support</h3>
                    <p className="text-sm text-navy/60 mb-2">We typically reply within 24 hours.</p>
                    <a href="mailto:ask@tnuniversitiesconnect.com" className="font-semibold text-primary hover:underline text-sm break-all">
                      ask@tnuniversitiesconnect.com
                    </a>
                  </div>
                </div>

                {/* Location Card */}
                <div className="flex gap-5 p-6 rounded-xl border border-surface-border bg-surface-container-low">
                  <div className="w-12 h-12 rounded-lg bg-secondary/10 flex items-center justify-center text-secondary flex-shrink-0">
                    <span className="material-symbols-outlined text-2xl">location_on</span>
                  </div>
                  <div>
                    <h3 className="font-headline-md text-lg text-navy mb-1 font-bold">Campus Headquarters</h3>
                    <p className="text-sm text-navy/60 mb-2">Kumasi, Ghana</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:w-7/12 bg-surface-container-low p-8 md:p-12 rounded-2xl border border-surface-border">
              {submitted ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-tertiary/10 text-tertiary rounded-full flex items-center justify-center mx-auto mb-6">
                    <span className="material-symbols-outlined text-3xl">check_circle</span>
                  </div>
                  <h3 className="font-headline-lg text-2xl text-navy mb-4">Message Sent Successfully!</h3>
                  <p className="font-body-md text-navy/60 max-w-md mx-auto mb-8">
                    Thank you for reaching out. A representative from the TN CONNECT team will get back to you shortly.
                  </p>
                  <button 
                    onClick={() => setSubmitted(false)}
                    className="bg-navy text-white px-8 py-3 rounded-lg font-bold hover:bg-primary transition-colors"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-bold text-navy mb-2">Your Name</label>
                      <input
                        type="text"
                        id="name"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-3 rounded-lg border border-surface-border focus:ring-2 focus:ring-primary/20 focus:border-primary bg-white text-navy"
                        placeholder="John Doe"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-bold text-navy mb-2">Email Address</label>
                      <input
                        type="email"
                        id="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-3 rounded-lg border border-surface-border focus:ring-2 focus:ring-primary/20 focus:border-primary bg-white text-navy"
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="subject" className="block text-sm font-bold text-navy mb-2">Subject</label>
                    <input
                      type="text"
                      id="subject"
                      required
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg border border-surface-border focus:ring-2 focus:ring-primary/20 focus:border-primary bg-white text-navy"
                      placeholder="Institutional onboarding, partnership opportunity, etc."
                    />
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-sm font-bold text-navy mb-2">Message</label>
                    <textarea
                      id="message"
                      rows="5"
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg border border-surface-border focus:ring-2 focus:ring-primary/20 focus:border-primary bg-white text-navy"
                      placeholder="Write your message here..."
                    ></textarea>
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-primary text-white py-4 rounded-lg font-bold hover:bg-red-700 transition-colors shadow-lg shadow-primary/20"
                  >
                    Send Message
                  </button>
                </form>
              )}
            </div>

          </div>
        </div>
      </section>
    </>
  );
}
