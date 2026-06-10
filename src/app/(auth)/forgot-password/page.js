"use client";
import Link from "next/link";
import { useState } from "react";

export default function ForgotPasswordPage() {
    const [submitted, setSubmitted] = useState(false);
    const [value, setValue] = useState("");
    const [error, setError] = useState(false);

    function handleSubmit(e) {
        e.preventDefault();
        if (value.trim().length < 5) {
            setError(true);
            return;
        }
        setError(false);
        setTimeout(() => setSubmitted(true), 1500);
    }

    return (
        <section className="section-padding min-h-screen flex items-center justify-center">
            <div className="w-full max-w-[440px] mx-auto">
                <div className="bg-surface-container-lowest border border-surface-border rounded-2xl shadow-xl p-8 md:p-10 relative overflow-hidden">

                    {/* Decorative element */}
                    <div className="absolute -top-12 -right-12 w-24 h-24 bg-primary/10 rounded-full blur-2xl"></div>

                    {/* Icon + Heading */}
                    <div className="relative z-10 flex flex-col items-center text-center mb-8">
                        <div className="w-16 h-16 bg-surface-container flex items-center justify-center rounded-full mb-6">
                            <span className="material-symbols-outlined text-primary text-4xl">lock_reset</span>
                        </div>
                        <h1 className="text-3xl font-black mb-3" style={{ color: "var(--color-on-surface)" }}>
                            Forgot Password?
                        </h1>
                        <p style={{ color: "var(--color-on-surface-variant)" }}>
                            No worries! Enter your registered email or phone number and we'll send you a reset link.
                        </p>
                    </div>

                    {/* Form */}
                    {!submitted ? (
                        <form className="space-y-5" onSubmit={handleSubmit}>
                            <div>
                                <label className="block text-sm font-semibold mb-1" style={{ color: "var(--color-on-surface-variant)" }}>
                                    Email or Phone Number
                                </label>
                                <div className="relative">
                                    <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant/60 text-xl">mail</span>
                                    <input
                                        type="text"
                                        value={value}
                                        onChange={(e) => { setValue(e.target.value); setError(false); }}
                                        placeholder="name@example.com"
                                        className="w-full pl-12 pr-4 py-4 bg-surface border border-surface-border rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                                    />
                                </div>
                                {error && (
                                    <p className="text-xs text-error mt-1">Please enter a valid email or phone number.</p>
                                )}
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-primary text-on-primary font-bold py-4 rounded-xl hover:brightness-110 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
                            >
                                Send Reset Link
                                <span className="material-symbols-outlined text-xl">arrow_forward</span>
                            </button>
                        </form>
                    ) : (
                        <div className="text-center py-4">
                            <div className="bg-success/10 text-success p-4 rounded-xl flex flex-col items-center gap-2">
                                <span className="material-symbols-outlined text-3xl">check_circle</span>
                                <p className="font-semibold">Check your inbox! If an account exists, you'll receive a link shortly.</p>
                            </div>
                        </div>
                    )}

                    {/* Back link */}
                    <div className="mt-8 pt-8 border-t border-surface-border text-center">
                        <Link href="/login" className="inline-flex items-center gap-2 text-primary font-semibold hover:underline">
                            <span className="material-symbols-outlined text-sm">arrow_back</span>
                            Back to Sign In
                        </Link>
                    </div>
                </div>

                <p className="mt-6 text-center text-xs uppercase tracking-widest" style={{ color: "var(--color-on-surface-variant)" }}>
                    Protected by TN Connect Security Systems
                </p>
            </div>
        </section>
    );
}