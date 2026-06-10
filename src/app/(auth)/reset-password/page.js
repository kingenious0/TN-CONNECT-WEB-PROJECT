"use client";
import Link from "next/link";
import { useState } from "react";

export default function ResetPasswordPage() {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [password, setPassword] = useState("");
    const [confirm, setConfirm] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);

    function handleSubmit(e) {
        e.preventDefault();
        if (password.length < 8) {
            setError("Password must be at least 8 characters.");
            return;
        }
        if (password !== confirm) {
            setError("Passwords do not match.");
            return;
        }
        setError("");
        setTimeout(() => setSuccess(true), 1500);
    }

    return (
        <section className="section-padding min-h-screen flex items-center justify-center">
            <div className="w-full max-w-[440px] mx-auto">
                <div className="bg-surface-container-lowest border border-surface-border rounded-2xl shadow-xl p-8 md:p-10 relative overflow-hidden">

                    <div className="absolute -top-12 -right-12 w-24 h-24 bg-primary/10 rounded-full blur-2xl"></div>

                    {/* Icon + Heading */}
                    <div className="relative z-10 flex flex-col items-center text-center mb-8">
                        <div className="w-16 h-16 bg-surface-container flex items-center justify-center rounded-full mb-6">
                            <span className="material-symbols-outlined text-primary text-4xl">lock</span>
                        </div>
                        <h1 className="text-3xl font-black mb-3" style={{ color: "var(--color-on-surface)" }}>
                            Reset Password
                        </h1>
                        <p style={{ color: "var(--color-on-surface-variant)" }}>
                            Create a new secure password for your TN CONNECT account.
                        </p>
                    </div>

                    {!success ? (
                        <form className="space-y-5" onSubmit={handleSubmit}>
                            {/* New Password */}
                            <div>
                                <label className="block text-sm font-semibold mb-1" style={{ color: "var(--color-on-surface-variant)" }}>
                                    New Password
                                </label>
                                <div className="relative">
                                    <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant/60 text-xl">lock</span>
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="••••••••"
                                        className="w-full pl-12 pr-12 py-4 bg-surface border border-surface-border rounded-xl focus:ring-2 focus:ring-primary outline-none transition-all"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 text-on-surface-variant"
                                    >
                                        <span className="material-symbols-outlined text-xl">
                                            {showPassword ? "visibility_off" : "visibility"}
                                        </span>
                                    </button>
                                </div>
                            </div>

                            {/* Confirm Password */}
                            <div>
                                <label className="block text-sm font-semibold mb-1" style={{ color: "var(--color-on-surface-variant)" }}>
                                    Confirm Password
                                </label>
                                <div className="relative">
                                    <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant/60 text-xl">lock</span>
                                    <input
                                        type={showConfirm ? "text" : "password"}
                                        value={confirm}
                                        onChange={(e) => setConfirm(e.target.value)}
                                        placeholder="••••••••"
                                        className="w-full pl-12 pr-12 py-4 bg-surface border border-surface-border rounded-xl focus:ring-2 focus:ring-primary outline-none transition-all"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowConfirm(!showConfirm)}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 text-on-surface-variant"
                                    >
                                        <span className="material-symbols-outlined text-xl">
                                            {showConfirm ? "visibility_off" : "visibility"}
                                        </span>
                                    </button>
                                </div>
                            </div>

                            {error && <p className="text-xs text-error">{error}</p>}

                            <button
                                type="submit"
                                className="w-full bg-primary text-on-primary font-bold py-4 rounded-xl hover:brightness-110 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
                            >
                                Reset Password
                                <span className="material-symbols-outlined text-xl">arrow_forward</span>
                            </button>
                        </form>
                    ) : (
                        <div className="text-center py-4">
                            <div className="bg-success/10 text-success p-4 rounded-xl flex flex-col items-center gap-2">
                                <span className="material-symbols-outlined text-3xl">check_circle</span>
                                <p className="font-semibold">Password reset successful!</p>
                            </div>
                            <Link href="/login" className="mt-6 inline-block text-primary font-bold hover:underline">
                                Go to Sign In →
                            </Link>
                        </div>
                    )}

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