import Link from "next/link";

export const metadata = {
    title: "Registration Success – TN CONNECT",
    description: "You have successfully registered on TN CONNECT.",
};

export default function SuccessPage() {
    return (
        <section className="section-padding min-h-screen flex items-center justify-center">
            <div className="w-full max-w-2xl mx-auto">

                {/* Progress */}
                <div className="mb-8 px-4">
                    <div className="flex justify-between items-end mb-2">
                        <span className="text-sm font-semibold" style={{ color: "var(--color-on-surface-variant)" }}>
                            Registration Progress
                        </span>
                        <span className="text-sm font-bold text-primary">Step 3 of 3</span>
                    </div>
                    <div className="h-2 w-full bg-surface-container-highest rounded-full overflow-hidden">
                        <div className="h-full bg-primary w-full transition-all duration-1000"></div>
                    </div>
                </div>

                {/* Card */}
                <div className="bg-surface-container-lowest border border-surface-border rounded-2xl shadow-xl p-10 text-center">

                    {/* Success Icon */}
                    <div className="mb-6 inline-flex items-center justify-center w-20 h-20 rounded-full bg-success/10 text-success">
                        <span className="material-symbols-outlined text-5xl">check_circle</span>
                    </div>

                    <h1 className="text-4xl font-black mb-4" style={{ color: "var(--color-on-surface)" }}>
                        Welcome to the Community!
                    </h1>
                    <p className="text-lg mb-8 max-w-lg mx-auto" style={{ color: "var(--color-on-surface-variant)" }}>
                        Your account has been successfully verified. You now have full access to our global portal and collaboration tools.
                    </p>

                    {/* Status Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8 text-left">
                        <div className="p-4 rounded-xl bg-surface-container-low border border-surface-border flex items-center gap-4">
                            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                                <span className="material-symbols-outlined">verified_user</span>
                            </div>
                            <div>
                                <p className="text-xs font-semibold" style={{ color: "var(--color-on-surface-variant)" }}>Account Status</p>
                                <p className="font-black" style={{ color: "var(--color-on-surface)" }}>Verified</p>
                            </div>
                        </div>
                        <div className="p-4 rounded-xl bg-surface-container-low border border-surface-border flex items-center gap-4">
                            <div className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center text-secondary">
                                <span className="material-symbols-outlined">mail</span>
                            </div>
                            <div>
                                <p className="text-xs font-semibold" style={{ color: "var(--color-on-surface-variant)" }}>Member ID</p>
                                <p className="font-black" style={{ color: "var(--color-on-surface)" }}>TN-2024-8842</p>
                            </div>
                        </div>
                    </div>

                    {/* CTA Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link
                            href="/"
                            className="px-8 py-4 bg-primary text-on-primary rounded-xl font-bold shadow-lg hover:-translate-y-0.5 hover:shadow-xl transition-all"
                        >
                            Go to Dashboard
                        </Link>
                        <button className="px-8 py-4 border-2 border-primary text-primary rounded-xl font-bold hover:bg-primary/5 transition-all">
                            Complete Profile
                        </button>
                    </div>
                </div>

                {/* Community Banner */}
                <div className="mt-8 flex flex-col md:flex-row items-center gap-6 bg-surface-container-low/50 p-6 rounded-xl border border-dashed border-outline-variant">
                    <div className="text-center md:text-left">
                        <h3 className="text-xl font-black mb-1" style={{ color: "var(--color-on-surface)" }}>
                            Start your journey today
                        </h3>
                        <p style={{ color: "var(--color-on-surface-variant)" }}>
                            Join over 15,000 members already accelerating their careers through TN CONNECT.
                        </p>
                    </div>
                </div>

            </div>
        </section>
    );
}