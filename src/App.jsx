import { Routes, Route } from "react-router-dom"
import Layout from "./components/layout/Layout"
import Landing from "./pages/Landing"
import Companies from "./pages/Companies"
import CompanyDetail from "./pages/CompanyDetail"
import CreateCompany from "./pages/CreateCompany"
import EditCompany from "./pages/EditCompany"
import Projects from "./pages/Projects"
import Profile from "./pages/Profile"
import Favourites from "./pages/Favourites"

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Landing />} />
        <Route path="/companies" element={<Companies />} />
        <Route path="/companies/:id" element={<CompanyDetail />} />
        <Route path="/create-company" element={<CreateCompany />} />
        <Route path="/companies/:id/edit" element={<EditCompany />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/favourites" element={<Favourites />} />
      </Route>
    </Routes>
  )
}
