import "~/styles/globals.css";

import { Inter, IBM_Plex_Sans } from "next/font/google";

import { TRPCReactProvider } from "~/trpc/react";
import { Navbar } from "~/app/_components/header";
import { ClerkProvider } from "@clerk/nextjs";
import Controller from "~/lib/controller";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

const ibmPlexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  variable: "--font-heading",
  weight: ["100", "200", "300", "400", "500", "600", "700"],
});

export const metadata = {
  title: "Decyde",
  description: "Generated by create-t3-app",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <TRPCReactProvider>
        <Controller>
          <html lang="en" className={ibmPlexSans.className}>
            <body className={`${ibmPlexSans.variable}`}>
              <Navbar />
              {children}
            </body>
          </html>
        </Controller>
      </TRPCReactProvider>
    </ClerkProvider>
  );
}
