import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

export const metadata = {
  title: "SI Learn Hub",
  description: "All in one platform for learning materials prodi sistem informasi",
};

import SessionClientProvider from "@/components/SessionClientProvider";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function RootLayout({ children }) {
  return (
    <html>
      <body className="bg-background font-sans antialiased min-h-screen flex flex-col">
        <SessionClientProvider>
          <Navbar />
          <main className="flex-grow">{children}</main>
          <Footer />
          <Toaster />
        </SessionClientProvider>
      </body>
    </html>
  );
}
