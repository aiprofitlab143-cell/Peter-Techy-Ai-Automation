import type { Metadata } from "next";
import "./globals.css";
import "bootstrap/dist/css/bootstrap.min.css";

export const metadata: Metadata = {
  title: "Peter Techy Automation | AI Automation Expert",
  description: "Custom AI workflows, lead generation systems, and intelligent automations built for modern businesses. Scale your business while you sleep.",
  keywords: ["AI Automation", "Lead Generation", "Chatbots", "Workflow Automation", "CRM Automation", "Business Automation"],
  authors: [{ name: "Peter Techy" }],
  openGraph: {
    title: "Peter Techy Automation | AI Automation Expert",
    description: "Custom AI workflows, lead generation systems, and intelligent automations built for modern businesses.",
    type: "website",
    locale: "en_US",
    siteName: "Peter Techy Automation",
  },
  twitter: {
    card: "summary_large_image",
    title: "Peter Techy Automation | AI Automation Expert",
    description: "Custom AI workflows, lead generation systems, and intelligent automations built for modern businesses.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}

