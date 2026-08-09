export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export function formatHuf(amount: number) {
  return new Intl.NumberFormat("hu-HU").format(amount) + " Ft";
}

export function formatDate(iso: string) {
  return new Intl.DateTimeFormat("hu-HU", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(iso));
}
