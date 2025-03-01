import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Thrifnity",
  description: "Platform terbaik untuk fashion second-hand",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className=" text-black font-inter">
        <main>
          {children}
        </main>
      </body>
    </html>
  );
}
