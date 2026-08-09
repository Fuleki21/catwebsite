import { Section, Eyebrow } from "@/components/ui/Container";
import { testimonials } from "@/data/site";
import { PlaceholderBadge } from "@/components/ui/Badge";
import { IconFacebook } from "@/components/ui/Icons";

export function Testimonials() {
  return (
    <Section tone="cream">
      <Eyebrow>Amit rólunk mondanak</Eyebrow>
      <h2 className="font-display text-3xl font-semibold text-ink-900 sm:text-4xl">Gazdik és önkéntesek visszajelzései</h2>
      <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-3">
        {testimonials.map((testimonial) => (
          <div key={testimonial.name + testimonial.context} className="flex flex-col gap-4 rounded-xl2 bg-white p-6 shadow-card">
            {testimonial.isPlaceholder && <PlaceholderBadge className="self-start" />}
            <p className="text-sm italic leading-relaxed text-ink-600">&bdquo;{testimonial.quote}&rdquo;</p>
            <div className="mt-auto">
              <p className="text-sm font-semibold text-ink-900">{testimonial.name}</p>
              <p className="text-xs text-ink-400">{testimonial.context}</p>
            </div>
          </div>
        ))}
      </div>
      <a
        href="#"
        className="focus-ring mt-8 flex items-center gap-3 rounded-xl2 border border-dashed border-ink-200 bg-white/60 p-5 text-sm text-ink-500 transition-colors hover:border-marmalade-300"
      >
        <IconFacebook className="h-6 w-6 text-marmalade-500" />
        Itt a helye a beágyazott közösségimédia-hírfolyamnak (pl. Facebook oldal legutóbbi posztjai).
      </a>
    </Section>
  );
}
