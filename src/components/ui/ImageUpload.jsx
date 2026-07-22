import { useRef } from "react"
import { UploadCloud, X, ImageIcon } from "lucide-react"
import { cn } from "../../lib/utils"

// Reads files locally into data URLs (no backend). Supports single or multiple.
export default function ImageUpload({ value, onChange, multiple = false, aspect = "aspect-video", label }) {
  const inputRef = useRef(null)
  const values = multiple ? value || [] : value ? [value] : []

  const handleFiles = (files) => {
    const readers = Array.from(files).map(
      (file) =>
        new Promise((resolve) => {
          const reader = new FileReader()
          reader.onload = () => resolve(reader.result)
          reader.readAsDataURL(file)
        }),
    )
    Promise.all(readers).then((results) => {
      if (multiple) onChange([...(value || []), ...results])
      else onChange(results[0])
    })
  }

  const removeAt = (idx) => {
    if (multiple) onChange((value || []).filter((_, i) => i !== idx))
    else onChange("")
  }

  return (
    <div>
      <div className={cn("grid gap-3", multiple ? "grid-cols-2 sm:grid-cols-3" : "grid-cols-1")}>
        {values.map((src, idx) => (
          <div key={idx} className={cn("group relative overflow-hidden rounded-2xl border border-border", aspect)}>
            <img src={src || "/placeholder.svg"} alt="Upload preview" className="h-full w-full object-cover" />
            <button
              type="button"
              onClick={() => removeAt(idx)}
              className="absolute right-2 top-2 inline-flex h-8 w-8 items-center justify-center rounded-full bg-primary/70 text-primary-foreground opacity-0 transition-opacity group-hover:opacity-100"
              aria-label="Remove image"
            >
              <X size={15} />
            </button>
          </div>
        ))}

        {(multiple || values.length === 0) && (
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            className={cn(
              "flex flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-border bg-muted/40 text-muted-foreground transition-colors hover:border-ring hover:bg-muted",
              aspect,
            )}
          >
            {multiple ? <ImageIcon size={22} /> : <UploadCloud size={22} />}
            <span className="text-xs font-medium">{label || "Upload image"}</span>
          </button>
        )}
      </div>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        multiple={multiple}
        className="hidden"
        onChange={(e) => e.target.files && handleFiles(e.target.files)}
      />
    </div>
  )
}
