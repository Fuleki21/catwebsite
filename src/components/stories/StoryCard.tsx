import Link from "next/link";
import { RescueStory } from "@/data/types";
import { PlaceholderImage } from "@/components/ui/PlaceholderImage";
import { Badge } from "@/components/ui/Badge";
import { formatDate } from "@/lib/utils";
import { IconArrowRight } from "@/components/ui/Icons";

const stageLabels: Record<RescueStory["stage"], string> = {
  utcarol: "Az utcáról",
  mentes: "Mentés",
  gyogyulas: "Gyógyulás",
  uj_otthon: "Új otthon",
};

export function StoryCard({ story }: { story: RescueStory }) {
  return (
    <Link
      href={`/mentesek/${story.slug}`}
      className="focus-ring group flex flex-col overflow-hidden rounded-xl2 bg-white shadow-card transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lift"
    >
      <div className="overflow-hidden">
        <div className="transition-transform duration-500 group-hover:scale-105">
          <PlaceholderImage seed={story.slug} aspect="aspect-[16/10]" label={story.title} />
        </div>
      </div>
      <div className="flex flex-1 flex-col gap-3 p-6">
        <div className="flex items-center gap-2">
          <Badge tone="sage">{stageLabels[story.stage]}</Badge>
          <span className="text-xs text-ink-300">{formatDate(story.date)}</span>
        </div>
        <h3 className="font-display text-lg font-semibold text-ink-900">{story.title}</h3>
        <p className="line-clamp-3 text-sm leading-relaxed text-ink-500">{story.excerpt}</p>
        <span className="mt-auto inline-flex items-center gap-1.5 pt-2 text-sm font-semibold text-marmalade-600">
          Tovább olvasom
          <IconArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </span>
      </div>
    </Link>
  );
}
