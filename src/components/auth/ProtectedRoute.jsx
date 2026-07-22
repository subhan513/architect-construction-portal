import { Navigate, useLocation } from "react-router-dom"
import { useApp } from "../../store/AppContext"

export default function ProtectedRoute({ role, children }) {
  const { account } = useApp()
  const location = useLocation()

  if (!account) {
    return <Navigate to="/login" state={{ from: location.pathname }} replace />
  }

  if (role && account.role !== role) {
    // Signed in but wrong role — send to their own dashboard.
    return <Navigate to={account.role === "company" ? "/dashboard" : "/account"} replace />
  }

  return children
}
