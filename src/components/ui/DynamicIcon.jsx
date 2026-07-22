import * as Icons from "lucide-react"

// Renders a lucide icon by name string; falls back to a dot.
export default function DynamicIcon({ name, ...props }) {
  const Cmp = Icons[name] || Icons.Circle
  return <Cmp {...props} />
}
