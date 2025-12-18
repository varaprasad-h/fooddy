export const FRONTEND_URL = import.meta.env.VITE_FRONTEND_URL || window.location.origin

export const route = (path = '/') => {
  const p = path.startsWith('/') ? path : `/${path}`
  const base = FRONTEND_URL.replace(/\/+$/, '')
  return `${base}${p}`
}

export const goto = (navigate, path, options) => {
  const url = route(path)
  try {
    const u = new URL(url)
    if (u.origin === window.location.origin) {
      return navigate(u.pathname + u.search + u.hash, options)
    }
  } catch {}
  window.location.href = url
}

