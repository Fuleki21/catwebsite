import { IconCheck, IconX } from "@/components/ui/Icons";

export function FormSuccess({ title, description }: { title: string; description: string }) {
  return (
    <div className="animate-scale-in flex flex-col items-center gap-3 rounded-xl2 border border-sage-200 bg-sage-50 px-6 py-10 text-center">
      <span className="flex h-12 w-12 items-center justify-center rounded-full bg-sage-500 text-white">
        <IconCheck className="h-6 w-6" />
      </span>
      <h3 className="font-display text-xl font-semibold text-sage-800">{title}</h3>
      <p className="max-w-md text-sm text-sage-700">{description}</p>
    </div>
  );
}

export function FormError({ message }: { message: string }) {
  return (
    <div className="flex items-start gap-3 rounded-xl border border-blush-300 bg-blush-50 px-4 py-3 text-sm text-blush-500" role="alert">
      <IconX className="mt-0.5 h-4 w-4 shrink-0" />
      <p>{message}</p>
    </div>
  );
}
