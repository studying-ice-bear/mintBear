import "@/styles/globals.css";
import { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { fontSans } from "@/config/fonts";
import { Providers } from "../providers";
import { Navbar } from "@/components/common/Navbar";
import clsx from "clsx";
import { LANGUAGE_OPTIONS, i18n } from "../../i18n-config";
import SessionWrapper from "@/components/SessionWrapper";
import { Toaster } from "react-hot-toast";
import { getServerSession } from "next-auth/next";
import { CustomSession, getUserServerSession } from "@/api/serverApi";

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

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lng: locale }));
}

export default async function RootLayout({
  children,
  params: { lng },
}: {
  children: React.ReactNode;
  params: {
    lng: keyof typeof LANGUAGE_OPTIONS;
  };
}) {
  const session = (await getUserServerSession()) as CustomSession;
  return (
    <SessionWrapper>
      <html lang={lng} suppressHydrationWarning>
        <head />
        <body
          className={clsx(
            "min-h-screen bg-background font-sans antialiased",
            fontSans.variable
          )}
        >
          <Providers themeProps={{ attribute: "class", defaultTheme: "dark" }}>
            <div className="relative flex flex-col h-screen">
              <Navbar lng={lng} session={session} />
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
