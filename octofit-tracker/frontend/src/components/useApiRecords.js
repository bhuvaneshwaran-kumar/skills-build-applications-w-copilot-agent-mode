import { useEffect, useState } from 'react'
import { fetchRecords, getEndpoint } from './api.js'

function useApiRecords(apiBaseUrl, resource) {
  const [records, setRecords] = useState([])
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const endpoint = getEndpoint(apiBaseUrl, resource)

  useEffect(() => {
    let isMounted = true

    async function loadRecords() {
      setIsLoading(true)
      setError('')

      try {
        const result = await fetchRecords(apiBaseUrl, resource)

        if (isMounted) {
          setRecords(result.records)
        }
      } catch (fetchError) {
        if (isMounted) {
          setError(fetchError.message)
        }
      } finally {
        if (isMounted) {
          setIsLoading(false)
        }
      }
    }

    loadRecords()

    return () => {
      isMounted = false
    }
  }, [apiBaseUrl, resource])

  return { endpoint, error, isLoading, records }
}

export default useApiRecords