import "./globals.css";

export const metadata = {
  title: "TN CONNECT — TN Universities Connect",
  description:
    "The official digital hub connecting TN university students, alumni, and institutions for networking, opportunities, and collaboration.",
  keywords: "TN universities, TN CONNECT, student network, alumni, higher education",
  icons: {
    icon: "/logo.jpg",
    apple: "/logo.jpg",
  },
  openGraph: {
    title: "TN CONNECT — TN Universities Connect",
    description:
      "Connecting university students, alumni, and institutions.",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full scroll-smooth">
      <head>
        {/* Google Fonts: Public Sans + Chivo */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Public+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&family=Chivo:wght@600;700;800;900&display=swap"
          rel="stylesheet"
        />
        {/* Material Symbols Outlined */}
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full flex flex-col antialiased">
        {children}
      </body>
    </html>
  );
}
