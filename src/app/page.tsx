import { Hero } from "@/components/home/Hero";
import { FeaturedCats } from "@/components/home/FeaturedCats";
import { HelpWaysSection } from "@/components/home/HelpWaysSection";
import { StoryHighlight } from "@/components/home/StoryHighlight";
import { WhyWeNeed } from "@/components/home/WhyWeNeed";
import { AdoptionSteps } from "@/components/home/AdoptionSteps";
import { siteConfig } from "@/data/site";
import { getContentBlocks, block } from "@/data/content";

export const revalidate = 60;

export default async function HomePage() {
  const blocks = await getContentBlocks();
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "NGO",
    name: siteConfig.name,
    url: siteConfig.url,
    description: block(blocks, "site.description", siteConfig.description),
    areaServed: block(blocks, "site.operating_area", siteConfig.operatingArea),
    sameAs: [block(blocks, "site.facebook_url", siteConfig.facebookUrl)],
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
