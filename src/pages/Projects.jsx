import { useState, useMemo } from "react"
import { useApp } from "../store/AppContext"
import ProjectCard from "../components/cards/ProjectCard"
import { Container, EmptyState } from "../components/ui/Section"
import { LayoutGrid } from "lucide-react"

export default function Projects() {
  const { projects } = useApp()
  const types = useMemo(() => ["All", ...new Set(projects.map((p) => p.type))], [projects])
  const [type, setType] = useState("All")

  const filtered = type === "All" ? projects : projects.filter((p) => p.type === type)

  return (
    <div className="py-12">
      <Container>
        <div className="mb-8 text-center">
          <p className="text-sm font-medium uppercase tracking-wide text-accent">Inspiration</p>
          <h1 className="mt-1 font-serif text-3xl font-semibold text-foreground md:text-4xl text-balance">
            Explore featured projects
          </h1>
          <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
            Browse a curated selection of completed work from top architects and builders.
          </p>
        </div>

        <div className="mb-8 flex flex-wrap justify-center gap-2">
          {types.map((t) => (
            <button
              key={t}
              onClick={() => setType(t)}
              className={`rounded-full border px-4 py-1.5 text-sm font-medium transition ${
                type === t
                  ? "border-accent bg-accent text-accent-foreground"
                  : "border-border bg-card text-muted-foreground hover:border-accent/50"
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        {filtered.length ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((p) => (
              <ProjectCard key={p.id} project={p} showCompany />
            ))}
          </div>
        ) : (
          <EmptyState icon={LayoutGrid} title="No projects found" description="Try a different category filter." />
        )}
      </Container>
    </div>
  )
}
