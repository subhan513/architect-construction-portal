import { Link } from "react-router-dom"
import { Building2 } from "lucide-react"

const columns = [
  {
    title: "Explore",
    links: [
      { label: "Discover firms", to: "/companies" },
      { label: "Projects", to: "/projects" },
      { label: "Favourites", to: "/favourites" },
    ],
  },
  {
    title: "For firms",
    links: [
      { label: "List your firm", to: "/create-company" },
      { label: "My projects", to: "/my-projects" },
      { label: "Profile", to: "/profile" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", to: "/" },
      { label: "Careers", to: "/" },
      { label: "Contact", to: "/" },
    ],
  },
]

export default function Footer() {
  return (
    <footer className="border-t border-border bg-muted/40">
      <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8">
        <div className="grid gap-10 md:grid-cols-[1.5fr_1fr_1fr_1fr]">
          <div>
            <Link to="/" className="flex items-center gap-2">
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                <Building2 size={18} />
              </span>
              <span className="font-serif text-xl font-semibold text-foreground">ArchBuild</span>
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
              The premium marketplace for architects, designers and builders. Discover talent, view portfolios and start
              your project with confidence.
            </p>
          </div>
          {columns.map((col) => (
            <div key={col.title}>
              <h3 className="text-sm font-semibold text-foreground">{col.title}</h3>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <Link to={l.to} className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12 flex flex-col items-start justify-between gap-4 border-t border-border pt-6 sm:flex-row sm:items-center">
          <p className="text-sm text-muted-foreground">© {new Date().getFullYear()} ArchBuild. Demo project — no real data.</p>
          <div className="flex gap-6 text-sm text-muted-foreground">
            <span>Privacy</span>
            <span>Terms</span>
            <span>Cookies</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
