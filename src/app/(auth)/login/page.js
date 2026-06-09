"use client";

import Link from "next/link";
import { useState } from "react";
import SessionTimeoutModal from "@/components/auth/SessionTimeoutModal";

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

export default function LoginPage() {
  const [activeTab, setActiveTab] = useState("student"); // "student" or "admin"
  const [form, setForm] = useState({
    identity: "",
    password: "",
    rememberMe: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [sessionTimeoutOpen, setSessionTimeoutOpen] = useState(false);

  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    setSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setSubmitting(false);
      alert(`${activeTab === "student" ? "Student" : "Admin"} Login Simulated Successfully!`);
    }, 2000);
  }

  return (
    <section className="section-padding flex items-center justify-center min-h-[calc(100vh-4rem)]">
      <div className="container-content max-w-md mx-auto">
        {/* Back Navigation */}
        <div className="mb-8 text-left">
          <Link href="/" className="inline-flex items-center gap-2 text-on-surface-variant hover:text-primary transition-colors font-bold text-sm uppercase tracking-wider">
            <span className="material-symbols-outlined text-lg">arrow_back</span>
            Back to Home
          </Link>
        </div>

        {/* Tab Selection */}
        <div className="flex mb-8 bg-surface-container-low p-1.5 rounded-2xl border border-surface-border">
          <button
            type="button"
            className={`flex-grow py-3 px-6 rounded-xl font-label-bold text-sm transition-all duration-300 ${
              activeTab === "student"
                ? "bg-surface-container-lowest text-primary shadow-md"
                : "text-on-surface-variant hover:text-on-surface"
            }`}
            onClick={() => {
              setActiveTab("student");
              setForm((prev) => ({ ...prev, identity: "" }));
            }}
          >
            Student Login
          </button>
          <button
            type="button"
            className={`flex-grow py-3 px-6 rounded-xl font-label-bold text-sm transition-all duration-300 ${
              activeTab === "admin"
                ? "bg-surface-container-lowest text-primary shadow-md"
                : "text-on-surface-variant hover:text-on-surface"
            }`}
            onClick={() => {
              setActiveTab("admin");
              setForm((prev) => ({ ...prev, identity: "" }));
            }}
          >
            Admin Access
          </button>
        </div>

        {/* Login Card */}
        <div className="bg-surface-container-lowest rounded-2xl p-6 md:p-8 border border-surface-border shadow-xl relative overflow-hidden">
          <header className="mb-8 text-center md:text-left">
            <h1 className="font-headline-lg text-3xl text-on-surface mb-2">
              {activeTab === "student" ? "Welcome Back" : "Admin Portal"}
            </h1>
            <p className="text-on-surface-variant text-sm">
              {activeTab === "student"
                ? "Please enter your student credentials to access the portal."
                : "Authorized personnel only. Please enter your administrator credentials."}
            </p>
          </header>

          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Identity Field */}
            <div className="space-y-2">
              <label className="block font-label-bold text-sm text-on-surface-variant px-1" htmlFor="identity">
                {activeTab === "student" ? "Email or Phone Number" : "Admin ID or Email"}
              </label>
              <div className="relative group">
                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant transition-colors group-focus-within:text-primary">
                  {activeTab === "student" ? "alternate_email" : "person"}
                </span>
                <input
                  id="identity"
                  name="identity"
                  type="text"
                  value={form.identity}
                  onChange={handleChange}
                  placeholder={activeTab === "student" ? "name@college.edu" : "admin@tnconnect.org"}
                  required
                  className="w-full pl-12 pr-4 py-3.5 bg-surface-container-lowest border border-surface-border rounded-xl transition-all placeholder:text-on-surface-variant/40 focus:outline-none focus:border-primary focus:shadow-[0_0_0_2px_rgba(188,1,0,0.2)]"
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <label className="block font-label-bold text-sm text-on-surface-variant px-1" htmlFor="password">
                Password
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
                  placeholder="••••••••"
                  required
                  className="w-full pl-12 pr-12 py-3.5 bg-surface-container-lowest border border-surface-border rounded-xl transition-all placeholder:text-on-surface-variant/40 focus:outline-none focus:border-primary focus:shadow-[0_0_0_2px_rgba(188,1,0,0.2)]"
                />
                <TogglePassword visible={showPassword} onClick={() => setShowPassword((v) => !v)} />
              </div>
            </div>

            {/* Remember Me & Forgot Password (Same Row) */}
            <div className="flex items-center justify-between px-1">
              <label className="flex items-center gap-2.5 cursor-pointer">
                <input
                  id="rememberMe"
                  name="rememberMe"
                  type="checkbox"
                  checked={form.rememberMe}
                  onChange={handleChange}
                  className="w-4 h-4 accent-primary border-surface-border rounded focus:ring-primary focus:ring-offset-0 focus:ring-opacity-20 cursor-pointer"
                />
                <span className="text-sm text-on-surface-variant hover:text-on-surface select-none transition-colors">
                  Remember Me
                </span>
              </label>
              <Link href="/forgot-password" className="text-sm font-label-bold text-primary hover:underline underline-offset-4 decoration-primary/30">
                Forgot Password?
              </Link>
            </div>

            {/* Action Buttons */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={submitting}
                className="w-full bg-primary text-on-primary py-4.5 rounded-xl font-label-bold shadow-xl shadow-primary/30 hover:brightness-110 active:scale-[0.99] transition-all flex items-center justify-center gap-3 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {submitting ? (
                  <>
                    <span className="material-symbols-outlined animate-spin">progress_activity</span>
                    Signing in...
                  </>
                ) : (
                  <>
                    Sign In
                    <span className="material-symbols-outlined text-lg">arrow_forward</span>
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Help / Footer */}
          {activeTab === "student" && (
            <div className="mt-8 pt-6 border-t border-surface-border text-center">
              <p className="text-sm text-on-surface-variant">
                Don&apos;t have an account?{" "}
                <Link href="/registration" className="text-primary font-bold hover:underline underline-offset-4 decoration-primary/30">
                  Register free
                </Link>
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Session Timeout Modal Preview */}
      <SessionTimeoutModal
        isOpen={sessionTimeoutOpen}
        onExtend={() => setSessionTimeoutOpen(false)}
        onSignOut={() => {
          setSessionTimeoutOpen(false);
          alert("Signed out successfully due to inactivity!");
        }}
        countdownSeconds={10}
      />
    </section>
  );
}
