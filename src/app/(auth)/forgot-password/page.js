"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

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

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [step, setStep] = useState(1); // 1: Enter email/phone, 2: Enter OTP & New Password, 3: Success
  const [identity, setIdentity] = useState("");
  const [form, setForm] = useState({
    code: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes timer for OTP step
  const [isResendDisabled, setIsResendDisabled] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [failedAttempts, setFailedAttempts] = useState(0);
  const [isLocked, setIsLocked] = useState(false);
  const [lockoutCountdown, setLockoutCountdown] = useState(5);

  // Timer Countdown logic for Step 2
  useEffect(() => {
    if (step !== 2 || isLocked) return;
    if (timeLeft <= 0) {
      setIsResendDisabled(false);
      return;
    }
    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, step, isLocked]);

  // Lockout countdown and redirect logic
  useEffect(() => {
    if (!isLocked) return;
    if (lockoutCountdown <= 0) {
      setIsLocked(false);
      setFailedAttempts(0);
      setStep(1);
      setIdentity("");
      setForm({ code: "", password: "", confirmPassword: "" });
      setLockoutCountdown(5);
      return;
    }
    const timer = setInterval(() => {
      setLockoutCountdown((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [isLocked, lockoutCountdown]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const handleIdentitySubmit = (e) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setStep(2);
      setTimeLeft(300);
      setIsResendDisabled(true);
      setFailedAttempts(0);
    }, 1500);
  };

  const handleResetSubmit = (e) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      
      // Simulate verification - for demo, code must be "123456"
      if (form.code !== "123456") {
        const attempts = failedAttempts + 1;
        setFailedAttempts(attempts);
        setForm((prev) => ({ ...prev, code: "" }));
        
        if (attempts >= 3) {
          setIsLocked(true);
        } else {
          alert(`Invalid reset code. Attempts remaining: ${3 - attempts}`);
        }
      } else {
        setStep(3);
      }
    }, 2000);
  };

  const handleResend = () => {
    setTimeLeft(300);
    setIsResendDisabled(true);
    setForm((prev) => ({ ...prev, code: "" }));
    alert("A new reset code has been sent.");
  };

  return (
    <section className="section-padding flex items-center justify-center min-h-[calc(100vh-4rem)]">
      <div className="container-content max-w-md mx-auto">
        {/* Back Link (Only for Step 1 & 2 when not locked) */}
        {step < 3 && !isLocked && (
          <div className="mb-8 text-left">
            <Link
              href="/login"
              className="inline-flex items-center gap-2 text-on-surface-variant hover:text-primary transition-colors font-bold text-sm uppercase tracking-wider"
            >
              <span className="material-symbols-outlined text-lg">arrow_back</span>
              Back to Sign In
            </Link>
          </div>
        )}

        {/* Form Card */}
        <div className="bg-surface-container-lowest rounded-2xl p-6 md:p-8 border border-surface-border shadow-xl relative overflow-hidden">
          {isLocked ? (
            <div className="text-center py-6 space-y-6">
              <span className="material-symbols-outlined text-6xl text-error animate-pulse-glow rounded-full p-2">
                gpp_bad
              </span>
              <h3 className="font-headline-md text-on-surface mb-2">Verification Locked</h3>
              <p className="text-on-surface-variant max-w-md mx-auto text-sm">
                You have entered the wrong code too many times. For security, this password reset session is locked.
              </p>
              <div className="p-4 bg-surface-container-low rounded-xl inline-block">
                <p className="text-sm font-label-bold">
                  Redirecting to start in <span className="text-primary font-bold">{lockoutCountdown}s</span>...
                </p>
              </div>
            </div>
          ) : step === 1 ? (
            <>
              <header className="mb-8 text-center md:text-left">
                <h1 className="font-headline-lg text-3xl text-on-surface mb-2">Reset Password</h1>
                <p className="text-on-surface-variant text-sm">
                  Enter your email or phone number and we&apos;ll send you a code to reset your password.
                </p>
              </header>

              <form onSubmit={handleIdentitySubmit} className="space-y-6">
                <div className="space-y-2">
                  <label className="block font-label-bold text-sm text-on-surface-variant px-1" htmlFor="identity">
                    Email or Phone Number
                  </label>
                  <div className="relative group">
                    <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant transition-colors group-focus-within:text-primary">
                      alternate_email
                    </span>
                    <input
                      id="identity"
                      type="text"
                      value={identity}
                      onChange={(e) => setIdentity(e.target.value)}
                      placeholder="name@college.edu"
                      required
                      className="w-full pl-12 pr-4 py-3.5 bg-surface-container-lowest border border-surface-border rounded-xl transition-all placeholder:text-on-surface-variant/40 focus:outline-none focus:border-primary focus:shadow-[0_0_0_2px_rgba(188,1,0,0.2)]"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full bg-primary text-on-primary py-4.5 rounded-xl font-label-bold shadow-xl shadow-primary/30 hover:brightness-110 active:scale-[0.99] transition-all flex items-center justify-center gap-3 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {submitting ? (
                    <>
                      <span className="material-symbols-outlined animate-spin">progress_activity</span>
                      Sending code...
                    </>
                  ) : (
                    <>
                      Send Reset Code
                      <span className="material-symbols-outlined text-lg">arrow_forward</span>
                    </>
                  )}
                </button>
              </form>
            </>
          ) : step === 2 ? (
            <>
              <header className="mb-8 text-center md:text-left">
                <h1 className="font-headline-lg text-3xl text-on-surface mb-2">Create New Password</h1>
                <p className="text-on-surface-variant text-sm">
                  We sent a 6-digit verification code to <span className="font-semibold text-on-surface">{identity}</span>.
                  <br />
                  <span className="text-xs text-on-surface-variant/60 font-semibold mt-1 block">
                    (For demo, use code <span className="text-primary font-bold">123456</span>)
                  </span>
                </p>
              </header>

              <form onSubmit={handleResetSubmit} className="space-y-6">
                {/* Code field */}
                <div className="space-y-2">
                  <label className="block font-label-bold text-sm text-on-surface-variant px-1" htmlFor="code">
                    Verification Code
                  </label>
                  <div className="relative group">
                    <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant transition-colors group-focus-within:text-primary">
                      pin
                    </span>
                    <input
                      id="code"
                      type="text"
                      maxLength={6}
                      value={form.code}
                      onChange={(e) => setForm({ ...form, code: e.target.value })}
                      placeholder="e.g. 123456"
                      required
                      className="w-full pl-12 pr-4 py-3.5 bg-surface-container-lowest border border-surface-border rounded-xl transition-all placeholder:text-on-surface-variant/40 focus:outline-none focus:border-primary focus:shadow-[0_0_0_2px_rgba(188,1,0,0.2)]"
                    />
                  </div>
                </div>

                {/* New Password */}
                <div className="space-y-2">
                  <label className="block font-label-bold text-sm text-on-surface-variant px-1" htmlFor="password">
                    New Password
                  </label>
                  <div className="relative group">
                    <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant transition-colors group-focus-within:text-primary">
                      lock
                    </span>
                    <input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      value={form.password}
                      onChange={(e) => setForm({ ...form, password: e.target.value })}
                      placeholder="••••••••"
                      required
                      minLength={8}
                      className="w-full pl-12 pr-12 py-3.5 bg-surface-container-lowest border border-surface-border rounded-xl transition-all placeholder:text-on-surface-variant/40 focus:outline-none focus:border-primary focus:shadow-[0_0_0_2px_rgba(188,1,0,0.2)]"
                    />
                    <TogglePassword visible={showPassword} onClick={() => setShowPassword((v) => !v)} />
                  </div>
                  <PasswordStrength value={form.password} />
                </div>

                {/* Confirm Password */}
                <div className="space-y-2">
                  <label className="block font-label-bold text-sm text-on-surface-variant px-1" htmlFor="confirmPassword">
                    Confirm New Password
                  </label>
                  <div className="relative group">
                    <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant transition-colors group-focus-within:text-primary">
                      lock
                    </span>
                    <input
                      id="confirmPassword"
                      type={showPassword ? "text" : "password"}
                      value={form.confirmPassword}
                      onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
                      placeholder="••••••••"
                      required
                      className="w-full pl-12 pr-12 py-3.5 bg-surface-container-lowest border border-surface-border rounded-xl transition-all placeholder:text-on-surface-variant/40 focus:outline-none focus:border-primary focus:shadow-[0_0_0_2px_rgba(188,1,0,0.2)]"
                    />
                  </div>
                </div>

                <p className="text-center text-sm text-on-surface-variant">
                  {timeLeft > 0 ? (
                    <>
                      Code expires in: <span className="font-bold text-primary">{formatTime(timeLeft)}</span>
                    </>
                  ) : (
                    <span className="text-error font-bold">Code has expired.</span>
                  )}
                </p>

                <div className="flex flex-col md:flex-row gap-4 justify-between items-center pt-2">
                  <button
                    type="button"
                    onClick={handleResend}
                    disabled={isResendDisabled}
                    className="btn-secondary w-full md:w-auto disabled:opacity-40 disabled:cursor-not-allowed text-center justify-center"
                  >
                    Resend Code
                  </button>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="btn-primary w-full md:w-auto text-center justify-center"
                  >
                    {submitting ? "Resetting..." : "Reset Password"}
                  </button>
                </div>
              </form>
            </>
          ) : (
            <div className="text-center py-6 space-y-6">
              <span className="material-symbols-outlined text-6xl text-primary animate-scale-in">
                check_circle
              </span>
              <h1 className="font-headline-lg text-3xl text-on-surface">Password Reset Successful</h1>
              <p className="text-on-surface-variant text-sm max-w-xs mx-auto">
                Your password has been successfully updated. You can now sign in with your new credentials.
              </p>
              <div className="pt-4">
                <Link href="/login" className="btn-primary w-full justify-center">
                  Sign In Now
                  <span className="material-symbols-outlined">arrow_forward</span>
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
