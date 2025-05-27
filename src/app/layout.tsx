// import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import Provider from "@/providers/Providers";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// export const metadata: Metadata = {
//   title: "FilmNest",
//   description: "FilmNest is a movie and series rating portal",
//    icons: {
//     icon: "/favicon.png",
//   },
//   verification: {
//     google: "Zjwd1ST-ejKrhNWHAcAVcNzlTuPmZmmVPbnlm4KAZe4",
//   },
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Google verification meta tag */}
        <meta
          name="google-site-verification"
          content="Zjwd1ST-ejKrhNWHAcAVcNzlTuPmZmmVPbnlm4KAZe4"
        />
        <title>FilmNest</title>
        <meta name="description" content="FilmNest is a movie and series rating portal" />
        <link rel="icon" href="/favicon.png" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Provider>
          <Toaster position="top-center" richColors />
          {children}
        </Provider>
      </body>
    </html>
  );
}
