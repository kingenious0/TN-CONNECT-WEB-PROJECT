"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

function PasswordStrength({ value }) {
  let strength = 0;
  if (value.length >= 8) strength++;
  if (/[A-Z]/.test(value) && /[a-z]/.test(value)) strength++;
  if (/[0-9]/.test(value)) strength++;
  if (/[^A-Za-z0-9]/.test(value)) strength++;

  const colors = ["", "bg-error", "bg-secondary", "bg-tertiary", "bg-primary"];
  const labels = [
    "Use 8+ characters with a mix of letters and numbers.",
    "Weak password",
    "Fair security",
    "Strong security",
    "Excellent security",
  ];
  const labelColors = [
    "text-on-surface-variant",
    "text-error",
    "text-secondary",
    "text-tertiary",
    "text-primary",
  ];

  return (
    <div className="mt-3 px-1">
      <div className="flex gap-2 h-1.5 mb-2">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className={`h-full flex-1 rounded-full transition-all duration-300 ${i <= strength ? colors[strength] : "bg-surface-border"}`}
          />
        ))}
      </div>
      <p className={`text-xs font-caption transition-colors duration-300 ${labelColors[strength]}`}>
        {labels[strength]}
      </p>
    </div>
  );
}

function TogglePassword({ visible, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="absolute right-4 top-1/2 -translate-y-1/2 text-on-surface-variant hover:text-primary transition-colors"
    >
      <span className="material-symbols-outlined">{visible ? "visibility_off" : "visibility"}</span>
    </button>
  );
}

