import type { Metadata } from "next";
import "../globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import Sidebar from "@/components/admin/Sidebar";

export const metadata: Metadata = {
  title: "Admin | Foodily",
  description: "This is a food website. Here you can order food and The interesting part is it is Home Made Food. So order the Food and Enjoy alot.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
    <html lang="en">
      <body>
      <Sidebar />
        {children}
      </body>
    </html>
    </ClerkProvider>
  );
}
