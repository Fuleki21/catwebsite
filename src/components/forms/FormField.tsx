import { InputHTMLAttributes, LabelHTMLAttributes, ReactNode, SelectHTMLAttributes, TextareaHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

const fieldBase =
  "focus-ring w-full rounded-xl border border-ink-100 bg-white px-4 py-3 text-sm text-ink-900 placeholder:text-ink-300 transition-colors hover:border-marmalade-300";

export function Field({
  label,
  htmlFor,
  required,
  error,
  hint,
  children,
}: {
  label: string;
  htmlFor: string;
  required?: boolean;
  error?: string;
  hint?: string;
  children: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={htmlFor} className="text-sm font-semibold text-ink-800">
        {label}
        {required && <span className="ml-1 text-marmalade-500">*</span>}
      </label>
      {children}
      {hint && !error && <p className="text-xs text-ink-300">{hint}</p>}
      {error && (
        <p className="text-xs font-medium text-blush-500" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

export function TextInput({ className, error, ...props }: InputHTMLAttributes<HTMLInputElement> & { error?: string }) {
  return (
    <input
      className={cn(fieldBase, error && "border-blush-300 focus-visible:ring-blush-300", className)}
      {...props}
    />
  );
}

export function TextArea({
  className,
  error,
  ...props
}: TextareaHTMLAttributes<HTMLTextAreaElement> & { error?: string }) {
  return (
    <textarea
      className={cn(fieldBase, "min-h-[120px] resize-y", error && "border-blush-300 focus-visible:ring-blush-300", className)}
      {...props}
    />
  );
}

export function Select({
  className,
  error,
  children,
  ...props
}: SelectHTMLAttributes<HTMLSelectElement> & { error?: string }) {
  return (
    <select className={cn(fieldBase, "bg-white", error && "border-blush-300", className)} {...props}>
      {children}
    </select>
  );
}

export function CheckboxRow({
  id,
  label,
  ...props
}: InputHTMLAttributes<HTMLInputElement> & { id: string; label: ReactNode }) {
  return (
    <label htmlFor={id} className="flex cursor-pointer items-start gap-3 text-sm text-ink-700">
      <input
        id={id}
        type="checkbox"
        className="focus-ring mt-0.5 h-4 w-4 shrink-0 rounded border-ink-300 text-marmalade-500"
        {...props}
      />
      <span>{label}</span>
    </label>
  );
}

export function RadioRow({
  id,
  name,
  label,
  ...props
}: InputHTMLAttributes<HTMLInputElement> & { id: string; name: string; label: ReactNode }) {
  return (
    <label
      htmlFor={id}
      className="focus-ring flex cursor-pointer items-center gap-2 rounded-full border border-ink-100 bg-white px-4 py-2 text-sm text-ink-700 transition-colors has-[:checked]:border-marmalade-500 has-[:checked]:bg-marmalade-50 has-[:checked]:text-marmalade-700"
    >
      <input id={id} type="radio" name={name} className="h-3.5 w-3.5 text-marmalade-500" {...props} />
      {label}
    </label>
  );
}
