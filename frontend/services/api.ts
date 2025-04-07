const DEFAULT_API_URL = 'http://localhost:8000'
const API_BASE_URL = import.meta.env.VITE_API_URL || DEFAULT_API_URL

export const API_URLS = {
  signalements: `${API_BASE_URL}/api/signalements/`,
}

export const createResource = async <T>(url: string, data: T) => {
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })

  if (!response.ok) {
    throw new Error(`Failed to create resource: ${response.statusText}`)
  }

  return response.json()
}
