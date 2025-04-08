// Get base URL from environment or use default
export const BACKEND_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000'

// Helper to get CSRF token
const getCSRFToken = (): string => {
  // First try to get from cookie
  const name = 'csrftoken='
  const decodedCookie = decodeURIComponent(document.cookie)
  const cookieArray = decodedCookie.split(';')
  for (let cookie of cookieArray) {
    cookie = cookie.trim()
    if (cookie.indexOf(name) === 0) {
      return cookie.substring(name.length, cookie.length)
    }
  }

  // If not in cookie, try to get from meta tag
  const element = document.querySelector('meta[name="csrf-token"]')
  if (element && element.getAttribute('content')) {
    return element.getAttribute('content') as string
  }

  return ''
}

export const API_URLS = {
  signalements: `${BACKEND_URL}/api/signalements/`,
}

// Document URL builder
export const getDocumentUrl = (id: number | null): string => {
  if (!id) return '#'
  return `${BACKEND_URL}/documents/signalements/${id}/`
}

async function makeRequest(url: string, method: 'POST' | 'PUT', data: any) {
  const response = await fetch(url, {
    method,
    headers: {
      'Content-Type': 'application/json',
      'X-CSRFToken': getCSRFToken() || '',
    },
    credentials: 'include',
    body: JSON.stringify(data),
  })

  if (!response.ok) {
    const error = await response.json()
    throw error
  }

  return response.json()
}

export const createResource = (url: string, data: any) => makeRequest(url, 'POST', data)

export const updateResource = (url: string, data: any) => makeRequest(url, 'PUT', data)
