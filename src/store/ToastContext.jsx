import { createContext, useContext, useCallback, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { CheckCircle2, Info, AlertTriangle, X } from "lucide-react"

const ToastContext = createContext(null)

const icons = {
  success: CheckCircle2,
  info: Info,
  error: AlertTriangle,
}

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([])

  const dismiss = useCallback((id) => setToasts((prev) => prev.filter((t) => t.id !== id)), [])

  const toast = useCallback(
    (message, opts = {}) => {
      const id = "t" + Date.now() + Math.random().toString(36).slice(2, 6)
      const type = opts.type || "success"
      setToasts((prev) => [...prev, { id, message, type, title: opts.title }])
      setTimeout(() => dismiss(id), opts.duration || 3200)
    },
    [dismiss],
  )

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      <div className="pointer-events-none fixed inset-x-0 bottom-4 z-[100] flex flex-col items-center gap-2 px-4 sm:bottom-6">
        <AnimatePresence>
          {toasts.map((t) => {
            const Icon = icons[t.type] || Info
            return (
              <motion.div
                key={t.id}
                layout
                initial={{ opacity: 0, y: 24, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 12, scale: 0.96 }}
                transition={{ type: "spring", stiffness: 320, damping: 26 }}
                className="pointer-events-auto flex w-full max-w-sm items-start gap-3 rounded-2xl border border-border bg-card p-4 shadow-xl"
                role="status"
              >
                <span
                  className={
                    "mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full " +
                    (t.type === "error" ? "bg-red-100 text-red-600" : "bg-accent/15 text-accent")
                  }
                >
                  <Icon size={15} />
                </span>
                <div className="min-w-0 flex-1">
                  {t.title && <p className="text-sm font-semibold text-foreground">{t.title}</p>}
                  <p className="text-sm leading-relaxed text-muted-foreground">{t.message}</p>
                </div>
                <button
                  onClick={() => dismiss(t.id)}
                  aria-label="Dismiss"
                  className="inline-flex h-6 w-6 items-center justify-center rounded-full text-muted-foreground hover:bg-muted"
                >
                  <X size={14} />
                </button>
              </motion.div>
            )
          })}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  )
}

export function useToast() {
  const ctx = useContext(ToastContext)
  if (!ctx) throw new Error("useToast must be used within ToastProvider")
  return ctx
}
