import { useState, useEffect } from "react"
import { Link, NavLink, useLocation } from "react-router-dom"
import { AnimatePresence, motion } from "framer-motion"
import { Menu, X, Heart, Building2, Plus } from "lucide-react"
import Button from "../ui/Button"
import { useApp } from "../../store/AppContext"
import { cn } from "../../lib/utils"

const links = [
  { to: "/companies", label: "Discover" },
  { to: "/projects", label: "Projects" },
  { to: "/create-company", label: "List your firm" },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { favourites } = useApp()
  const location = useLocation()

  useEffect(() => setOpen(false), [location.pathname])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener("scroll", onScroll)
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <header
      className={cn(
        "sticky top-0 z-40 w-full transition-all duration-300",
        scrolled ? "border-b border-border bg-background/85 backdrop-blur-md" : "bg-transparent",
      )}
    >
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-8">
        <Link to="/" className="flex items-center gap-2">
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-foreground">
            <Building2 size={18} />
          </span>
          <span className="font-serif text-xl font-semibold tracking-tight text-foreground">ArchBuild</span>
        </Link>

        <div className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              className={({ isActive }) =>
                cn(
                  "rounded-full px-4 py-2 text-sm font-medium transition-colors",
                  isActive ? "text-foreground" : "text-muted-foreground hover:text-foreground",
                )
              }
            >
              {l.label}
            </NavLink>
          ))}
        </div>

        <div className="hidden items-center gap-2 md:flex">
          <Link
            to="/favourites"
            className="relative inline-flex h-10 w-10 items-center justify-center rounded-full text-foreground hover:bg-muted"
            aria-label="Favourites"
          >
            <Heart size={18} />
            {favourites.length > 0 && (
              <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-accent px-1 text-[10px] font-semibold text-accent-foreground">
                {favourites.length}
              </span>
            )}
          </Link>
          <Button to="/profile" variant="outline" size="sm">
            Profile
          </Button>
          <Button to="/create-company" variant="primary" size="sm">
            <Plus size={16} /> Add firm
          </Button>
        </div>

        <button
          className="inline-flex h-10 w-10 items-center justify-center rounded-full text-foreground hover:bg-muted md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden border-b border-border bg-background md:hidden"
          >
            <div className="flex flex-col gap-1 px-5 py-4">
              {links.map((l) => (
                <NavLink
                  key={l.to}
                  to={l.to}
                  className={({ isActive }) =>
                    cn(
                      "rounded-xl px-4 py-3 text-base font-medium",
                      isActive ? "bg-muted text-foreground" : "text-muted-foreground",
                    )
                  }
                >
                  {l.label}
                </NavLink>
              ))}
              <NavLink to="/favourites" className="rounded-xl px-4 py-3 text-base font-medium text-muted-foreground">
                Favourites ({favourites.length})
              </NavLink>
              <NavLink to="/profile" className="rounded-xl px-4 py-3 text-base font-medium text-muted-foreground">
                Profile
              </NavLink>
              <Button to="/create-company" variant="primary" className="mt-2 w-full">
                <Plus size={16} /> Add your firm
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
