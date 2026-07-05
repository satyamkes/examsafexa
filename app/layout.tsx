import type { Metadata } from "next";
import { Fraunces, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  weight: ["500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "ExamSafexa — Never Travel Alone for an Exam",
  description:
    "Find your exam center, connect with your exam-day community, and stay safe on the way — an independent student companion platform for NEET, JEE, UPSC, SSC and more.",
  metadataBase: new URL("https://examsafexa.example.com"),
  openGraph: {
    title: "ExamSafexa — Never Travel Alone for an Exam",
    description:
      "Find your exam center, connect with your exam-day community, and stay safe on the way.",
    url: "https://examsafexa.example.com",
    siteName: "ExamSafexa",
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ExamSafexa — Never Travel Alone for an Exam",
    description:
      "Find your exam center, connect with your exam-day community, and stay safe on the way.",
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${fraunces.variable} ${jakarta.variable}`}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
