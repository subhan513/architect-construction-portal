import { createContext, useContext, useEffect, useMemo, useState, useCallback } from "react"
import companiesData from "../data/companies.json"
import projectsData from "../data/projects.json"
import usersData from "../data/users.json"
import { loadJSON, saveJSON } from "../lib/utils"

const AppContext = createContext(null)

const FAV_KEY = "archbuild:favourites"
const COMPANIES_KEY = "archbuild:companies"
const PROJECTS_KEY = "archbuild:projects"
const USER_KEY = "archbuild:user"
const QUOTES_KEY = "archbuild:quotes"

export function AppProvider({ children }) {
  // Companies & projects seed from JSON, but stay editable in local state (+ persisted)
  const [companies, setCompanies] = useState(() => loadJSON(COMPANIES_KEY, companiesData))
  const [projects, setProjects] = useState(() => loadJSON(PROJECTS_KEY, projectsData))
  const [favourites, setFavourites] = useState(() => loadJSON(FAV_KEY, usersData[0].favourites))
  const [user, setUser] = useState(() => loadJSON(USER_KEY, usersData[0]))
  const [quotes, setQuotes] = useState(() => loadJSON(QUOTES_KEY, usersData[0].quoteRequests))

  useEffect(() => saveJSON(COMPANIES_KEY, companies), [companies])
  useEffect(() => saveJSON(PROJECTS_KEY, projects), [projects])
  useEffect(() => saveJSON(FAV_KEY, favourites), [favourites])
  useEffect(() => saveJSON(USER_KEY, user), [user])
  useEffect(() => saveJSON(QUOTES_KEY, quotes), [quotes])

  const toggleFavourite = useCallback((companyId) => {
    setFavourites((prev) =>
      prev.includes(companyId) ? prev.filter((id) => id !== companyId) : [...prev, companyId],
    )
  }, [])

  const isFavourite = useCallback((companyId) => favourites.includes(companyId), [favourites])

  const addCompany = useCallback((company) => {
    setCompanies((prev) => [company, ...prev])
  }, [])

  const updateCompany = useCallback((id, updates) => {
    setCompanies((prev) => prev.map((c) => (c.id === id ? { ...c, ...updates } : c)))
  }, [])

  const addProject = useCallback((project) => {
    setProjects((prev) => [project, ...prev])
  }, [])

  const updateProject = useCallback((id, updates) => {
    setProjects((prev) => prev.map((p) => (p.id === id ? { ...p, ...updates } : p)))
  }, [])

  const deleteProject = useCallback((id) => {
    setProjects((prev) => prev.filter((p) => p.id !== id))
  }, [])

  const addQuote = useCallback((quote) => {
    const record = { id: "q" + Date.now(), status: "Submitted", date: new Date().toISOString().slice(0, 10), ...quote }
    setQuotes((prev) => [record, ...prev])
    return record
  }, [])

  const updateUser = useCallback((updates) => {
    setUser((prev) => ({ ...prev, ...updates }))
  }, [])

  const getCompany = useCallback((id) => companies.find((c) => c.id === id), [companies])

  const value = useMemo(
    () => ({
      companies,
      projects,
      favourites,
      quotes,
      user,
      toggleFavourite,
      isFavourite,
      addCompany,
      updateCompany,
      addProject,
      updateProject,
      deleteProject,
      addQuote,
      updateUser,
      getCompany,
    }),
    [
      companies,
      projects,
      favourites,
      quotes,
      user,
      toggleFavourite,
      isFavourite,
      addCompany,
      updateCompany,
      addProject,
      updateProject,
      deleteProject,
      addQuote,
      updateUser,
      getCompany,
    ],
  )

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export function useApp() {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error("useApp must be used within AppProvider")
  return ctx
}
