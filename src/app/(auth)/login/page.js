import Link from "next/link";

export const metadata = {
  title: "Login — TN CONNECT",
  description: "Log in to your TN CONNECT account.",
};

export default function LoginPage() {
  return (
    <section className="section-padding">
      <div className="container-content max-w-md mx-auto text-center">
        <h1
          className="text-4xl font-black mb-4"
          style={{ fontFamily: "var(--font-display)", color: "var(--color-on-surface)" }}
        >
          Welcome Back
        </h1>
        <p
          className="text-lg mb-8"
          style={{ fontFamily: "var(--font-sans)", color: "var(--color-on-surface-variant)" }}
        >
          Login form is coming soon. Don&apos;t have an account?{" "}
          <Link href="/registration" style={{ color: "var(--color-primary)", fontWeight: 600 }}>
            Register free
          </Link>
        </p>
        <Link href="/" className="btn-secondary">
          ← Back to Home
        </Link>
      </div>
    </section>
  );
}
