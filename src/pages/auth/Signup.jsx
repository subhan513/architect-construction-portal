import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useApp } from "../../store/AppContext"
import { useToast } from "../../store/ToastContext"
import AuthShell, { RoleToggle } from "../../components/auth/AuthShell"
import { Input, Label } from "../../components/ui/Field"
import Button from "../../components/ui/Button"
import { AlertTriangle, Check } from "lucide-react"

export default function Signup() {
  const { signup } = useApp()
  const { toast } = useToast()
  const navigate = useNavigate()
  const [role, setRole] = useState("user")
  const [form, setForm] = useState({ name: "", email: "", password: "", confirm: "" })
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }))

  const handleSubmit = (e) => {
    e.preventDefault()
    setError("")
    if (form.password.length < 6) return setError("Password must be at least 6 characters.")
    if (form.password !== form.confirm) return setError("Passwords do not match.")
    setLoading(true)
    setTimeout(() => {
      const res = signup({ name: form.name, email: form.email, password: form.password, role })
      setLoading(false)
      if (!res.ok) return setError(res.error)
      toast("Your account is ready.", { title: "Welcome to ArchBuild" })
      navigate(role === "company" ? "/dashboard/profile" : "/account", { replace: true })
    }, 600)
  }

  return (
    <AuthShell
      title="Create your account"
      subtitle={role === "company" ? "List your firm and start receiving requests" : "Save firms and request quotes"}
      footer={
        <>
          Already have an account?{" "}
          <Link to="/login" className="font-medium text-accent hover:underline">
            Sign in
          </Link>
        </>
      }
    >
      <RoleToggle value={role} onChange={setRole} />

      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <div className="flex items-center gap-2 rounded-xl bg-red-50 px-3 py-2.5 text-sm text-red-700">
            <AlertTriangle size={16} /> {error}
          </div>
        )}
        <div>
          <Label htmlFor="name">{role === "company" ? "Company name" : "Full name"}</Label>
          <Input id="name" required value={form.name} onChange={set("name")} placeholder={role === "company" ? "Atlas Studio" : "Jane Doe"} />
        </div>
        <div>
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" required value={form.email} onChange={set("email")} placeholder="you@email.com" />
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" required value={form.password} onChange={set("password")} placeholder="••••••••" />
          </div>
          <div>
            <Label htmlFor="confirm">Confirm</Label>
            <Input id="confirm" type="password" required value={form.confirm} onChange={set("confirm")} placeholder="••••••••" />
          </div>
        </div>
        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? "Creating account…" : "Create account"}
        </Button>
      </form>

      <ul className="mt-5 space-y-1.5 text-xs text-muted-foreground">
        {["Free to get started", "No credit card required", "Cancel anytime"].map((t) => (
          <li key={t} className="flex items-center gap-2">
            <Check size={14} className="text-accent" /> {t}
          </li>
        ))}
      </ul>
    </AuthShell>
  )
}
