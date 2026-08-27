import { Hero } from "@/components/home/Hero";
import { FeaturedCats } from "@/components/home/FeaturedCats";
import { HelpWaysSection } from "@/components/home/HelpWaysSection";
import { StoryHighlight } from "@/components/home/StoryHighlight";
import { WhyWeNeed } from "@/components/home/WhyWeNeed";
import { AdoptionSteps } from "@/components/home/AdoptionSteps";
import { siteConfig } from "@/data/site";

export const revalidate = 60;

export default function HomePage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "NGO",
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.description,
    areaServed: siteConfig.operatingArea,
    sameAs: [siteConfig.facebookUrl, siteConfig.instagramUrl],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Hero />
      <FeaturedCats />
      <HelpWaysSection />
      <StoryHighlight />
      <WhyWeNeed />
      <AdoptionSteps />
    </>
  );
}
