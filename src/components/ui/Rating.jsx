import { Star } from "lucide-react"
import { cn } from "../../lib/utils"

export default function Rating({ value, reviews, size = 16, showValue = true, className }) {
  return (
    <div className={cn("inline-flex items-center gap-1.5", className)}>
      <Star size={size} className="fill-accent text-accent" />
      {showValue && <span className="font-semibold text-foreground">{value.toFixed(1)}</span>}
      {reviews != null && <span className="text-sm text-muted-foreground">({reviews})</span>}
    </div>
  )
}
