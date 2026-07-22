import { useState } from "react"
import { X, ChevronLeft, ChevronRight } from "lucide-react"

export default function Gallery({ images = [] }) {
  const [active, setActive] = useState(null)

  if (!images.length) return null

  const show = (i) => setActive(i)
  const close = () => setActive(null)
  const prev = (e) => {
    e.stopPropagation()
    setActive((a) => (a - 1 + images.length) % images.length)
  }
  const next = (e) => {
    e.stopPropagation()
    setActive((a) => (a + 1) % images.length)
  }

  return (
    <>
      <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
        {images.map((src, i) => (
          <button
            key={i}
            onClick={() => show(i)}
            className={`group relative overflow-hidden rounded-xl bg-muted ${
              i === 0 ? "col-span-2 row-span-2 md:col-span-2" : ""
            }`}
          >
            <img
              src={src || "/placeholder.svg"}
              alt={`Gallery image ${i + 1}`}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              style={{ aspectRatio: i === 0 ? "16/11" : "4/3" }}
            />
            <span className="absolute inset-0 bg-foreground/0 transition-colors group-hover:bg-foreground/10" />
          </button>
        ))}
      </div>

      {active !== null && (
        <div
          className="fixed inset-0 z-[1200] flex items-center justify-center bg-foreground/90 p-4 animate-fade-in"
          onClick={close}
          role="dialog"
          aria-modal="true"
        >
          <button
            onClick={close}
            className="absolute right-5 top-5 rounded-full bg-background/10 p-2 text-background transition hover:bg-background/20"
            aria-label="Close gallery"
          >
            <X className="h-6 w-6" />
          </button>
          <button
            onClick={prev}
            className="absolute left-4 rounded-full bg-background/10 p-3 text-background transition hover:bg-background/20"
            aria-label="Previous image"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <img
            src={images[active] || "/placeholder.svg"}
            alt={`Gallery image ${active + 1}`}
            className="max-h-[85vh] max-w-full rounded-lg object-contain"
            onClick={(e) => e.stopPropagation()}
          />
          <button
            onClick={next}
            className="absolute right-4 rounded-full bg-background/10 p-3 text-background transition hover:bg-background/20"
            aria-label="Next image"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
          <span className="absolute bottom-5 left-1/2 -translate-x-1/2 rounded-full bg-background/10 px-4 py-1 text-sm text-background">
            {active + 1} / {images.length}
          </span>
        </div>
      )}
    </>
  )
}
