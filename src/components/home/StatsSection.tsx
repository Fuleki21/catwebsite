import { stats } from "@/data/site";
import { PlaceholderBadge } from "@/components/ui/Badge";
import { Container } from "@/components/ui/Container";

export function StatsSection() {
  return (
    <div className="bg-white py-12">
      <Container>
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="flex flex-col items-center gap-1 text-center">
              {stat.isPlaceholder && <PlaceholderBadge className="mb-1" />}
              <p className="font-display text-3xl font-semibold text-marmalade-600 sm:text-4xl">{stat.value}</p>
              <p className="text-sm text-ink-500">{stat.label}</p>
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}
