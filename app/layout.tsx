import type { Metadata, Viewport } from "next";
import { DM_Serif_Display, Inter} from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover', // iOS safe area support
  themeColor: '#22c55e',
};

export const metadata: Metadata = {
  title: "Nnukwuegbema - Family Tree Builder",
  description: "We are preserving our families' stories, one branch at a time.",
};

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

const dmSerifDisplay = DM_Serif_Display({
  weight: '400',
  style: ['normal', 'italic'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-display',
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${dmSerifDisplay.variable}`}
    >
      <body className={`${inter.className} antialiased`}>
        <Toaster position="top-right" richColors />
        {children}
      </body>
    </html>
  );
}