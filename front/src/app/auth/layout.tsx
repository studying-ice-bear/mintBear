import "@/styles/globals.css";
import SessionWrapper from "@/components/SessionWrapper";
import { fontSans } from "@/config/fonts";
import { Providers } from "../providers";
import clsx from "clsx";
import { siteConfig } from "@/config/site";
import { Metadata } from "next";
import { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SessionWrapper>
      <html suppressHydrationWarning>
        <head />
        <body
          className={clsx(
            "min-h-screen bg-background font-sans antialiased",
            fontSans.variable
          )}
        >
          <Providers themeProps={{ attribute: "class", defaultTheme: "dark" }}>
            <div className="relative flex flex-col h-screen">
              <main className="container mx-auto max-w-7xl px-6 flex-grow flex items-center justify-center">
                {children}
              </main>
            </div>
          </Providers>
        </body>
      </html>
    </SessionWrapper>
  );
}
