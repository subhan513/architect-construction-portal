import { useState } from "react"
import { Link } from "react-router-dom"
import AuthShell from "../../components/auth/AuthShell"
import { Input, Label } from "../../components/ui/Field"
import Button from "../../components/ui/Button"
import { MailCheck } from "lucide-react"

export default function ForgotPassword() {
  const [email, setEmail] = useState("")
  const [sent, setSent] = useState(false)

  return (
    <AuthShell
      title={sent ? "Check your inbox" : "Reset password"}
      subtitle={sent ? undefined : "We'll send you a link to reset your password"}
      footer={
        <Link to="/login" className="font-medium text-accent hover:underline">
          Back to sign in
        </Link>
      }
    >
      {sent ? (
        <div className="flex flex-col items-center text-center">
          <span className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-accent/10 text-accent">
            <MailCheck size={32} />
          </span>
          <p className="text-sm leading-relaxed text-muted-foreground">
            If an account exists for <span className="font-medium text-foreground">{email}</span>, a reset link is on
            its way.
          </p>
        </div>
      ) : (
        <form
          onSubmit={(e) => {
            e.preventDefault()
            setSent(true)
          }}
          className="space-y-4"
        >
          <div>
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@email.com" />
          </div>
          <Button type="submit" className="w-full">
            Send reset link
          </Button>
        </form>
      )}
    </AuthShell>
  )
}
