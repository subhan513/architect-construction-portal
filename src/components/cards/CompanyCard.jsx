import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import { MapPin } from "lucide-react"
import Rating from "../ui/Rating"
import Badge from "../ui/Badge"
import FavouriteButton from "../ui/FavouriteButton"
import servicesData from "../../data/services.json"

const serviceName = (id) => servicesData.find((s) => s.id === id)?.name || id

export default function CompanyCard({ company }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.4 }}
      className="group overflow-hidden rounded-3xl border border-border bg-card transition-shadow duration-300 hover:shadow-xl"
    >
      <Link to={`/companies/${company.id}`} className="block">
        <div className="relative aspect-[16/10] overflow-hidden">
          <img
            src={company.cover || "/placeholder.svg"}
            alt={`${company.name} cover`}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
          <div className="absolute right-3 top-3">
            <FavouriteButton companyId={company.id} />
          </div>
          <div className="absolute left-3 top-3">
            <Badge tone="dark">{company.type}</Badge>
          </div>
        </div>
      </Link>

      <div className="p-5">
        <div className="flex items-start gap-3">
          <img
            src={company.logo || "/placeholder.svg"}
            alt={`${company.name} logo`}
            className="h-11 w-11 shrink-0 rounded-xl border border-border object-cover"
            loading="lazy"
          />
          <div className="min-w-0 flex-1">
            <Link to={`/companies/${company.id}`}>
              <h3 className="truncate font-serif text-lg font-semibold text-foreground transition-colors group-hover:text-accent">
                {company.name}
              </h3>
            </Link>
            <div className="mt-0.5 flex items-center gap-1 text-sm text-muted-foreground">
              <MapPin size={14} />
              <span className="truncate">{company.location}</span>
            </div>
          </div>
          <Rating value={company.rating} showValue size={15} />
        </div>

        <div className="mt-4 flex flex-wrap gap-1.5">
          {company.services.slice(0, 3).map((s) => (
            <Badge key={s} tone="neutral">
              {serviceName(s)}
            </Badge>
          ))}
          {company.services.length > 3 && <Badge tone="outline">+{company.services.length - 3}</Badge>}
        </div>

        <Link
          to={`/companies/${company.id}`}
          className="mt-5 inline-flex w-full items-center justify-center rounded-full border border-border py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-muted"
        >
          View profile
        </Link>
      </div>
    </motion.div>
  )
}
