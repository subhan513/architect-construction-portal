import { CheckCircle2 } from "lucide-react"
import { motion } from "framer-motion"
import Modal from "./Modal"
import Button from "./Button"

export default function SuccessPopup({ open, onClose, title, message, actionLabel = "Done", onAction }) {
  return (
    <Modal open={open} onClose={onClose} maxWidth="max-w-sm">
      <div className="flex flex-col items-center text-center">
        <motion.span
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 260, damping: 18 }}
          className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-accent/10 text-accent"
        >
          <CheckCircle2 size={34} />
        </motion.span>
        <h3 className="font-serif text-2xl text-foreground">{title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{message}</p>
        <Button onClick={onAction || onClose} variant="primary" className="mt-6 w-full">
          {actionLabel}
        </Button>
      </div>
    </Modal>
  )
}
