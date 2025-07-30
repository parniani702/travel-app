import type { Metadata } from "next";
import { vazirMatn } from "next-persian-fonts/vazirmatn";
import "./globals.css";
import { auth } from "@/auth";
import Navbar from "@/components/Navbar";
import { Toaster } from "react-hot-toast";


export const metadata: Metadata = {
  title: "Travel Planner",
  description: "",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  return (
      <html lang="fa" dir="rtl">
        <body className={`${vazirMatn.className}  antialiased`}>
          <Toaster position="top-left" />
          <Navbar session={session} />
          {children}
        </body>
      </html>
  );
}
