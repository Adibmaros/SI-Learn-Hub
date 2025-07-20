import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

export const metadata = {
  title: "SI Learn Hub",
  description: "All in one platform for learning materials prodi sistem informasi",
};

import SessionClientProvider from "@/components/SessionClientProvider";
import Navbar from "@/components/layout/Navbar";

export default function RootLayout({ children }) {
  return (
    <html>
      <body className="bg-background font-sans antialiased">
        <SessionClientProvider>
          <Navbar />
          <main>{children}</main>
          <Toaster />
        </SessionClientProvider>
      </body>
    </html>
  );
}
