import { cn } from "../../lib/utils"
import citiesData from "../../data/cities.json"
import categoriesData from "../../data/categories.json"
import servicesData from "../../data/services.json"

function Group({ title, children }) {
  return (
    <div className="border-b border-border pb-5">
      <h3 className="mb-3 text-sm font-semibold text-foreground">{title}</h3>
      {children}
    </div>
  )
}

function Check({ checked, onChange, label }) {
  return (
    <label className="flex cursor-pointer items-center gap-2.5 py-1 text-sm text-foreground">
      <span
        className={cn(
          "inline-flex h-5 w-5 items-center justify-center rounded-md border transition-colors",
          checked ? "border-primary bg-primary text-primary-foreground" : "border-input bg-background",
        )}
      >
        {checked && (
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
            <path d="M20 6 9 17l-5-5" />
          </svg>
        )}
      </span>
      <input type="checkbox" className="sr-only" checked={checked} onChange={onChange} />
      {label}
    </label>
  )
}

export default function FilterPanel({ filters, setFilters }) {
  const toggleArray = (key, value) => {
    setFilters((prev) => {
      const arr = prev[key]
      return { ...prev, [key]: arr.includes(value) ? arr.filter((v) => v !== value) : [...arr, value] }
    })
  }

  return (
    <div className="space-y-5">
      <Group title="City">
        <div className="space-y-0.5">
          {citiesData.map((c) => (
            <Check
              key={c.id}
              label={c.name}
              checked={filters.cities.includes(c.id)}
              onChange={() => toggleArray("cities", c.id)}
            />
          ))}
        </div>
      </Group>

      <Group title="Company type">
        <div className="space-y-0.5">
          {categoriesData.map((c) => (
            <Check
              key={c.id}
              label={c.name}
              checked={filters.types.includes(c.name)}
              onChange={() => toggleArray("types", c.name)}
            />
          ))}
        </div>
      </Group>

      <Group title="Services">
        <div className="space-y-0.5">
          {servicesData.map((s) => (
            <Check
              key={s.id}
              label={s.name}
              checked={filters.services.includes(s.id)}
              onChange={() => toggleArray("services", s.id)}
            />
          ))}
        </div>
      </Group>

      <button
        type="button"
        onClick={() => setFilters({ cities: [], types: [], services: [], q: "", minRating: 0 })}
        className="text-sm font-medium text-accent hover:underline"
      >
        Clear all filters
      </button>
    </div>
  )
}
