import { useParams, useNavigate, Link } from "react-router-dom"
import { useApp } from "../store/AppContext"
import CompanyForm from "../components/company/CompanyForm"
import { Container } from "../components/ui/Section"

export default function EditCompany() {
  const { id } = useParams()
  const { getCompany, updateCompany } = useApp()
  const navigate = useNavigate()
  const company = getCompany(id)

  if (!company) {
    return (
      <Container className="py-24 text-center">
        <h1 className="font-serif text-3xl font-semibold">Company not found</h1>
        <Link to="/companies" className="mt-4 inline-block text-accent hover:underline">
          Back to directory
        </Link>
      </Container>
    )
  }

  const handleSubmit = (data) => {
    updateCompany(id, data)
    navigate(`/companies/${id}`)
  }

  return (
    <Container className="max-w-3xl py-12">
      <div className="mb-8">
        <p className="text-sm font-medium uppercase tracking-wide text-accent">Manage listing</p>
        <h1 className="mt-1 font-serif text-3xl font-semibold text-foreground md:text-4xl">Edit {company.name}</h1>
        <p className="mt-2 text-muted-foreground">Update your details, services, and portfolio media.</p>
      </div>
      <div className="rounded-2xl border border-border bg-card p-6 md:p-8">
        <CompanyForm initial={company} onSubmit={handleSubmit} submitLabel="Save changes" />
      </div>
    </Container>
  )
}