export default function RegistrationPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    fullName: "",
    schoolName: "",
    course: "",
    phone: "",
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  function handleChange(e) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    setSubmitting(true);
    const btn = e.target.querySelector('button[type="submit"]');
    btn.disabled = true;
    setTimeout(() => {
      setSubmitting(false);
      btn.disabled = false;
      router.push("/otp");
    }, 1500);
  }

  return (
    <section className="section-padding">
      <div className="container-content max-w-2xl mx-auto">
        {/* Back Navigation */}
        <div className="mb-8">
          <Link href="/" className="inline-flex items-center gap-2 text-on-surface-variant hover:text-primary transition-colors font-bold text-sm uppercase tracking-wider">
            <span className="material-symbols-outlined text-lg">arrow_back</span>
            Back to Home
          </Link>
        </div>

        {/* Progress Bar */}
        <div className="mb-10 text-center">
          <div className="inline-flex flex-col items-center">
            <span className="font-label-bold text-sm text-primary uppercase tracking-[0.2em] mb-4">
              Step 1 of 3
            </span>
            <h2 className="font-headline-lg text-3xl text-on-surface mb-6">
              Create Your Profile
            </h2>
          </div>
          <div className="w-full bg-surface-border h-1.5 rounded-full max-w-md mx-auto relative">
            <div className="absolute top-0 left-0 bg-primary h-full w-1/3 rounded-full transition-all duration-700 ease-in-out shadow-[0_0_12px_rgba(188,1,0,0.4)]" />
            <div className="absolute top-1/2 left-0 -translate-y-1/2 -translate-x-1/2 w-4 h-4 bg-primary border-4 border-white rounded-full" />
            <div className="absolute top-1/2 left-1/3 -translate-y-1/2 -translate-x-1/2 w-4 h-4 bg-surface-border border-4 border-white rounded-full" />
            <div className="absolute top-1/2 left-2/3 -translate-y-1/2 -translate-x-1/2 w-4 h-4 bg-surface-border border-4 border-white rounded-full" />
            <div className="absolute top-1/2 left-full -translate-y-1/2 -translate-x-1/2 w-4 h-4 bg-surface-border border-4 border-white rounded-full" />
          </div>
        </div>

        {/* Form Card */}
        <div className="bg-surface-container-lowest rounded-2xl p-gap-md md:p-xl border border-surface-border shadow-xl relative overflow-hidden">
          <header className="mb-10">
            <h3 className="font-headline-md text-on-surface mb-2">Member Information</h3>
            <p className="text-on-surface-variant">
              We&apos;ll use this information to customize your experience and help you connect with others in the community.
            </p>
          </header>

          <form className="space-y-8" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-gutter gap-y-8">
              {/* Full Name */}
              <div className="space-y-2 col-span-2">
                <label className="block font-label-bold text-sm text-on-surface-variant px-1" htmlFor="fullName">
                  Legal Full Name
                </label>
                <div className="relative group">
                  <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant transition-colors group-focus-within:text-primary">
                    person
                  </span>
                  <input
                    id="fullName"
                    name="fullName"
                    type="text"
                    value={form.fullName}
                    onChange={handleChange}
                    placeholder="e.g. Johnathan Doe"
                    required
                    className="w-full pl-12 pr-4 py-3.5 bg-surface-container-lowest border border-surface-border rounded-xl transition-all placeholder:text-on-surface-variant/40 focus:outline-none focus:border-primary focus:shadow-[0_0_0_2px_rgba(188,1,0,0.2)]"
                  />
                </div>
              </div>

              {/* School Name */}
              <div className="space-y-2 col-span-2">
                <label className="block font-label-bold text-sm text-on-surface-variant px-1" htmlFor="schoolName">
                  Current Educational Institution
                </label>
                <div className="relative group">
                  <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant transition-colors group-focus-within:text-primary">
                    school
                  </span>
                  <input
                    id="schoolName"
                    name="schoolName"
                    type="text"
                    value={form.schoolName}
                    onChange={handleChange}
                    placeholder="e.g. Stanford University"
                    required
                    className="w-full pl-12 pr-4 py-3.5 bg-surface-container-lowest border border-surface-border rounded-xl transition-all placeholder:text-on-surface-variant/40 focus:outline-none focus:border-primary focus:shadow-[0_0_0_2px_rgba(188,1,0,0.2)]"
                  />
                </div>
              </div>

              {/* Programme/Major */}
              <div className="space-y-2">
                <label className="block font-label-bold text-sm text-on-surface-variant px-1" htmlFor="course">
                  Programme/Major
                </label>
                <div className="relative group">
                  <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant transition-colors group-focus-within:text-primary">
                    auto_stories
                  </span>
                  <input
                    id="course"
                    name="course"
                    type="text"
                    value={form.course}
                    onChange={handleChange}
                    placeholder="BSc Computer Science"
                    required
                    className="w-full pl-12 pr-4 py-3.5 bg-surface-container-lowest border border-surface-border rounded-xl transition-all placeholder:text-on-surface-variant/40 focus:outline-none focus:border-primary focus:shadow-[0_0_0_2px_rgba(188,1,0,0.2)]"
                  />
                </div>
              </div>

              {/* Phone Number */}
              <div className="space-y-2">
                <label className="block font-label-bold text-sm text-on-surface-variant px-1" htmlFor="phone">
                  Phone Number
                </label>
                <div className="relative group">
                  <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant transition-colors group-focus-within:text-primary">
                    call
                  </span>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="+1 (555) 000-0000"
                    required
                    className="w-full pl-12 pr-4 py-3.5 bg-surface-container-lowest border border-surface-border rounded-xl transition-all placeholder:text-on-surface-variant/40 focus:outline-none focus:border-primary focus:shadow-[0_0_0_2px_rgba(188,1,0,0.2)]"
                  />
                </div>
              </div>

              {/* Email */}
              <div className="space-y-2 col-span-2">
                <label className="block font-label-bold text-sm text-on-surface-variant px-1" htmlFor="email">
                  Email Address <span className="text-on-surface-variant/60 font-normal ml-1">(Recommended)</span>
                </label>
                <div className="relative group">
                  <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant transition-colors group-focus-within:text-primary">
                    mail
                  </span>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="john.doe@university.edu"
                    className="w-full pl-12 pr-4 py-3.5 bg-surface-container-lowest border border-surface-border rounded-xl transition-all placeholder:text-on-surface-variant/40 focus:outline-none focus:border-primary focus:shadow-[0_0_0_2px_rgba(188,1,0,0.2)]"
                  />
                </div>
              </div>

              {/* Password */}
              <div className="space-y-2 col-span-2">
                <label className="block font-label-bold text-sm text-on-surface-variant px-1" htmlFor="password">
                  Security Password
                </label>
                <div className="relative group">
                  <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant transition-colors group-focus-within:text-primary">
                    lock
                  </span>
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    value={form.password}
                    onChange={handleChange}
                    placeholder="••••••••••••"
                    required
                    minLength={8}
                    className="w-full pl-12 pr-12 py-3.5 bg-surface-container-lowest border border-surface-border rounded-xl transition-all placeholder:text-on-surface-variant/40 focus:outline-none focus:border-primary focus:shadow-[0_0_0_2px_rgba(188,1,0,0.2)]"
                  />
                  <TogglePassword visible={showPassword} onClick={() => setShowPassword((v) => !v)} />
                </div>
                <PasswordStrength value={form.password} />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-8 space-y-6">
              <button
                type="submit"
                disabled={submitting}
                className="w-full bg-primary text-on-primary py-4.5 rounded-xl font-label-bold shadow-xl shadow-primary/30 hover:brightness-110 active:scale-[0.99] transition-all flex items-center justify-center gap-3 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {submitting ? (
                  <>
                    <span className="material-symbols-outlined animate-spin">progress_activity</span>
                    Processing...
                  </>
                ) : (
                  <>
                    Continue to Verification
                    <span className="material-symbols-outlined text-lg">arrow_forward</span>
                  </>
                )}
              </button>
              <p className="text-center text-on-surface-variant">
                Already a member?{" "}
                <Link href="/login" className="text-primary font-bold hover:underline underline-offset-4 decoration-primary/30">
                  Sign in instead
                </Link>
              </p>
            </div>
          </form>
        </div>

        <div className="mt-12 text-center">
          <p className="text-on-surface-variant/40 text-sm">
            By creating an account, you agree to our Terms of Service and Privacy Policy.
          </p>
        </div>
      </div>
    </section>
  );
}
