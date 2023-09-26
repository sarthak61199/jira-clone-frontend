import Navbar from "@/components/navbar";
import "./globals.css";
import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import Footer from "@/components/footer";
import { ModalProvider } from "@/components/providers/modal-provider";
import AuthProvider from "@/components/providers/AuthProvider";
import { Toaster } from "react-hot-toast";

const poppins = Poppins({ subsets: ["latin"], weight: ["300", "500", "700"] });

export const metadata: Metadata = {
  title: "Jira",
  description: "Jira clone",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className={poppins.className}>
        <div className="container min-h-screen">
          <AuthProvider>
            <Toaster position="top-right" />
            <ModalProvider />
            <Navbar />
            {children}
            <Footer />
          </AuthProvider>
        </div>
      </body>
    </html>
  );
}
