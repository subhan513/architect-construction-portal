import { createContext, useContext, useEffect, useMemo, useState, useCallback } from "react"
import companiesData from "../data/companies.json"
import projectsData from "../data/projects.json"
import usersData from "../data/users.json"
import servicesData from "../data/services.json"
import { loadJSON, saveJSON } from "../lib/utils"

const AppContext = createContext(null)

const FAV_KEY = "archbuild:favourites"
const COMPANIES_KEY = "archbuild:companies"
const PROJECTS_KEY = "archbuild:projects"
const USER_KEY = "archbuild:user"
const QUOTES_KEY = "archbuild:quotes"
const ACCOUNTS_KEY = "archbuild:accounts"
const SESSION_KEY = "archbuild:session"
const SERVICES_KEY = "archbuild:company-services"
const NOTIF_KEY = "archbuild:notifications"
const VIEWED_KEY = "archbuild:viewed"

const serviceName = (id) => servicesData.find((s) => s.id === id)?.name || id

/* ---- Seed helpers ---------------------------------------------------- */

// Give existing seed companies an owner so the demo company account has
// something to manage, plus default status + dummy view counts.
function seedCompanies() {
  return companiesData.map((c, i) => ({
    ...c,
    status: c.status || "published",
    ownerId: ["atelier-nord", "casa-verde"].includes(c.id) ? "acc-company" : c.ownerId || null,
    views: c.views ?? 400 + i * 137,
    saves: c.saves ?? 20 + i * 9,
    plan: c.plan || (c.featured ? "premium" : "free"),
  }))
}

function seedProjects() {
  const statuses = ["published", "published", "completed", "under-construction", "published", "draft"]
  return projectsData.map((p, i) => ({ ...p, status: p.status || statuses[i % statuses.length] }))
}

function seedServices() {
  // Map each company's service-id array into editable service objects.
  const map = {}
  companiesData.forEach((c) => {
    map[c.id] = (c.services || []).map((sid, i) => ({
      id: `${c.id}-svc-${i}`,
      category: sid,
      title: serviceName(sid),
      description: `Professional ${serviceName(sid).toLowerCase()} services tailored to your project.`,
      status: i < 3 ? "live" : "draft",
    }))
  })
  return map
}

function seedAccounts() {
  return [
    {
      id: "acc-company",
      role: "company",
      name: "Atelier Nord",
      email: "company@demo.com",
      password: "demo1234",
      companyIds: ["atelier-nord", "casa-verde"],
    },
    {
      id: "acc-user",
      role: "user",
      name: usersData[0].name,
      email: "user@demo.com",
      password: "demo1234",
      avatar: usersData[0].avatar,
      city: usersData[0].city,
    },
  ]
}

function seedNotifications() {
  return [
    { id: "n1", type: "profile", title: "Complete your profile", body: "Your company profile is 80% complete.", date: "2024-05-14", read: false },
    { id: "n2", type: "quote", title: "New quote request", body: "Ayesha requested a quote for a Villa project.", date: "2024-05-13", read: false },
    { id: "n3", type: "publish", title: "Project published", body: "\u201cThe Dune House\u201d is now live on your profile.", date: "2024-05-11", read: true },
  ]
}

