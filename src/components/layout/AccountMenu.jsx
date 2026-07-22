import { useEffect, useRef, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { AnimatePresence, motion } from "framer-motion"
import { LayoutDashboard, User, Heart, FileText, LogOut, ChevronDown, Crown } from "lucide-react"
import { useApp } from "../../store/AppContext"
import { useToast } from "../../store/ToastContext"

export default function AccountMenu() {
  const { account, logout } = useApp()
  const { toast } = useToast()
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const onClick = (e) => ref.current && !ref.current.contains(e.target) && setOpen(false)
    document.addEventListener("mousedown", onClick)
    return () => document.removeEventListener("mousedown", onClick)
  }, [])

  if (!account) return null

  const isCompany = account.role === "company"
  const initials = account.name.split(" ").map((w) => w[0]).slice(0, 2).join("").toUpperCase()

  const links = isCompany
    ? [
        { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
        { to: "/dashboard/profile", label: "Company profile", icon: User },
        { to: "/dashboard/quotes", label: "Quote requests", icon: FileText },
      ]
    : [
        { to: "/account", label: "My dashboard", icon: LayoutDashboard },
        { to: "/favourites", label: "Favourites", icon: Heart },
        { to: "/account/quotes", label: "Quote requests", icon: FileText },
      ]

  const handleLogout = () => {
    logout()
    toast("You've been signed out.", { title: "Goodbye" })
    navigate("/")
  }

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen((v) => !v)}
        className="inline-flex items-center gap-2 rounded-full border border-border bg-card py-1.5 pl-1.5 pr-3 text-sm font-medium text-foreground hover:bg-muted"
        aria-expanded={open}
      >
        <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-primary text-xs font-semibold text-primary-foreground">
          {initials}
        </span>
        <span className="hidden max-w-24 truncate sm:inline">{account.name.split(" ")[0]}</span>
        <ChevronDown size={15} className="text-muted-foreground" />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.98 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 top-12 z-50 w-60 overflow-hidden rounded-2xl border border-border bg-card shadow-2xl"
          >
            <div className="border-b border-border px-4 py-3">
              <p className="truncate font-medium text-foreground">{account.name}</p>
              <p className="truncate text-xs text-muted-foreground">{account.email}</p>
              <span className="mt-1.5 inline-flex items-center gap-1 rounded-full bg-muted px-2 py-0.5 text-[11px] font-medium capitalize text-muted-foreground">
                {isCompany ? "Firm account" : "Client account"}
              </span>
            </div>
            <div className="py-1.5">
              {links.map((l) => (
                <Link
                  key={l.to}
                  to={l.to}
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-3 px-4 py-2.5 text-sm text-foreground hover:bg-muted"
                >
                  <l.icon size={16} className="text-muted-foreground" /> {l.label}
                </Link>
              ))}
              <Link
                to="/pricing"
                onClick={() => setOpen(false)}
                className="flex items-center gap-3 px-4 py-2.5 text-sm text-foreground hover:bg-muted"
              >
                <Crown size={16} className="text-accent" /> Upgrade plan
              </Link>
            </div>
            <div className="border-t border-border py-1.5">
              <button
                onClick={handleLogout}
                className="flex w-full items-center gap-3 px-4 py-2.5 text-sm text-foreground hover:bg-muted"
              >
                <LogOut size={16} className="text-muted-foreground" /> Sign out
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
