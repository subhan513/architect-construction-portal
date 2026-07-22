import { Heart } from "lucide-react"
import { motion } from "framer-motion"
import { useApp } from "../../store/AppContext"
import { cn } from "../../lib/utils"

export default function FavouriteButton({ companyId, className, size = 18 }) {
  const { isFavourite, toggleFavourite } = useApp()
  const active = isFavourite(companyId)

  return (
    <motion.button
      type="button"
      whileTap={{ scale: 0.85 }}
      onClick={(e) => {
        e.preventDefault()
        e.stopPropagation()
        toggleFavourite(companyId)
      }}
      aria-pressed={active}
      aria-label={active ? "Remove from favourites" : "Add to favourites"}
      className={cn(
        "inline-flex items-center justify-center rounded-full backdrop-blur transition-colors",
        "h-10 w-10 border border-white/40 bg-white/80 hover:bg-white",
        className,
      )}
    >
      <Heart
        size={size}
        className={cn("transition-colors", active ? "fill-accent text-accent" : "text-primary")}
      />
    </motion.button>
  )
}
