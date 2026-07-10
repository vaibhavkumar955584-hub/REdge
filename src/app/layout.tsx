import "./globals.css";
import { TopNavBar } from "components/TopNavBar";
import { Analytics } from "@vercel/analytics/react";
import { AuthProvider } from "components/AuthProvider";
import { Footer } from "components/Footer";

export const metadata = {
  title: "REdge - Professional Resume Builder and Parser",
  description:
    "REdge is a powerful and intuitive resume builder that allows anyone to create a modern professional resume in 3 simple steps. For those who have an existing resume, REdge also provides a resume parser to help test and confirm its ATS readability.",
  icons: {
    icon: [
      { url: "/brand/favicon.svg", type: "image/svg+xml" },
    ],
    apple: [
      { url: "/brand/icon.svg", type: "image/svg+xml" },
    ],
  },
  manifest: "/manifest.json",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <TopNavBar />
          {children}
          <Footer />
          <Analytics />
        </AuthProvider>
      </body>
    </html>
  );
}
