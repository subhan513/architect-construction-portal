import { useState } from "react"
import { Link } from "react-router-dom"
import { useApp } from "../store/AppContext"
import CompanyCard from "../components/cards/CompanyCard"
import Button from "../components/ui/Button"
import Badge from "../components/ui/Badge"
import { Container, EmptyState } from "../components/ui/Section"
import { Building2, FileText, Heart, Plus, Pencil, Mail, Phone, MapPin } from "lucide-react"

const TABS = ["My Listings", "Quote Requests", "Saved"]

export default function Profile() {
  const { user, companies, favourites, quoteRequests } = useApp()
  const [tab, setTab] = useState("My Listings")

  const myListings = companies.filter((c) => user.companyIds?.includes(c.id))
  const saved = companies.filter((c) => favourites.includes(c.id))

  return (
    <div className="py-12">
      <Container>
        {/* Profile header */}
        <div className="flex flex-col gap-5 rounded-2xl border border-border bg-card p-6 md:flex-row md:items-center md:p-8">
          <img
            src={user.avatar || "/placeholder.svg"}
            alt={user.name}
            className="h-20 w-20 rounded-full border border-border object-cover"
          />
          <div className="flex-1">
            <h1 className="font-serif text-2xl font-semibold text-foreground">{user.name}</h1>
            <p className="text-muted-foreground">{user.role}</p>
            <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-sm text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <Mail className="h-4 w-4 text-accent" /> {user.email}
              </span>
              <span className="flex items-center gap-1.5">
                <Phone className="h-4 w-4 text-accent" /> {user.phone}
              </span>
              <span className="flex items-center gap-1.5">
                <MapPin className="h-4 w-4 text-accent" /> {user.location}
              </span>
            </div>
          </div>
          <Link to="/companies/new">
            <Button>
              <Plus className="h-4 w-4" /> Add company
            </Button>
          </Link>
        </div>

        {/* Stats */}
        <div className="mt-6 grid grid-cols-3 gap-4">
          {[
            { icon: Building2, label: "Listings", value: myListings.length },
            { icon: FileText, label: "Quote requests", value: quoteRequests.length },
            { icon: Heart, label: "Saved", value: saved.length },
          ].map(({ icon: Icon, label, value }) => (
            <div key={label} className="flex items-center gap-3 rounded-2xl border border-border bg-card p-5">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-secondary">
                <Icon className="h-5 w-5 text-accent" />
              </div>
              <div>
                <div className="font-serif text-2xl font-semibold text-foreground">{value}</div>
                <div className="text-xs text-muted-foreground">{label}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="mt-8 flex gap-1 overflow-x-auto border-b border-border">
          {TABS.map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`whitespace-nowrap border-b-2 px-4 py-3 text-sm font-medium transition ${
                tab === t
                  ? "border-accent text-foreground"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        <div className="mt-8">
          {tab === "My Listings" &&
            (myListings.length ? (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {myListings.map((c) => (
                  <div key={c.id} className="relative">
                    <CompanyCard company={c} />
                    <Link
                      to={`/companies/${c.id}/edit`}
                      className="absolute left-3 top-3 z-10 inline-flex items-center gap-1.5 rounded-full bg-card/95 px-3 py-1.5 text-xs font-medium text-foreground shadow-sm backdrop-blur transition hover:bg-card"
                    >
                      <Pencil className="h-3.5 w-3.5" /> Edit
                    </Link>
                  </div>
                ))}
              </div>
            ) : (
              <EmptyState
                icon={Building2}
                title="No listings yet"
                description="Create your first company profile to start receiving quote requests."
                action={
                  <Link to="/companies/new">
                    <Button>Add company</Button>
                  </Link>
                }
              />
            ))}

          {tab === "Quote Requests" &&
            (quoteRequests.length ? (
              <div className="space-y-4">
                {quoteRequests.map((q) => (
                  <div
                    key={q.id}
                    className="flex flex-col gap-3 rounded-2xl border border-border bg-card p-5 sm:flex-row sm:items-center sm:justify-between"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-medium text-foreground">{q.companyName}</h3>
                        <Badge variant="accent">{q.status}</Badge>
                      </div>
                      <p className="mt-1 text-sm text-muted-foreground">
                        {q.service} {q.budget && `· ${q.budget}`}
                      </p>
                      {q.message && <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">{q.message}</p>}
                    </div>
                    <div className="text-sm text-muted-foreground">{q.date}</div>
                  </div>
                ))}
              </div>
            ) : (
              <EmptyState
                icon={FileText}
                title="No quote requests"
                description="When you request quotes from companies, they'll appear here."
                action={
                  <Link to="/companies">
                    <Button>Find companies</Button>
                  </Link>
                }
              />
            ))}

          {tab === "Saved" &&
            (saved.length ? (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {saved.map((c) => (
                  <CompanyCard key={c.id} company={c} />
                ))}
              </div>
            ) : (
              <EmptyState
                icon={Heart}
                title="No saved companies"
                description="Tap the heart on any company to save it for later."
                action={
                  <Link to="/companies">
                    <Button>Browse companies</Button>
                  </Link>
                }
              />
            ))}
        </div>
      </Container>
    </div>
  )
}
