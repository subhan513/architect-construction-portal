import { useState } from "react"
import Modal from "../ui/Modal"
import Button from "../ui/Button"
import { Input, Textarea, Select } from "../ui/Field"
import { useApp } from "../../store/AppContext"
import services from "../../data/services.json"
import { CheckCircle2 } from "lucide-react"

export default function QuoteRequestModal({ open, onClose, company }) {
  const { addQuoteRequest, user } = useApp()
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: "",
    service: "",
    budget: "",
    message: "",
  })

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }))

  const handleSubmit = (e) => {
    e.preventDefault()
    addQuoteRequest({
      companyId: company.id,
      companyName: company.name,
      ...form,
    })
    setSubmitted(true)
  }

  const handleClose = () => {
    setSubmitted(false)
    onClose()
  }

  return (
    <Modal open={open} onClose={handleClose} title={submitted ? "" : `Request a quote from ${company.name}`}>
      {submitted ? (
        <div className="flex flex-col items-center py-6 text-center">
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-accent/15">
            <CheckCircle2 className="h-9 w-9 text-accent" />
          </div>
          <h3 className="font-serif text-2xl font-semibold">Request sent</h3>
          <p className="mt-2 max-w-sm text-muted-foreground">
            {company.name} will get back to you shortly. You can track this request from your profile.
          </p>
          <Button className="mt-6" onClick={handleClose}>
            Done
          </Button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <Input label="Full name" required value={form.name} onChange={set("name")} placeholder="Jane Doe" />
            <Input
              label="Email"
              type="email"
              required
              value={form.email}
              onChange={set("email")}
              placeholder="jane@email.com"
            />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <Input label="Phone" value={form.phone} onChange={set("phone")} placeholder="+1 555 000 0000" />
            <Select label="Service needed" value={form.service} onChange={set("service")} required>
              <option value="">Select a service</option>
              {services.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </Select>
          </div>
          <Select label="Estimated budget" value={form.budget} onChange={set("budget")}>
            <option value="">Select a range</option>
            <option value="Under $50k">Under $50k</option>
            <option value="$50k - $150k">$50k - $150k</option>
            <option value="$150k - $500k">$150k - $500k</option>
            <option value="$500k+">$500k+</option>
          </Select>
          <Textarea
            label="Project details"
            required
            rows={4}
            value={form.message}
            onChange={set("message")}
            placeholder="Tell us about your project, timeline, and goals..."
          />
          <div className="flex justify-end gap-3 pt-2">
            <Button type="button" variant="ghost" onClick={handleClose}>
              Cancel
            </Button>
            <Button type="submit">Send request</Button>
          </div>
        </form>
      )}
    </Modal>
  )
}
