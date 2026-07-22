import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import { Building2 } from "lucide-react"

export default function AuthShell({ title, subtitle, children, footer }) {
  return (
    <div className="relative flex min-h-[calc(100vh-4rem)] items-center justify-center px-4 py-12">
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <img
          src="/images/hero.png"
          alt=""
          aria-hidden="true"
          className="h-full w-full object-cover opacity-[0.06]"
        />
      </div>
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-md"
      >
        <Link to="/" className="mb-8 flex items-center justify-center gap-2">
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground">
            <Building2 size={20} />
          </span>
          <span className="font-serif text-2xl font-semibold tracking-tight text-foreground">ArchBuild</span>
        </Link>

        <div className="rounded-3xl border border-border bg-card p-7 shadow-xl sm:p-8">
          <div className="mb-6 text-center">
            <h1 className="font-serif text-2xl font-semibold text-foreground">{title}</h1>
            {subtitle && <p className="mt-1.5 text-sm text-muted-foreground">{subtitle}</p>}
          </div>
          {children}
        </div>

        {footer && <div className="mt-5 text-center text-sm text-muted-foreground">{footer}</div>}
      </motion.div>
    </div>
  )
}

export function RoleToggle({ value, onChange }) {
  const roles = [
    { id: "user", label: "I'm a client" },
    { id: "company", label: "I'm a firm" },
  ]
  return (
    <div className="mb-6 grid grid-cols-2 gap-2 rounded-2xl bg-muted p-1.5">
      {roles.map((r) => (
        <button
          key={r.id}
          type="button"
          onClick={() => onChange(r.id)}
          aria-pressed={value === r.id}
          className={
            "rounded-xl px-4 py-2.5 text-sm font-medium transition-all " +
            (value === r.id ? "bg-card text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground")
          }
        >
          {r.label}
        </button>
      ))}
    </div>
  )
}
