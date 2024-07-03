import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "reverse-app",
  description: "reverse-app",
};

export default function RootLayout({ children }: { children: React.ReactNode }): JSX.Element {
  return (
    <html lang="en">
      <body className={cn(inter.className, "dark p-2 xl:p-3 min-h-dvh flex flex-col")}>
        <main className="grow flex flex-col lg:flex-row gap-6">{children}</main>
      </body>
    </html>
  );
}
