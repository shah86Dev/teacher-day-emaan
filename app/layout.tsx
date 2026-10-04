import type { Metadata } from "next";
import "./globals.css";
import { SoundProvider } from "./components/SoundProvider";
import SoundToggle from "./components/SoundToggle";
import ProgressNav from "./components/ProgressNav";
import PageTransition from "./components/PageTransition";

export const metadata: Metadata = {
  title: "Happy Teacher's Day, Ma’am Mahnoor Shakeel | Class 1-B",
  description: "A special animated Teacher's Day greeting from Imaan Fatima."
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <SoundProvider>
          <ProgressNav />
          <SoundToggle />
          <PageTransition>{children}</PageTransition>
        </SoundProvider>
      </body>
    </html>
  );
}
