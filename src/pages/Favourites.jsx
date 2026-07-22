import { Link } from "react-router-dom"
import { useApp } from "../store/AppContext"
import CompanyCard from "../components/cards/CompanyCard"
import Button from "../components/ui/Button"
import { Container, EmptyState } from "../components/ui/Section"
import { Heart } from "lucide-react"

export default function Favourites() {
  const { companies, favourites } = useApp()
  const saved = companies.filter((c) => favourites.includes(c.id))

  return (
    <div className="py-12">
      <Container>
        <div className="mb-8">
          <p className="text-sm font-medium uppercase tracking-wide text-accent">Saved</p>
          <h1 className="mt-1 font-serif text-3xl font-semibold text-foreground md:text-4xl">Your favourites</h1>
          <p className="mt-2 text-muted-foreground">
            {saved.length} {saved.length === 1 ? "company" : "companies"} saved for later.
          </p>
        </div>

        {saved.length ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {saved.map((c) => (
              <CompanyCard key={c.id} company={c} />
            ))}
          </div>
        ) : (
          <EmptyState
            icon={Heart}
            title="No favourites yet"
            description="Browse the directory and tap the heart on companies you love to save them here."
            action={
              <Link to="/companies">
                <Button>Browse companies</Button>
              </Link>
            }
          />
        )}
      </Container>
    </div>
  )
}
