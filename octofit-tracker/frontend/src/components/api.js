export function getEndpoint(apiBaseUrl, resource) {
  return `${apiBaseUrl}/${resource}/`
}

export function normalizeRecords(payload) {
  if (Array.isArray(payload)) {
    return payload
  }

  if (!payload || typeof payload !== 'object') {
    return []
  }

  const responseKeys = ['results', 'data', 'items', 'docs']
  const responseKey = responseKeys.find((key) => Array.isArray(payload[key]))

  return responseKey ? payload[responseKey] : []
}

export async function fetchRecords(apiBaseUrl, resource) {
  const endpoint = getEndpoint(apiBaseUrl, resource)
  const response = await fetch(endpoint)

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`)
  }

  const payload = await response.json()

  return {
    records: normalizeRecords(payload),
    endpoint,
  }
}

export function getDisplayName(person) {
  if (!person) {
    return 'Unassigned'
  }

  if (typeof person === 'string') {
    return person
  }

  return person.displayName || person.username || person.name || person._id || 'Unassigned'
}

export function formatDate(value) {
  if (!value) {
    return 'Not recorded'
  }

  return new Intl.DateTimeFormat(undefined, {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date(value))
}