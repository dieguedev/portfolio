import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import Menu from "@/components/Menu";
import ClickSpark from "@/components/ui/ClickSpark";
import "./globals.css";

const montserrat = localFont({
  src: "../fonts/montserrat-latin-wght-normal.woff2",
  weight: "100 900",
  variable: "--font-montserrat",
  display: "swap",
});

const cormorant = localFont({
  src: "../fonts/cormorant-garamond-latin-600-italic.woff2",
  weight: "600",
  style: "italic",
  variable: "--font-cormorant",
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
};

const title = "Diegue | Desarrollador web React en Pamplona";
const description =
  "Desarrollador frontend en Pamplona especializado en React y TypeScript. Webs rápidas, accesibles y con buena UX.";

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    title,
    description,
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es" className={`${montserrat.variable} ${cormorant.variable}`}>
      <body>
        <Menu />
        <main className="min-h-dvh bg-black text-white">{children}</main>
        <ClickSpark
          sparkColor="#fff"
          sparkSize={10}
          sparkRadius={18}
          sparkCount={8}
          duration={420}
        />
      </body>
    </html>
  );
}
