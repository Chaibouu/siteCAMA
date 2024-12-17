import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import appConfig from "@/settings";
import { Toaster } from "@/components/ui/sonner";
import { SessionProvider } from "@/context/SessionContext";
import { getUser } from "@/actions/getUser";
import ReactQueryProvider from "./ReactQueryProvider";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: appConfig.websiteTitle,
  description: appConfig.websiteDescription,
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const {user} = await getUser();
  return (
    <SessionProvider user={user?.user}>
      <html lang="en">
        <ReactQueryProvider>
          <Toaster position="top-right"/>
          <body className={inter.className}>{children}</body>
        </ReactQueryProvider>
      </html>
   </SessionProvider>
  );
}
