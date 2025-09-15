import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PageTransition } from "@/components/PageTransition";
import { LanguageProvider } from "@/components/LanguageProvider";
import { Preloader } from "@/components/Preloader";
import { AuthProvider } from "@/components/AuthProvider";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Mr. Handy",
  description: "House Maintenance, One Click Away",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} antialiased`}>
        <Preloader />
        <AuthProvider>
          <LanguageProvider>
            <Header />
            <PageTransition>
              <main className="mx-auto w-full px-3 sm:px-4 md:px-6 lg:px-8 xl:px-10 max-w-[1280px]">
                {children}
              </main>
            </PageTransition>
            <Footer />
          </LanguageProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
