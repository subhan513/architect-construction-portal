import { useNavigate } from "react-router-dom"
import { useApp } from "../store/AppContext"
import CompanyForm from "../components/company/CompanyForm"
import { Container } from "../components/ui/Section"

export default function CreateCompany() {
  const { addCompany } = useApp()
  const navigate = useNavigate()

  const handleSubmit = (data) => {
    const company = addCompany(data)
    navigate(`/companies/${company.id}`)
  }

  return (
    <Container className="max-w-3xl py-12">
      <div className="mb-8">
        <p className="text-sm font-medium uppercase tracking-wide text-accent">List your business</p>
        <h1 className="mt-1 font-serif text-3xl font-semibold text-foreground md:text-4xl">Create your company profile</h1>
        <p className="mt-2 text-muted-foreground">
          Showcase your work and get discovered by clients looking for your expertise.
        </p>
      </div>
      <div className="rounded-2xl border border-border bg-card p-6 md:p-8">
        <CompanyForm onSubmit={handleSubmit} submitLabel="Publish company" />
      </div>
    </Container>
  )
}
