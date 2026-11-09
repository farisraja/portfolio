import { ThemeProvider } from "@/components/theme-provider";
import { TooltipProvider } from "@/components/ui/tooltip";
import { TopographicBackground } from "@/components/ui/topographic-background";
import { DATA } from "@/data/resume";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import { Bebas_Neue, Geist, Geist_Mono } from "next/font/google";
import "@/app/globals.css";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-sans",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

const bebasNeue = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bebas",
});

import { getPortfolioData } from "@/lib/payload-data";

export async function generateMetadata(): Promise<Metadata> {
  const data = await getPortfolioData();
  const siteUrl = data.siteSettings.url || DATA.url;
  const owner = data.siteSettings.ownerName || data.siteSettings.name || "Faris Raja Ardana";
  const title = `${owner} — ${data.siteSettings.title || "Web & Software Developer"}`;
  const description =
    data.siteSettings.description ||
    "Portofolio Faris Raja Ardana, Web & Software Developer lulusan Ilmu Komputer Universitas Pakuan dengan fokus pada pengembangan web dan aplikasi.";

  return {
    metadataBase: new URL(siteUrl),
    title: {
      default: title,
      template: `%s | ${title}`,
    },
    description,
    openGraph: {
      title,
      description,
      url: siteUrl,
      siteName: owner,
      locale: "id_ID",
      type: "website",
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    twitter: {
      title,
      description,
      card: "summary_large_image",
    },
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased relative",
          geist.variable,
          geistMono.variable,
          bebasNeue.variable
        )}
      >
        <ThemeProvider attribute="class" defaultTheme="light">
          <TooltipProvider delayDuration={0}>
            <TopographicBackground />
            {children}
          </TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
