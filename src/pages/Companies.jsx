import { useEffect, useMemo, useState } from "react"
import { useSearchParams } from "react-router-dom"
import { Search, SlidersHorizontal, X, Building2 } from "lucide-react"
import CompanyCard from "../components/cards/CompanyCard"
import FilterPanel from "../components/search/FilterPanel"
import { EmptyState } from "../components/ui/Section"
import { useApp } from "../store/AppContext"

const emptyFilters = { cities: [], types: [], services: [], q: "", minRating: 0 }

export default function Companies() {
  const { companies } = useApp()
  const [searchParams] = useSearchParams()
  const [filters, setFilters] = useState(emptyFilters)
  const [sort, setSort] = useState("rating")
  const [mobileFilters, setMobileFilters] = useState(false)

  // Seed filters from URL query params on load
  useEffect(() => {
    setFilters((prev) => ({
      ...prev,
      q: searchParams.get("q") || "",
      cities: searchParams.get("city") ? [searchParams.get("city")] : prev.cities,
      types: searchParams.get("type") ? [searchParams.get("type")] : prev.types,
      services: searchParams.get("service") ? [searchParams.get("service")] : prev.services,
    }))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams])

  const results = useMemo(() => {
    let list = companies.filter((c) => {
      const matchesQuery =
        !filters.q ||
        c.name.toLowerCase().includes(filters.q.toLowerCase()) ||
        c.location.toLowerCase().includes(filters.q.toLowerCase())
      const matchesCity = filters.cities.length === 0 || filters.cities.includes(c.city)
      const matchesType = filters.types.length === 0 || filters.types.includes(c.type)
      const matchesService =
        filters.services.length === 0 || filters.services.some((s) => c.services.includes(s))
      const matchesRating = c.rating >= filters.minRating
      return matchesQuery && matchesCity && matchesType && matchesService && matchesRating
    })

    list = [...list].sort((a, b) => {
      if (sort === "rating") return b.rating - a.rating
      if (sort === "reviews") return b.reviews - a.reviews
      if (sort === "newest") return b.established - a.established
      return a.name.localeCompare(b.name)
    })
    return list
  }, [companies, filters, sort])

  const activeCount = filters.cities.length + filters.types.length + filters.services.length

  return (
    <div className="mx-auto max-w-7xl px-5 py-10 sm:px-8">
      <div className="mb-8">
        <h1 className="font-serif text-3xl font-semibold text-foreground sm:text-4xl">Discover firms</h1>
        <p className="mt-2 text-muted-foreground">
          Browse {companies.length} architecture, design and construction firms.
        </p>
      </div>

      {/* Search + controls */}
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="flex flex-1 items-center gap-2 rounded-full border border-border bg-card px-4">
          <Search size={18} className="text-muted-foreground" />
          <input
            value={filters.q}
            onChange={(e) => setFilters((f) => ({ ...f, q: e.target.value }))}
            placeholder="Search by name or location"
            className="h-11 w-full bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
            aria-label="Search firms"
          />
          {filters.q && (
            <button onClick={() => setFilters((f) => ({ ...f, q: "" }))} aria-label="Clear search">
              <X size={16} className="text-muted-foreground" />
            </button>
          )}
        </div>
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="h-11 rounded-full border border-border bg-card px-4 text-sm text-foreground focus:outline-none"
          aria-label="Sort results"
        >
          <option value="rating">Top rated</option>
          <option value="reviews">Most reviewed</option>
          <option value="newest">Newest</option>
          <option value="name">Name (A–Z)</option>
        </select>
        <button
          onClick={() => setMobileFilters(true)}
          className="inline-flex h-11 items-center justify-center gap-2 rounded-full border border-border bg-card px-4 text-sm font-medium text-foreground lg:hidden"
        >
          <SlidersHorizontal size={16} /> Filters {activeCount > 0 && `(${activeCount})`}
        </button>
      </div>

      <div className="flex gap-8">
        {/* Desktop filters */}
        <aside className="hidden w-64 shrink-0 lg:block">
          <div className="sticky top-24 rounded-3xl border border-border bg-card p-5">
            <FilterPanel filters={filters} setFilters={setFilters} />
          </div>
        </aside>

        {/* Results */}
        <div className="flex-1">
          <p className="mb-4 text-sm text-muted-foreground">
            {results.length} {results.length === 1 ? "firm" : "firms"} found
          </p>
          {results.length === 0 ? (
            <EmptyState
              icon={Building2}
              title="No firms match your filters"
              description="Try removing a filter or searching for a different term."
            />
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {results.map((c) => (
                <CompanyCard key={c.id} company={c} />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Mobile filter drawer */}
      {mobileFilters && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-primary/40 backdrop-blur-sm" onClick={() => setMobileFilters(false)} />
          <div className="absolute inset-y-0 right-0 w-[85%] max-w-sm overflow-y-auto bg-background p-6">
            <div className="mb-5 flex items-center justify-between">
              <h2 className="font-serif text-xl text-foreground">Filters</h2>
              <button onClick={() => setMobileFilters(false)} aria-label="Close filters">
                <X size={20} className="text-foreground" />
              </button>
            </div>
            <FilterPanel filters={filters} setFilters={setFilters} />
            <button
              onClick={() => setMobileFilters(false)}
              className="mt-6 w-full rounded-full bg-primary py-3 text-sm font-medium text-primary-foreground"
            >
              Show {results.length} results
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
