import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  metadataBase: new URL("https://museum-of-art-seven.vercel.app"),
  alternates: {
    canonical: "/",
  },
  title: "Metropolitan Museum Art, rechercher toutes les oeuvres d'art du monde entier",
  description: "retrouver toutes les oeuvres d'arts répertoriée au Metropolitan museum art",
  verification: {
    google: "nwVPqsKRGvHVh9v-Qn4QoawQzNbN99Sfg6usOSlUEhg",
  },
  viewport: "width=device-width, initial-scale=1",
  robots: "index, follow",
  openGraph: {
    title: "Metropolitan Museum Art",
    description: "retrouver toutes les oeuvres d'arts répertoriée au Metropolitan museum art",
    type: "website",
    url: "https://museum-of-art-seven.vercel.app/",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <head>
        <link rel="canonical" href="https://museum-of-art-seven.vercel.app/" />
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=votre-id-google-analytics"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'votre-id-google-analytics');
            `,
          }}
        />
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2999125530144516"
          crossOrigin="anonymous"
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
