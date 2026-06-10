"use client";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";

export default function VerifyPage() {
    const [otp, setOtp] = useState(["", "", "", "", "", ""]);
    const [timeLeft, setTimeLeft] = useState(300);
    const [canResend, setCanResend] = useState(false);
    const inputs = useRef([]);

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft((prev) => {
                if (prev <= 1) {
                    clearInterval(timer);
                    setCanResend(true);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;

    function handleChange(value, index) {
        if (!/^\d*$/.test(value)) return;
        const newOtp = [...otp];
        newOtp[index] = value.slice(-1);
        setOtp(newOtp);
        if (value && index < 5) inputs.current[index + 1].focus();
    }

    function handleKeyDown(e, index) {
        if (e.key === "Backspace" && !otp[index] && index > 0) {
            inputs.current[index - 1].focus();
        }
    }

    function handleSubmit(e) {
        e.preventDefault();
        const code = otp.join("");
        if (code.length === 6) {
            window.location.href = "/success";
        }
    }

    return (
        <section className="section-padding min-h-screen flex items-center justify-center">
            <div className="w-full max-w-[480px] mx-auto">
                {/* Progress */}
                <div className="mb-8">
                    <div className="flex justify-between items-end mb-2">
                        <h1 className="text-3xl font-black" style={{ color: "var(--color-on-surface)" }}>
                            Verify Identity
                        </h1>
                        <span className="text-sm font-semibold" style={{ color: "var(--color-on-surface-variant)" }}>
                            Step 2 of 3
                        </span>
                    </div>
                    <div className="h-2 w-full bg-surface-container-highest rounded-full overflow-hidden">
                        <div className="h-full bg-primary w-2/3 transition-all duration-500"></div>
                    </div>
                </div>

                {/* Card */}
                <div className="bg-surface-container-lowest border border-surface-border rounded-2xl shadow-xl p-8">
                    <div className="flex flex-col items-center text-center mb-8">
                        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                            <span className="material-symbols-outlined text-primary text-3xl">mark_email_read</span>
                        </div>
                        <h2 className="text-2xl font-black mb-2" style={{ color: "var(--color-on-surface)" }}>
                            Check your inbox
                        </h2>
                        <p style={{ color: "var(--color-on-surface-variant)" }}>
                            We sent a 6-digit verification code to your email. Please enter it below.
                        </p>
                    </div>

                    {/* OTP Inputs */}
                    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                        <div className="flex justify-between gap-2">
                            {otp.map((digit, index) => (
                                <input
                                    key={index}
                                    ref={(el) => (inputs.current[index] = el)}
                                    type="text"
                                    inputMode="numeric"
                                    maxLength={1}
                                    value={digit}
                                    onChange={(e) => handleChange(e.target.value, index)}
                                    onKeyDown={(e) => handleKeyDown(e, index)}
                                    className="w-12 h-14 md:w-16 md:h-20 text-center text-2xl font-black bg-surface-container rounded-xl border-2 border-surface-border focus:border-primary focus:outline-none transition-all"
                                />
                            ))}
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-primary text-on-primary font-bold py-4 rounded-xl hover:brightness-110 active:scale-[0.98] transition-all"
                        >
                            Verify Code
                        </button>
                    </form>

                    {/* Timer */}
                    <div className="mt-6 flex flex-col items-center gap-2">
                        <p style={{ color: "var(--color-on-surface-variant)" }} className="text-sm">
                            Code expires in{" "}
                            <span className="font-black" style={{ color: "var(--color-on-surface)" }}>
                                {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
                            </span>
                        </p>
                        <button
                            disabled={!canResend}
                            className={`text-sm font-bold flex items-center gap-1 transition-colors ${canResend ? "text-primary hover:underline" : "text-outline cursor-not-allowed"
                                }`}
                        >
                            <span className="material-symbols-outlined text-sm">refresh</span>
                            Resend Code
                        </button>
                    </div>
                </div>

                <p className="mt-6 text-center text-sm" style={{ color: "var(--color-on-surface-variant)" }}>
                    Need help?{" "}
                    <Link href="#" className="text-primary font-bold hover:underline">
                        Contact Support
                    </Link>
                </p>
            </div>
        </section>
    );
}