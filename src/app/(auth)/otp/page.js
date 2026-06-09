"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect, useRef } from "react";

export default function OTPPage() {
  const router = useRouter();
  const [step, setStep] = useState(2); // Step 2: Verification, Step 3: Success Confirmation
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes in seconds
  const [isResendDisabled, setIsResendDisabled] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [failedAttempts, setFailedAttempts] = useState(0);
  const [isLocked, setIsLocked] = useState(false);
  const [lockoutCountdown, setLockoutCountdown] = useState(5);
  const inputRefs = useRef([]);

  // Timer Countdown logic
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

  // Lockout Countdown and redirect logic
  useEffect(() => {
    if (!isLocked) return;
    if (lockoutCountdown <= 0) {
      router.push("/registration");
      return;
    }
    const timer = setInterval(() => {
      setLockoutCountdown((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [isLocked, lockoutCountdown, router]);

  // Format seconds to MM:SS
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  // Handle Input typing and advancing focus
  const handleInputChange = (value, index) => {
    if (isLocked) return;
    if (isNaN(value)) return; // Only allow digits

    const newOtp = [...otp];
    newOtp[index] = value.substring(value.length - 1); // Keep only the last character
    setOtp(newOtp);

    // Auto-advance to next input
    if (value && index < 5) {
      inputRefs.current[index + 1].focus();
    }

    // Auto-submit when all fields are filled
    if (newOtp.every((val) => val !== "") && !submitting) {
      triggerSubmit(newOtp.join(""));
    }
  };

  // Handle Backspace and focus shift
  const handleKeyDown = (e, index) => {
    if (isLocked) return;
    if (e.key === "Backspace") {
      if (!otp[index] && index > 0) {
        inputRefs.current[index - 1].focus();
      }
    }
  };

  // Handle pasting code
  const handlePaste = (e) => {
    if (isLocked) return;
    e.preventDefault();
    const pasteData = e.clipboardData.getData("text").trim();
    if (pasteData.length === 6 && /^\d+$/.test(pasteData)) {
      const newOtp = pasteData.split("");
      setOtp(newOtp);
      triggerSubmit(pasteData);
    }
  };

  const triggerSubmit = (code) => {
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      // Simulate verification - e.g. code "123456" or any code if first try,
      // but let's simulate a failure if code is not "123456" to demonstrate the lockout
      if (code !== "123456") {
        const attempts = failedAttempts + 1;
        setFailedAttempts(attempts);
        setOtp(["", "", "", "", "", ""]);
        inputRefs.current[0].focus();

        if (attempts >= 3) {
          setIsLocked(true);
        } else {
          alert(`Invalid verification code. Attempts remaining: ${3 - attempts}`);
        }
      } else {
        setStep(3); // Success/Confirmation
      }
    }, 1500);
  };

  const handleResend = () => {
    setTimeLeft(300);
    setIsResendDisabled(true);
    setOtp(["", "", "", "", "", ""]);
    alert("Verification code has been resent to your phone.");
  };

  return (
    <section className="section-padding flex items-center justify-center min-h-[calc(100vh-4rem)]">
      <div className="container-content max-w-2xl mx-auto">
        {/* Back Navigation */}
        {step === 2 && !isLocked && (
          <div className="mb-8">
            <Link href="/registration" className="inline-flex items-center gap-2 text-on-surface-variant hover:text-primary transition-colors font-bold text-sm uppercase tracking-wider">
              <span className="material-symbols-outlined text-lg">arrow_back</span>
              Back to Profile Creation
            </Link>
          </div>
        )}

        {/* Progress Stepper */}
        <div className="mb-10 text-center">
          <div className="inline-flex flex-col items-center">
            <span className="font-label-bold text-sm text-primary uppercase tracking-[0.2em] mb-4">
              Step {step} of 3
            </span>
            <h2 className="font-headline-lg text-3xl text-on-surface mb-6">
              {step === 2 ? "Verify Your Phone Number" : "Account Verified"}
            </h2>
          </div>
          <div className="w-full bg-surface-border h-1.5 rounded-full max-w-md mx-auto relative">
            <div 
              className="absolute top-0 left-0 bg-primary h-full rounded-full transition-all duration-700 ease-in-out shadow-[0_0_12px_rgba(188,1,0,0.4)]" 
              style={{ width: step === 2 ? "66.6%" : "100%" }}
            />
            <div className="absolute top-1/2 left-0 -translate-y-1/2 -translate-x-1/2 w-4 h-4 bg-primary border-4 border-white rounded-full" />
            <div className="absolute top-1/2 left-1/3 -translate-y-1/2 -translate-x-1/2 w-4 h-4 bg-primary border-4 border-white rounded-full" />
            <div className={`absolute top-1/2 left-2/3 -translate-y-1/2 -translate-x-1/2 w-4 h-4 border-4 border-white rounded-full ${step >= 2 ? "bg-primary" : "bg-surface-border"}`} />
            <div className={`absolute top-1/2 left-full -translate-y-1/2 -translate-x-1/2 w-4 h-4 border-4 border-white rounded-full ${step >= 3 ? "bg-primary" : "bg-surface-border"}`} />
          </div>
        </div>

        {/* Card Container */}
        <div className="bg-surface-container-lowest rounded-2xl p-6 md:p-8 border border-surface-border shadow-xl relative overflow-hidden">
          {isLocked ? (
            <div className="text-center py-6 space-y-6">
              <span className="material-symbols-outlined text-6xl text-error animate-pulse-glow rounded-full p-2">
                gpp_bad
              </span>
              <h3 className="font-headline-md text-on-surface mb-2">Verification Locked</h3>
              <p className="text-on-surface-variant max-w-md mx-auto text-sm">
                You have entered the wrong code too many times. For security, this registration session is locked.
              </p>
              <div className="p-4 bg-surface-container-low rounded-xl inline-block">
                <p className="text-sm font-label-bold">
                  Redirecting to registration in <span className="text-primary font-bold">{lockoutCountdown}s</span>...
                </p>
              </div>
            </div>
          ) : step === 2 ? (
            <>
              <header className="mb-8 text-center">
                <h3 className="font-headline-md text-on-surface mb-2">Enter Verification Code</h3>
                <p className="text-on-surface-variant max-w-md mx-auto text-sm">
                  We have sent a 6-digit confirmation code via SMS to your registered phone number.
                  <br />
                  <span className="text-xs text-on-surface-variant/60 font-semibold mt-1 block">
                    (For demo purposes, enter <span className="text-primary font-bold">123456</span>)
                  </span>
                </p>
              </header>

              {/* OTP Digit Inputs */}
              <div className="flex justify-center gap-3 md:gap-4 my-8" onPaste={handlePaste}>
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    ref={(el) => (inputRefs.current[index] = el)}
                    type="text"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleInputChange(e.target.value, index)}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                    className="w-12 h-14 md:w-16 md:h-16 text-center text-2xl font-bold bg-surface-container-lowest border border-surface-border rounded-xl focus:outline-none focus:border-primary focus:shadow-[0_0_0_2px_rgba(188,1,0,0.2)] transition-all"
                  />
                ))}
              </div>

              {/* Timer and Resend Actions */}
              <div className="text-center space-y-6">
                <p className="text-sm text-on-surface-variant">
                  {timeLeft > 0 ? (
                    <>
                      Code expires in: <span className="font-bold text-primary">{formatTime(timeLeft)}</span>
                    </>
                  ) : (
                    <span className="text-error font-bold">The verification code has expired.</span>
                  )}
                </p>

                <div className="pt-4 border-t border-surface-border flex flex-col md:flex-row justify-between items-center gap-4">
                  <button
                    type="button"
                    onClick={handleResend}
                    disabled={isResendDisabled}
                    className="btn-secondary w-full md:w-auto disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    <span className="material-symbols-outlined">restart_alt</span>
                    Resend Code
                  </button>

                  <button
                    type="button"
                    disabled={submitting || otp.some((val) => val === "")}
                    onClick={() => triggerSubmit(otp.join(""))}
                    className="btn-primary w-full md:w-auto disabled:opacity-55 disabled:cursor-not-allowed"
                  >
                    {submitting ? (
                      <>
                        <span className="material-symbols-outlined animate-spin">progress_activity</span>
                        Verifying...
                      </>
                    ) : (
                      <>
                        Verify & Continue
                        <span className="material-symbols-outlined">arrow_forward</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </>
          ) : (
            /* Step 3: Success Confirmation */
            <div className="text-center py-6 space-y-6">
              <span className="material-symbols-outlined text-6xl text-primary animate-scale-in">
                check_circle
              </span>
              <h3 className="font-headline-md text-on-surface">Registration Completed</h3>
              <p className="text-on-surface-variant text-sm max-w-sm mx-auto">
                Thank you! Your phone number has been verified, and your TN CONNECT member account is now active.
              </p>
              <div className="pt-6 border-t border-surface-border">
                <Link href="/login" className="btn-primary w-full justify-center">
                  Sign In to Your Dashboard
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