export function AppProvider({ children }) {
  const [companies, setCompanies] = useState(() => loadJSON(COMPANIES_KEY, seedCompanies()))
  const [projects, setProjects] = useState(() => loadJSON(PROJECTS_KEY, seedProjects()))
  const [favourites, setFavourites] = useState(() => loadJSON(FAV_KEY, usersData[0].favourites))
  const [user, setUser] = useState(() => loadJSON(USER_KEY, usersData[0]))
  const [quotes, setQuotes] = useState(() => loadJSON(QUOTES_KEY, usersData[0].quoteRequests))
  const [accounts, setAccounts] = useState(() => loadJSON(ACCOUNTS_KEY, seedAccounts()))
  const [session, setSession] = useState(() => loadJSON(SESSION_KEY, null))
  const [companyServices, setCompanyServices] = useState(() => loadJSON(SERVICES_KEY, seedServices()))
  const [notifications, setNotifications] = useState(() => loadJSON(NOTIF_KEY, seedNotifications()))
  const [viewed, setViewed] = useState(() => loadJSON(VIEWED_KEY, []))

  useEffect(() => saveJSON(COMPANIES_KEY, companies), [companies])
  useEffect(() => saveJSON(PROJECTS_KEY, projects), [projects])
  useEffect(() => saveJSON(FAV_KEY, favourites), [favourites])
  useEffect(() => saveJSON(USER_KEY, user), [user])
  useEffect(() => saveJSON(QUOTES_KEY, quotes), [quotes])
  useEffect(() => saveJSON(ACCOUNTS_KEY, accounts), [accounts])
  useEffect(() => saveJSON(SESSION_KEY, session), [session])
  useEffect(() => saveJSON(SERVICES_KEY, companyServices), [companyServices])
  useEffect(() => saveJSON(NOTIF_KEY, notifications), [notifications])
  useEffect(() => saveJSON(VIEWED_KEY, viewed), [viewed])

  /* ---- Auth (mock) --------------------------------------------------- */

  const account = useMemo(
    () => (session ? accounts.find((a) => a.id === session.id) || null : null),
    [session, accounts],
  )

  const login = useCallback(
    ({ email, password, role }) => {
      const found = accounts.find(
        (a) => a.email.toLowerCase() === String(email).toLowerCase().trim() && (!role || a.role === role),
      )
      if (!found) return { ok: false, error: "No account found with those details." }
      if (found.password && password && found.password !== password) {
        return { ok: false, error: "Incorrect password." }
      }
      setSession({ id: found.id, role: found.role })
      return { ok: true, account: found }
    },
    [accounts],
  )

  const signup = useCallback(
    ({ name, email, password, role }) => {
      const exists = accounts.find((a) => a.email.toLowerCase() === String(email).toLowerCase().trim())
      if (exists) return { ok: false, error: "An account with this email already exists." }
      const id = "acc-" + Date.now()
      const newAccount = { id, role, name, email: String(email).trim(), password, companyIds: [] }
      setAccounts((prev) => [...prev, newAccount])
      setSession({ id, role })
      return { ok: true, account: newAccount }
    },
    [accounts],
  )

  const logout = useCallback(() => setSession(null), [])

  const updateAccount = useCallback(
    (updates) => {
      if (!account) return
      setAccounts((prev) => prev.map((a) => (a.id === account.id ? { ...a, ...updates } : a)))
    },
    [account],
  )

  /* ---- Favourites ---------------------------------------------------- */

  const toggleFavourite = useCallback((companyId) => {
    setFavourites((prev) =>
      prev.includes(companyId) ? prev.filter((id) => id !== companyId) : [...prev, companyId],
    )
  }, [])

  const isFavourite = useCallback((companyId) => favourites.includes(companyId), [favourites])

  /* ---- Companies ----------------------------------------------------- */

  const addCompany = useCallback(
    (company) => {
      const id = company.id || (company.name ? slug(company.name) : "company") + "-" + Date.now().toString(36)
      const record = {
        id,
        status: "draft",
        ownerId: account?.id || null,
        views: 0,
        saves: 0,
        plan: "free",
        rating: 0,
        reviews: 0,
        services: [],
        expertise: [],
        gallery: [],
        projects: [],
        ...company,
      }
      setCompanies((prev) => [record, ...prev])
      if (account) updateAccount({ companyIds: [...(account.companyIds || []), id] })
      return record
    },
    [account, updateAccount],
  )

  const updateCompany = useCallback((id, updates) => {
    setCompanies((prev) => prev.map((c) => (c.id === id ? { ...c, ...updates } : c)))
  }, [])

  const setCompanyStatus = useCallback((id, status) => {
    setCompanies((prev) => prev.map((c) => (c.id === id ? { ...c, status } : c)))
  }, [])

  const getCompany = useCallback((id) => companies.find((c) => c.id === id), [companies])

  const publishedCompanies = useMemo(
    () => companies.filter((c) => c.status !== "draft" && c.status !== "archived"),
    [companies],
  )

  const getMyCompanies = useCallback(
    () => (account ? companies.filter((c) => account.companyIds?.includes(c.id) || c.ownerId === account.id) : []),
    [account, companies],
  )

  /* ---- Projects ------------------------------------------------------ */

  const addProject = useCallback((project) => {
    const record = { id: "p" + Date.now().toString(36), status: "draft", ...project }
    setProjects((prev) => [record, ...prev])
    return record
  }, [])

  const updateProject = useCallback((id, updates) => {
    setProjects((prev) => prev.map((p) => (p.id === id ? { ...p, ...updates } : p)))
  }, [])

  const deleteProject = useCallback((id) => {
    setProjects((prev) => prev.filter((p) => p.id !== id))
  }, [])

  const setProjectStatus = useCallback((id, status) => {
    setProjects((prev) => prev.map((p) => (p.id === id ? { ...p, status } : p)))
  }, [])

  const getCompanyProjects = useCallback(
    (companyId) => projects.filter((p) => p.companyId === companyId),
    [projects],
  )

  /* ---- Company services --------------------------------------------- */

  const getCompanyServices = useCallback((companyId) => companyServices[companyId] || [], [companyServices])

  const addService = useCallback((companyId, service) => {
    const record = { id: `${companyId}-svc-${Date.now().toString(36)}`, status: "draft", ...service }
    setCompanyServices((prev) => ({ ...prev, [companyId]: [record, ...(prev[companyId] || [])] }))
    return record
  }, [])

  const updateService = useCallback((companyId, serviceId, updates) => {
    setCompanyServices((prev) => ({
      ...prev,
      [companyId]: (prev[companyId] || []).map((s) => (s.id === serviceId ? { ...s, ...updates } : s)),
    }))
  }, [])

  const setServiceStatus = useCallback((companyId, serviceId, status) => {
    setCompanyServices((prev) => ({
      ...prev,
      [companyId]: (prev[companyId] || []).map((s) => (s.id === serviceId ? { ...s, status } : s)),
    }))
  }, [])

  const deleteService = useCallback((companyId, serviceId) => {
    setCompanyServices((prev) => ({
      ...prev,
      [companyId]: (prev[companyId] || []).filter((s) => s.id !== serviceId),
    }))
  }, [])

  /* ---- Quotes -------------------------------------------------------- */

  const addQuote = useCallback((quote) => {
    const record = {
      id: "q" + Date.now(),
      status: "Submitted",
      date: new Date().toISOString().slice(0, 10),
      ...quote,
    }
    setQuotes((prev) => [record, ...prev])
    return record
  }, [])

  const setQuoteStatus = useCallback((id, status) => {
    setQuotes((prev) => prev.map((q) => (q.id === id ? { ...q, status } : q)))
  }, [])

  const getReceivedQuotes = useCallback(
    (companyIds) => quotes.filter((q) => companyIds.includes(q.companyId)),
    [quotes],
  )

  /* ---- Notifications ------------------------------------------------- */

  const addNotification = useCallback((notif) => {
    const record = {
      id: "n" + Date.now(),
      date: new Date().toISOString().slice(0, 10),
      read: false,
      type: "info",
      ...notif,
    }
    setNotifications((prev) => [record, ...prev])
  }, [])

  const markNotificationRead = useCallback((id) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)))
  }, [])

  const markAllNotificationsRead = useCallback(() => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })))
  }, [])

  const unreadCount = useMemo(() => notifications.filter((n) => !n.read).length, [notifications])

  /* ---- Viewed companies --------------------------------------------- */

  const recordView = useCallback((companyId) => {
    setViewed((prev) => [companyId, ...prev.filter((id) => id !== companyId)].slice(0, 20))
    setCompanies((prev) => prev.map((c) => (c.id === companyId ? { ...c, views: (c.views || 0) + 1 } : c)))
  }, [])

  const updateUser = useCallback((updates) => {
    setUser((prev) => ({ ...prev, ...updates }))
  }, [])

  const value = useMemo(
    () => ({
      // data
      companies,
      publishedCompanies,
      projects,
      favourites,
      quotes,
      quoteRequests: quotes, // alias used by some pages
      user,
      account,
      accounts,
      isAuthenticated: !!account,
      notifications,
      unreadCount,
      viewed,
      // auth
      login,
      signup,
      logout,
      updateAccount,
      // favourites
      toggleFavourite,
      isFavourite,
      // companies
      addCompany,
      updateCompany,
      setCompanyStatus,
      getCompany,
      getMyCompanies,
      // projects
      addProject,
      updateProject,
      deleteProject,
      setProjectStatus,
      getCompanyProjects,
      // services
      getCompanyServices,
      addService,
      updateService,
      setServiceStatus,
      deleteService,
      // quotes
      addQuote,
      addQuoteRequest: addQuote, // alias used by QuoteRequestModal
      setQuoteStatus,
      getReceivedQuotes,
      // notifications
      addNotification,
      markNotificationRead,
      markAllNotificationsRead,
      // viewed
      recordView,
      // user
      updateUser,
    }),
    [
      companies,
      publishedCompanies,
      projects,
      favourites,
      quotes,
      user,
      account,
      accounts,
      notifications,
      unreadCount,
      viewed,
      login,
      signup,
      logout,
      updateAccount,
      toggleFavourite,
      isFavourite,
      addCompany,
      updateCompany,
      setCompanyStatus,
      getCompany,
      getMyCompanies,
      addProject,
      updateProject,
      deleteProject,
      setProjectStatus,
      getCompanyProjects,
      getCompanyServices,
      addService,
      updateService,
      setServiceStatus,
      deleteService,
      addQuote,
      setQuoteStatus,
      getReceivedQuotes,
      addNotification,
      markNotificationRead,
      markAllNotificationsRead,
      recordView,
      updateUser,
    ],
  )

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

function slug(str) {
  return String(str)
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
}

export function useApp() {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error("useApp must be used within AppProvider")
  return ctx
}
