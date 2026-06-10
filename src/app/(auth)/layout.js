export default function AuthLayout({ children }) {
  return (
    <div className="min-h-screen flex flex-col justify-center bg-surface-container-lowest">
      <main className="flex-1 flex flex-col justify-center">{children}</main>
    </div>
  );
}
