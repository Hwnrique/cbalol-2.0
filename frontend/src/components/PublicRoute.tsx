import { Navigate } from "react-router-dom"
import { useAuth } from "../contexts/AuthContext"

const PublicRoute = ({ children }: { children: React.ReactNode }) => {
  const { token } = useAuth()

  if (token) {
    return <Navigate to="/" replace />
  }

  return children
}

export default PublicRoute