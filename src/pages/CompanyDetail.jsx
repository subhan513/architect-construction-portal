import { useState } from "react"
import { useParams, Link } from "react-router-dom"
import { useApp } from "../store/AppContext"
import Button from "../components/ui/Button"
import Badge from "../components/ui/Badge"
import Rating from "../components/ui/Rating"
import FavouriteButton from "../components/ui/FavouriteButton"
import Gallery from "../components/company/Gallery"
import Reviews from "../components/company/Reviews"
import QuoteRequestModal from "../components/company/QuoteRequestModal"
import ProjectCard from "../components/cards/ProjectCard"
import MapView from "../components/map/MapView"
import { Container } from "../components/ui/Section"
import {
  MapPin,
  Phone,
  Mail,
  Globe,
  CheckCircle2,
  Calendar,
  Users,
  Briefcase,
  ArrowLeft,
} from "lucide-react"

const TABS = ["Overview", "Portfolio", "Reviews", "Location"]

export default function CompanyDetail() {
  const { id } = useParams()
  const { getCompany, getCompanyProjects } = useApp()
  const company = getCompany(id)
  const [tab, setTab] = useState("Overview")
  const [quoteOpen, setQuoteOpen] = useState(false)

  if (!company) {
    return (
      <Container className="py-24 text-center">
        <h1 className="font-serif text-3xl font-semibold">Company not found</h1>
        <Link to="/companies" className="mt-4 inline-block text-accent hover:underline">
          Back to directory
        </Link>
      </Container>
    )
  }

  const projects = getCompanyProjects(company.id)

  return (
    <div className="pb-20">
      {/* Cover */}
      <div className="relative h-64 w-full overflow-hidden md:h-80">
        <img
          src={company.cover || "/placeholder.svg"}
          alt={`${company.name} cover`}
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 to-transparent" />
        <Container className="absolute inset-x-0 bottom-4">
          <Link
            to="/companies"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-background/90 hover:text-background"
          >
            <ArrowLeft className="h-4 w-4" /> Back to directory
          </Link>
        </Container>
      </div>

      <Container className="relative -mt-16">
        {/* Header card */}
        <div className="rounded-2xl border border-border bg-card p-6 shadow-lg md:p-8">
          <div className="flex flex-col gap-5 md:flex-row md:items-start">
            <img
              src={company.logo || "/placeholder.svg"}
              alt={`${company.name} logo`}
              className="h-20 w-20 flex-shrink-0 rounded-xl border border-border bg-background object-cover"
            />
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="font-serif text-3xl font-semibold text-foreground text-balance">{company.name}</h1>
                {company.verified && (
                  <span className="inline-flex items-center gap-1 rounded-full bg-accent/15 px-2.5 py-0.5 text-xs font-medium text-accent">
                    <CheckCircle2 className="h-3.5 w-3.5" /> Verified
                  </span>
                )}
              </div>
              <p className="mt-1 text-muted-foreground">{company.category}</p>
              <div className="mt-3 flex flex-wrap items-center gap-4 text-sm">
                <span className="flex items-center gap-1.5">
                  <Rating value={company.rating} size={15} />
                  <span className="font-medium text-foreground">{company.rating}</span>
                  <span className="text-muted-foreground">({company.reviewCount})</span>
                </span>
                <span className="flex items-center gap-1.5 text-muted-foreground">
                  <MapPin className="h-4 w-4" /> {company.city}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <FavouriteButton companyId={company.id} />
              <Button onClick={() => setQuoteOpen(true)}>Request a quote</Button>
            </div>
          </div>

          {/* Quick stats */}
          <div className="mt-6 grid grid-cols-2 gap-4 border-t border-border pt-6 sm:grid-cols-4">
            {[
              { icon: Calendar, label: "Founded", value: company.founded },
              { icon: Users, label: "Team size", value: company.teamSize },
              { icon: Briefcase, label: "Projects", value: `${company.projectsCompleted}+` },
              { icon: CheckCircle2, label: "Response", value: company.responseTime },
            ].map(({ icon: Icon, label, value }) => (
              <div key={label} className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary">
                  <Icon className="h-5 w-5 text-accent" />
                </div>
                <div>
                  <div className="text-xs text-muted-foreground">{label}</div>
                  <div className="font-semibold text-foreground">{value}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Tabs */}
        <div className="sticky top-16 z-30 mt-8 flex gap-1 overflow-x-auto rounded-xl border border-border bg-card/90 p-1.5 backdrop-blur">
          {TABS.map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`flex-1 whitespace-nowrap rounded-lg px-4 py-2 text-sm font-medium transition ${
                tab === t ? "bg-accent text-accent-foreground" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        <div className="mt-8">
          {tab === "Overview" && (
            <div className="grid gap-10 lg:grid-cols-[1fr_320px]">
              <div className="space-y-8">
                <section>
                  <h2 className="font-serif text-xl font-semibold">About</h2>
                  <p className="mt-3 leading-relaxed text-muted-foreground">{company.description}</p>
                </section>
                <section>
                  <h2 className="mb-3 font-serif text-xl font-semibold">Services</h2>
                  <div className="flex flex-wrap gap-2">
                    {company.services.map((s) => (
                      <Badge key={s} variant="outline">
                        {s}
                      </Badge>
                    ))}
                  </div>
                </section>
                <section>
                  <h2 className="mb-3 font-serif text-xl font-semibold">Areas of expertise</h2>
                  <div className="flex flex-wrap gap-2">
                    {company.expertise.map((s) => (
                      <Badge key={s}>{s}</Badge>
                    ))}
                  </div>
                </section>
                <section>
                  <h2 className="mb-4 font-serif text-xl font-semibold">Gallery</h2>
                  <Gallery images={company.gallery} />
                </section>
              </div>

              {/* Contact card */}
              <aside className="h-fit space-y-4 rounded-2xl border border-border bg-card p-6 lg:sticky lg:top-40">
                <h3 className="font-serif text-lg font-semibold">Contact</h3>
                <ul className="space-y-3 text-sm">
                  <li className="flex items-center gap-3 text-muted-foreground">
                    <Phone className="h-4 w-4 text-accent" /> {company.phone}
                  </li>
                  <li className="flex items-center gap-3 text-muted-foreground">
                    <Mail className="h-4 w-4 text-accent" /> {company.email}
                  </li>
                  <li className="flex items-center gap-3 text-muted-foreground">
                    <Globe className="h-4 w-4 text-accent" /> {company.website}
                  </li>
                  <li className="flex items-start gap-3 text-muted-foreground">
                    <MapPin className="mt-0.5 h-4 w-4 text-accent" /> {company.address}
                  </li>
                </ul>
                <Button className="w-full" onClick={() => setQuoteOpen(true)}>
                  Request a quote
                </Button>
              </aside>
            </div>
          )}

          {tab === "Portfolio" && (
            <div>
              {projects.length ? (
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {projects.map((p) => (
                    <ProjectCard key={p.id} project={p} />
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground">No portfolio projects yet.</p>
              )}
            </div>
          )}

          {tab === "Reviews" && (
            <Reviews reviews={company.reviews} rating={company.rating} reviewCount={company.reviewCount} />
          )}

          {tab === "Location" && (
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-muted-foreground">
                <MapPin className="h-5 w-5 text-accent" />
                {company.address}
              </div>
              <div className="h-[420px] overflow-hidden rounded-2xl border border-border">
                <MapView
                  markers={[{ ...company.coordinates, id: company.id, name: company.name, city: company.city }]}
                  center={company.coordinates}
                  zoom={13}
                />
              </div>
            </div>
          )}
        </div>
      </Container>

      <QuoteRequestModal open={quoteOpen} onClose={() => setQuoteOpen(false)} company={company} />
    </div>
  )
}
