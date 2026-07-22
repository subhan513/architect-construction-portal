import Rating from "../ui/Rating"

export default function Reviews({ reviews = [], rating, reviewCount }) {
  const dist = [5, 4, 3, 2, 1].map((star) => ({
    star,
    count: reviews.filter((r) => Math.round(r.rating) === star).length,
  }))
  const total = reviews.length || 1

  return (
    <div className="grid gap-8 md:grid-cols-[280px_1fr]">
      <div className="rounded-2xl border border-border bg-card p-6">
        <div className="text-center">
          <div className="font-serif text-5xl font-semibold text-foreground">{rating?.toFixed(1)}</div>
          <div className="mt-2 flex justify-center">
            <Rating value={rating} />
          </div>
          <p className="mt-1 text-sm text-muted-foreground">Based on {reviewCount} reviews</p>
        </div>
        <div className="mt-6 space-y-2">
          {dist.map(({ star, count }) => (
            <div key={star} className="flex items-center gap-2 text-sm">
              <span className="w-3 text-muted-foreground">{star}</span>
              <div className="h-2 flex-1 overflow-hidden rounded-full bg-muted">
                <div className="h-full rounded-full bg-accent" style={{ width: `${(count / total) * 100}%` }} />
              </div>
              <span className="w-6 text-right text-muted-foreground">{count}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-5">
        {reviews.map((r) => (
          <div key={r.id} className="rounded-2xl border border-border bg-card p-6">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-secondary font-semibold text-secondary-foreground">
                {r.author.charAt(0)}
              </div>
              <div>
                <div className="font-medium text-foreground">{r.author}</div>
                <div className="text-xs text-muted-foreground">{r.date}</div>
              </div>
              <div className="ml-auto">
                <Rating value={r.rating} size={14} />
              </div>
            </div>
            <p className="mt-4 leading-relaxed text-muted-foreground">{r.comment}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
