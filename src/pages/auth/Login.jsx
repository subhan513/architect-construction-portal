import { useState } from "react"
import { Link, useNavigate, useLocation } from "react-router-dom"
import { useApp } from "../../store/AppContext"
import { useToast } from "../../store/ToastContext"
import AuthShell, { RoleToggle } from "../../components/auth/AuthShell"
import { Input, Label } from "../../components/ui/Field"
import Button from "../../components/ui/Button"
import { AlertTriangle } from "lucide-react"

export default function Login() {
  const { login } = useApp()
  const { toast } = useToast()
  const navigate = useNavigate()
  const location = useLocation()
  const [role, setRole] = useState("user")
  const [form, setForm] = useState({ email: "", password: "", remember: true })
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.type === "checkbox" ? e.target.checked : e.target.value }))

  const handleSubmit = (e) => {
    e.preventDefault()
    setError("")
    setLoading(true)
    // Simulate a short network round-trip for a realistic feel.
    setTimeout(() => {
      const res = login({ email: form.email, password: form.password, role })
      setLoading(false)
      if (!res.ok) {
        setError(res.error)
        return
      }
      toast(`Welcome back, ${res.account.name.split(" ")[0]}!`, { title: "Signed in" })
      const dest = location.state?.from || (res.account.role === "company" ? "/dashboard" : "/account")
      navigate(dest, { replace: true })
    }, 500)
  }

  const useDemo = () => {
    setForm({ email: role === "company" ? "company@demo.com" : "user@demo.com", password: "demo1234", remember: true })
  }

  return (
    <AuthShell
      title="Welcome back"
      subtitle="Sign in to manage your listings and requests"
      footer={
        <>
          New to ArchBuild?{" "}
          <Link to="/signup" className="font-medium text-accent hover:underline">
            Create an account
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
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" required value={form.email} onChange={set("email")} placeholder="you@email.com" />
        </div>
        <div>
          <div className="mb-1.5 flex items-center justify-between">
            <Label htmlFor="password" className="mb-0">
              Password
            </Label>
            <Link to="/forgot-password" className="text-xs font-medium text-accent hover:underline">
              Forgot password?
            </Link>
          </div>
          <Input id="password" type="password" required value={form.password} onChange={set("password")} placeholder="••••••••" />
        </div>
        <label className="flex items-center gap-2 text-sm text-muted-foreground">
          <input
            type="checkbox"
            checked={form.remember}
            onChange={set("remember")}
            className="h-4 w-4 rounded border-input accent-accent"
          />
          Remember me
        </label>
        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? "Signing in…" : "Sign in"}
        </Button>
      </form>

      <button
        type="button"
        onClick={useDemo}
        className="mt-4 w-full rounded-xl border border-dashed border-border py-2.5 text-xs font-medium text-muted-foreground transition-colors hover:bg-muted"
      >
        Use demo {role === "company" ? "firm" : "client"} account
      </button>
    </AuthShell>
  )
}
