import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import { ArrowRight, Star, ShieldCheck, Sparkles } from "lucide-react"
import SearchBar from "../components/search/SearchBar"
import { SectionHeader } from "../components/ui/Section"
import CompanyCard from "../components/cards/CompanyCard"
import ProjectCard from "../components/cards/ProjectCard"
import Button from "../components/ui/Button"
import DynamicIcon from "../components/ui/DynamicIcon"
import { useApp } from "../store/AppContext"
import categoriesData from "../data/categories.json"
import servicesData from "../data/services.json"

const stats = [
  { value: "1,200+", label: "Verified firms" },
  { value: "8,500+", label: "Projects showcased" },
  { value: "40+", label: "Cities covered" },
  { value: "4.8", label: "Average rating" },
]

export default function Landing() {
  const { companies, projects } = useApp()
  const featured = companies.filter((c) => c.featured).slice(0, 3)
  const featuredProjects = projects.slice(0, 3)

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="mx-auto max-w-7xl px-5 pb-8 pt-10 sm:px-8 sm:pt-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mx-auto max-w-3xl text-center"
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-muted px-4 py-1.5 text-xs font-medium text-muted-foreground">
              <Sparkles size={14} className="text-accent" /> The premium network for building your dream space
            </span>
            <h1 className="mt-6 text-balance font-serif text-4xl font-semibold leading-tight text-foreground sm:text-6xl">
              Find the architects & builders behind extraordinary spaces
            </h1>
            <p className="mx-auto mt-5 max-w-xl text-pretty text-lg leading-relaxed text-muted-foreground">
              Discover, compare and connect with top architecture, design and construction firms. Browse portfolios and
              request quotes — all in one place.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="mx-auto mt-8 max-w-3xl"
          >
            <SearchBar />
            <div className="mt-4 flex flex-wrap items-center justify-center gap-2 text-sm text-muted-foreground">
              <span>Popular:</span>
              {categoriesData.slice(0, 4).map((c) => (
                <Link
                  key={c.id}
                  to={`/companies?type=${encodeURIComponent(c.name)}`}
                  className="rounded-full border border-border bg-card px-3 py-1 text-foreground transition-colors hover:bg-muted"
                >
                  {c.name}
                </Link>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="mt-12 overflow-hidden rounded-[2rem] border border-border"
          >
            <img
              src="/images/hero.png"
              alt="A modern luxury villa at golden hour"
              className="aspect-[16/7] w-full object-cover"
            />
          </motion.div>

          <div className="mt-10 grid grid-cols-2 gap-6 sm:grid-cols-4">
            {stats.map((s) => (
              <div key={s.label} className="text-center">
                <div className="font-serif text-3xl font-semibold text-foreground sm:text-4xl">{s.value}</div>
                <div className="mt-1 text-sm text-muted-foreground">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
        <SectionHeader
          eyebrow="Browse by category"
          title="Every discipline, one destination"
          description="From concept architecture to turnkey construction, find specialists for every stage of your project."
        />
        <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
          {categoriesData.map((c, i) => (
            <motion.div
              key={c.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: i * 0.04 }}
            >
              <Link
                to={`/companies?type=${encodeURIComponent(c.name)}`}
                className="group flex h-full flex-col items-start gap-3 rounded-2xl border border-border bg-card p-5 transition-all hover:-translate-y-1 hover:shadow-lg"
              >
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-muted text-foreground transition-colors group-hover:bg-accent group-hover:text-accent-foreground">
                  <DynamicIcon name={c.icon} size={20} />
                </span>
                <span className="font-medium text-foreground">{c.name}</span>
                <span className="text-xs leading-relaxed text-muted-foreground">{c.description}</span>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Featured companies */}
      <section className="bg-muted/40 py-16">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <SectionHeader
            eyebrow="Featured firms"
            title="Handpicked studios & builders"
            description="Highly rated firms with award-winning portfolios and happy clients."
            action={{ to: "/companies", label: "View all firms" }}
          />
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((c) => (
              <CompanyCard key={c.id} company={c} />
            ))}
          </div>
        </div>
      </section>

      {/* Popular services */}
      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
        <SectionHeader eyebrow="Popular services" title="What can we help you build?" />
        <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {servicesData.map((s, i) => (
            <motion.div
              key={s.id}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: i * 0.03 }}
            >
              <Link
                to={`/companies?service=${s.id}`}
                className="flex items-center gap-3 rounded-2xl border border-border bg-card px-4 py-4 transition-colors hover:bg-muted"
              >
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-accent/10 text-accent">
                  <DynamicIcon name={s.icon} size={18} />
                </span>
                <span className="text-sm font-medium text-foreground">{s.name}</span>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Featured projects */}
      <section className="bg-muted/40 py-16">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <SectionHeader
            eyebrow="Featured projects"
            title="Get inspired by real work"
            description="Explore recently completed projects from firms across the network."
            action={{ to: "/projects", label: "Browse projects" }}
          />
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featuredProjects.map((p) => (
              <ProjectCard key={p.id} project={p} />
            ))}
          </div>
        </div>
      </section>

      {/* Trust strip */}
      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
        <div className="grid gap-6 md:grid-cols-3">
          {[
            { icon: ShieldCheck, title: "Verified firms", text: "Every studio is reviewed for quality and credentials before listing." },
            { icon: Star, title: "Real portfolios", text: "Browse genuine completed projects with photos, cities and timelines." },
            { icon: Sparkles, title: "Free quotes", text: "Request quotes from multiple firms and compare — no cost, no obligation." },
          ].map((f) => (
            <div key={f.title} className="rounded-3xl border border-border bg-card p-7">
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-muted text-foreground">
                <f.icon size={22} />
              </span>
              <h3 className="mt-4 font-serif text-xl text-foreground">{f.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{f.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-5 pb-20 sm:px-8">
        <div className="relative overflow-hidden rounded-[2rem]">
          <img src="/images/cta.png" alt="Modern neighbourhood at sunset" className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-primary/60" />
          <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center">
            <h2 className="max-w-2xl text-balance font-serif text-3xl font-semibold text-primary-foreground sm:text-4xl">
              Are you a firm? Showcase your work to thousands of clients
            </h2>
            <p className="mt-3 max-w-lg text-pretty text-primary-foreground/80">
              Create a free profile, upload your portfolio and start receiving quote requests today.
            </p>
            <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
              <Button to="/create-company" variant="accent" size="lg">
                List your firm <ArrowRight size={18} />
              </Button>
              <Button to="/companies" variant="outline" size="lg" className="border-white/40 bg-white/10 text-primary-foreground hover:bg-white/20">
                Explore firms
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
