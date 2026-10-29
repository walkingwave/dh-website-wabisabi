import type { Metadata, Viewport } from "next";
import "@fontsource/cormorant-garamond/400.css";
import "@fontsource/cormorant-garamond/500.css";
import "@fontsource/cormorant-garamond/600.css";
import "@fontsource/cormorant-garamond/500-italic.css";
import "@fontsource/instrument-sans/400.css";
import "@fontsource/instrument-sans/500.css";
import "@fontsource/zhi-mang-xing/400.css";
import "./globals.css";
import { SiteProvider } from "@/components/SiteProvider";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { InkDefs } from "@/components/InkDefs";

export const metadata: Metadata = {
  title: { default: "Dylan Ho", template: "%s · Dylan Ho" },
  description: "Co-founder of Portfo. Computer engineering at the University of Toronto.",
};

export const viewport: Viewport = { themeColor: "#8b8459" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <InkDefs />
        <SiteProvider>
          <Nav />
          <main className="min-h-[70vh]">{children}</main>
          <Footer />
        </SiteProvider>
      </body>
    </html>
  );
}
