// Lightweight className joiner (no external deps)
export function cn(...inputs) {
  return inputs.flat().filter(Boolean).join(" ")
}

export function formatType(type) {
  return type
}

// Safe localStorage helpers
export function loadJSON(key, fallback) {
  try {
    const raw = localStorage.getItem(key)
    return raw ? JSON.parse(raw) : fallback
  } catch {
    return fallback
  }
}

export function saveJSON(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch {
    /* ignore */
  }
}

export function slugify(str) {
  return String(str)
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
}

// Status metadata for projects / companies / services (label + tone classes)
export const STATUS_META = {
  published: { label: "Published", className: "bg-emerald-100 text-emerald-700" },
  live: { label: "Live", className: "bg-emerald-100 text-emerald-700" },
  draft: { label: "Draft", className: "bg-amber-100 text-amber-700" },
  completed: { label: "Completed", className: "bg-sky-100 text-sky-700" },
  "under-construction": { label: "Under Construction", className: "bg-orange-100 text-orange-700" },
  archived: { label: "Archived", className: "bg-muted text-muted-foreground" },
}

export function statusMeta(status) {
  return STATUS_META[status] || { label: status || "Unknown", className: "bg-muted text-muted-foreground" }
}

// Derive public "trust" badges for a company (dummy UI only).
export function companyBadges(company) {
  if (!company) return []
  const badges = []
  const year = new Date().getFullYear()
  if (company.featured || company.verified) badges.push({ id: "verified", label: "Verified", tone: "verified" })
  if (company.plan === "premium" || company.featured) badges.push({ id: "premium", label: "Premium", tone: "premium" })
  if (Number(company.rating) >= 4.8) badges.push({ id: "top", label: "Top Rated", tone: "top" })
  if (Number(company.established) >= year - 4) badges.push({ id: "new", label: "New", tone: "new" })
  return badges
}

// Company profile completion (0-100) + checklist for the dashboard.
export function profileCompletion(company) {
  if (!company) return { percent: 0, items: [] }
  const items = [
    { key: "logo", label: "Logo", done: !!company.logo },
    { key: "about", label: "About", done: !!(company.about || company.description) },
    { key: "gallery", label: "Gallery", done: (company.gallery || []).length > 0 },
    { key: "services", label: "Services", done: (company.services || []).length > 0 },
    { key: "contact", label: "Contact", done: !!(company.phone && company.email) },
  ]
  const done = items.filter((i) => i.done).length
  return { percent: Math.round((done / items.length) * 100), items }
}
