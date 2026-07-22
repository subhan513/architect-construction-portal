import { motion } from "framer-motion"
import { MapPin, Calendar } from "lucide-react"
import Badge from "../ui/Badge"
import citiesData from "../../data/cities.json"

const cityName = (id) => citiesData.find((c) => c.id === id)?.name || id

export default function ProjectCard({ project, actions }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.4 }}
      className="group overflow-hidden rounded-3xl border border-border bg-card transition-shadow duration-300 hover:shadow-xl"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={project.image || "/placeholder.svg"}
          alt={project.name}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute left-3 top-3">
          <Badge tone="dark">{project.category}</Badge>
        </div>
      </div>
      <div className="p-5">
        <h3 className="font-serif text-lg font-semibold text-foreground">{project.name}</h3>
        <div className="mt-1.5 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground">
          <span className="inline-flex items-center gap-1">
            <MapPin size={14} /> {cityName(project.city)}
          </span>
          <span className="inline-flex items-center gap-1">
            <Calendar size={14} /> {project.year}
          </span>
        </div>
        {project.description && (
          <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-muted-foreground">{project.description}</p>
        )}
        {actions && <div className="mt-4 flex gap-2">{actions}</div>}
      </div>
    </motion.div>
  )
}
