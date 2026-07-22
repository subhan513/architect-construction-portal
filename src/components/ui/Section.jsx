import { Link } from "react-router-dom"
import { ArrowRight } from "lucide-react"
import { cn } from "../../lib/utils"

export function Container({ children, className }) {
  return <div className={cn("mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8", className)}>{children}</div>
}

export function SectionHeader({ eyebrow, title, description, action, className }) {
  return (
    <div className={cn("flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between", className)}>
      <div className="max-w-2xl">
        {eyebrow && <span className="text-sm font-medium uppercase tracking-widest text-accent">{eyebrow}</span>}
        <h2 className="mt-2 text-balance font-serif text-3xl font-semibold text-foreground sm:text-4xl">{title}</h2>
        {description && <p className="mt-3 text-pretty leading-relaxed text-muted-foreground">{description}</p>}
      </div>
      {action && (
        <Link
          to={action.to}
          className="group inline-flex shrink-0 items-center gap-1.5 text-sm font-medium text-foreground"
        >
          {action.label}
          <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
        </Link>
      )}
    </div>
  )
}

export function EmptyState({ icon: Icon, title, description, action }) {
  return (
    <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-border bg-muted/30 px-6 py-16 text-center">
      {Icon && (
        <span className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-muted text-muted-foreground">
          <Icon size={24} />
        </span>
      )}
      <h3 className="font-serif text-xl text-foreground">{title}</h3>
      {description && <p className="mt-2 max-w-sm text-sm text-muted-foreground">{description}</p>}
      {action && <div className="mt-6">{action}</div>}
    </div>
  )
}
