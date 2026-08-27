import type { Metadata } from "next";
import { Fraunces, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { MobileBottomNav } from "@/components/layout/MobileBottomNav";
import { siteConfig } from "@/data/site";
import { getContentBlocks, block } from "@/data/content";

const fraunces = Fraunces({
  subsets: ["latin", "latin-ext"],
  variable: "--font-display",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin", "latin-ext"],
  variable: "--font-sans",
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

export async function generateMetadata(): Promise<Metadata> {
  const blocks = await getContentBlocks();
  const tagline = block(blocks, "site.tagline", siteConfig.tagline);
  const description = block(blocks, "site.description", siteConfig.description);

  return {
    metadataBase: new URL(siteConfig.url),
    title: {
      default: `${siteConfig.name} — ${tagline}`,
      template: `%s | ${siteConfig.name}`,
    },
    description,
    keywords: [
      "macska örökbefogadás Székesfehérvár",
      "cica örökbefogadás Székesfehérvár",
      "macskamentés Székesfehérvár",
      "cicamentés Fehérvár",
      "gazdát kereső cica",
      "ideiglenes befogadó cica",
      "macska örökbefogadás",
    ],
    openGraph: {
      type: "website",
      locale: "hu_HU",
      url: siteConfig.url,
      siteName: siteConfig.name,
      title: `${siteConfig.name} — ${tagline}`,
      description,
    },
    twitter: {
      card: "summary_large_image",
      title: `${siteConfig.name} — ${tagline}`,
      description,
    },
    alternates: {
      canonical: "/",
    },
  };
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const blocks = await getContentBlocks();

  return (
    <html lang="hu" className={`${fraunces.variable} ${jakarta.variable}`}>
      <body className="flex min-h-screen flex-col bg-cream-200 font-sans text-ink-900 antialiased">
        <a
          href="#fotartalom"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-marmalade-500 focus:px-4 focus:py-2 focus:text-white"
        >
          Ugrás a tartalomra
        </a>
        <Header operatingArea={block(blocks, "site.operating_area", siteConfig.operatingArea)} />
        <main id="fotartalom" className="flex-1 pb-16 lg:pb-0">
          {children}
        </main>
        <Footer blocks={blocks} />
        <MobileBottomNav />
      </body>
    </html>
  );
}
