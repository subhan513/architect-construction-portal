import { cn } from "../../lib/utils"

export function Label({ children, htmlFor, className }) {
  return (
    <label htmlFor={htmlFor} className={cn("mb-1.5 block text-sm font-medium text-foreground", className)}>
      {children}
    </label>
  )
}

const baseField =
  "w-full rounded-xl border border-input bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground transition-colors focus:border-ring focus:outline-none focus:ring-2 focus:ring-ring/30"

export function Input({ className, ...props }) {
  return <input className={cn(baseField, className)} {...props} />
}

export function Textarea({ className, rows = 4, ...props }) {
  return <textarea rows={rows} className={cn(baseField, "resize-none", className)} {...props} />
}

export function Select({ className, children, ...props }) {
  return (
    <select className={cn(baseField, "appearance-none bg-no-repeat pr-10", className)} {...props}>
      {children}
    </select>
  )
}

export function Field({ label, htmlFor, children, className, hint }) {
  return (
    <div className={className}>
      {label && <Label htmlFor={htmlFor}>{label}</Label>}
      {children}
      {hint && <p className="mt-1 text-xs text-muted-foreground">{hint}</p>}
    </div>
  )
}

export function CheckboxPill({ checked, onChange, children }) {
  return (
    <button
      type="button"
      onClick={onChange}
      aria-pressed={checked}
      className={cn(
        "rounded-full border px-4 py-2 text-sm font-medium transition-all",
        checked
          ? "border-primary bg-primary text-primary-foreground"
          : "border-border bg-background text-foreground hover:bg-muted",
      )}
    >
      {children}
    </button>
  )
}
