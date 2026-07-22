import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Search, MapPin, LayoutGrid } from "lucide-react"
import citiesData from "../../data/cities.json"
import categoriesData from "../../data/categories.json"

export default function SearchBar({ variant = "hero" }) {
  const navigate = useNavigate()
  const [query, setQuery] = useState("")
  const [city, setCity] = useState("")
  const [category, setCategory] = useState("")

  const submit = (e) => {
    e.preventDefault()
    const params = new URLSearchParams()
    if (query) params.set("q", query)
    if (city) params.set("city", city)
    if (category) params.set("type", category)
    navigate(`/companies?${params.toString()}`)
  }

  return (
    <form
      onSubmit={submit}
      className="flex w-full flex-col gap-2 rounded-3xl border border-border bg-card p-2 shadow-lg sm:flex-row sm:items-center sm:rounded-full"
    >
      <div className="flex flex-1 items-center gap-2 rounded-2xl px-4 sm:rounded-full">
        <Search size={18} className="shrink-0 text-muted-foreground" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search firms, e.g. Atelier Nord"
          className="h-12 w-full bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
          aria-label="Search firms"
        />
      </div>

      <div className="hidden h-8 w-px bg-border sm:block" />

      <div className="flex items-center gap-2 rounded-2xl px-4 sm:rounded-full">
        <MapPin size={18} className="shrink-0 text-muted-foreground" />
        <select
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="h-12 w-full min-w-32 bg-transparent text-sm text-foreground focus:outline-none"
          aria-label="Filter by city"
        >
          <option value="">Any city</option>
          {citiesData.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>
      </div>

      <div className="hidden h-8 w-px bg-border sm:block" />

      <div className="flex items-center gap-2 rounded-2xl px-4 sm:rounded-full">
        <LayoutGrid size={18} className="shrink-0 text-muted-foreground" />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="h-12 w-full min-w-32 bg-transparent text-sm text-foreground focus:outline-none"
          aria-label="Filter by category"
        >
          <option value="">Any category</option>
          {categoriesData.map((c) => (
            <option key={c.id} value={c.name}>
              {c.name}
            </option>
          ))}
        </select>
      </div>

      <button
        type="submit"
        className="inline-flex h-12 items-center justify-center gap-2 rounded-2xl bg-accent px-6 text-sm font-semibold text-accent-foreground transition-colors hover:bg-accent/90 sm:rounded-full"
      >
        <Search size={16} /> Search
      </button>
    </form>
  )
}
