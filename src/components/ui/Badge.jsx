import { cn } from "../../lib/utils"

const tones = {
  neutral: "bg-muted text-muted-foreground",
  accent: "bg-accent/10 text-accent",
  dark: "bg-primary text-primary-foreground",
  outline: "border border-border text-foreground",
}

export default function Badge({ children, tone = "neutral", className }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-3 py-1 text-xs font-medium tracking-wide",
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  )
}
