import { useState } from "react"
import { Input, Textarea, Select } from "../ui/Field"
import Button from "../ui/Button"
import ImageUpload from "../ui/ImageUpload"
import categories from "../../data/categories.json"
import cities from "../../data/cities.json"
import services from "../../data/services.json"
import expertise from "../../data/expertise.json"

function TagPicker({ label, options, value, onChange }) {
  const toggle = (opt) => {
    onChange(value.includes(opt) ? value.filter((v) => v !== opt) : [...value, opt])
  }
  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-foreground">{label}</label>
      <div className="flex flex-wrap gap-2">
        {options.map((opt) => {
          const on = value.includes(opt)
          return (
            <button
              type="button"
              key={opt}
              onClick={() => toggle(opt)}
              className={`rounded-full border px-3 py-1.5 text-sm transition ${
                on
                  ? "border-accent bg-accent text-accent-foreground"
                  : "border-border bg-background text-muted-foreground hover:border-accent/50"
              }`}
            >
              {opt}
            </button>
          )
        })}
      </div>
    </div>
  )
}

const STEPS = ["Basics", "Details", "Media"]

export default function CompanyForm({ initial, onSubmit, submitLabel = "Publish company" }) {
  const [step, setStep] = useState(0)
  const [form, setForm] = useState({
    name: "",
    category: categories[0]?.name || "",
    city: cities[0] || "",
    tagline: "",
    description: "",
    founded: "",
    teamSize: "",
    phone: "",
    email: "",
    website: "",
    address: "",
    services: [],
    expertise: [],
    logo: "",
    cover: "",
    gallery: [],
    ...initial,
  })

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e?.target ? e.target.value : e }))

  const next = () => setStep((s) => Math.min(s + 1, STEPS.length - 1))
  const back = () => setStep((s) => Math.max(s - 1, 0))

  const handleSubmit = (e) => {
    e.preventDefault()
    if (step < STEPS.length - 1) {
      next()
      return
    }
    onSubmit(form)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Stepper */}
      <div className="flex items-center gap-2">
        {STEPS.map((s, i) => (
          <div key={s} className="flex flex-1 items-center gap-2">
            <div
              className={`flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full text-sm font-semibold transition ${
                i <= step ? "bg-accent text-accent-foreground" : "bg-muted text-muted-foreground"
              }`}
            >
              {i + 1}
            </div>
            <span className={`text-sm font-medium ${i === step ? "text-foreground" : "text-muted-foreground"}`}>
              {s}
            </span>
            {i < STEPS.length - 1 && <div className="h-px flex-1 bg-border" />}
          </div>
        ))}
      </div>

      {step === 0 && (
        <div className="space-y-5">
          <Input label="Company name" required value={form.name} onChange={set("name")} placeholder="e.g. Atlas Studio" />
          <Input
            label="Tagline"
            value={form.tagline}
            onChange={set("tagline")}
            placeholder="One line that captures your work"
          />
          <div className="grid gap-5 sm:grid-cols-2">
            <Select label="Category" value={form.category} onChange={set("category")}>
              {categories.map((c) => (
                <option key={c.name} value={c.name}>
                  {c.name}
                </option>
              ))}
            </Select>
            <Select label="City" value={form.city} onChange={set("city")}>
              {cities.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </Select>
          </div>
          <Textarea
            label="Description"
            rows={4}
            required
            value={form.description}
            onChange={set("description")}
            placeholder="Describe your firm, philosophy, and what makes you stand out..."
          />
        </div>
      )}

      {step === 1 && (
        <div className="space-y-5">
          <div className="grid gap-5 sm:grid-cols-2">
            <Input label="Founded" value={form.founded} onChange={set("founded")} placeholder="2015" />
            <Input label="Team size" value={form.teamSize} onChange={set("teamSize")} placeholder="10-25" />
          </div>
          <div className="grid gap-5 sm:grid-cols-2">
            <Input label="Phone" value={form.phone} onChange={set("phone")} placeholder="+1 555 000 0000" />
            <Input label="Email" type="email" value={form.email} onChange={set("email")} placeholder="hello@firm.com" />
          </div>
          <div className="grid gap-5 sm:grid-cols-2">
            <Input label="Website" value={form.website} onChange={set("website")} placeholder="www.firm.com" />
            <Input label="Address" value={form.address} onChange={set("address")} placeholder="123 Main St" />
          </div>
          <TagPicker label="Services offered" options={services} value={form.services} onChange={set("services")} />
          <TagPicker label="Areas of expertise" options={expertise} value={form.expertise} onChange={set("expertise")} />
        </div>
      )}

      {step === 2 && (
        <div className="space-y-6">
          <ImageUpload label="Logo" value={form.logo} onChange={set("logo")} aspect="1/1" />
          <ImageUpload label="Cover image" value={form.cover} onChange={set("cover")} aspect="16/6" />
          <ImageUpload label="Gallery" value={form.gallery} onChange={set("gallery")} multiple aspect="4/3" />
        </div>
      )}

      <div className="flex items-center justify-between border-t border-border pt-6">
        <Button type="button" variant="ghost" onClick={back} disabled={step === 0}>
          Back
        </Button>
        <Button type="submit">{step < STEPS.length - 1 ? "Continue" : submitLabel}</Button>
      </div>
    </form>
  )
}
