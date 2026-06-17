import { defineEventHandler, getQuery, createError, setHeader } from 'h3'

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const path = query.path as string

  if (!path) {
    throw createError({ statusCode: 400, statusMessage: 'Path is required' })
  }

  // Sanitize path (decode URI and strip leading slashes)
  const decodedPath = decodeURIComponent(path)
  const cleanPath = decodedPath.replace(/^\/+/, '')

  const config = useRuntimeConfig()
  const apiBase = config.public.apiBase || 'https://api.autoswift.shop'
  const imageUrl = `${apiBase}/media/${cleanPath}`

  try {
    const response = await fetch(imageUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
      }
    })
    
    if (!response.ok) {
      throw createError({ statusCode: response.status, statusMessage: 'Failed to fetch image from API' })
    }

    const contentType = response.headers.get('content-type') || 'image/jpeg'
    setHeader(event, 'Content-Type', contentType)
    setHeader(event, 'Cache-Control', 'public, max-age=86400')

    const arrayBuffer = await response.arrayBuffer()
    return new Uint8Array(arrayBuffer)
  } catch (error: any) {
    throw createError({ statusCode: 500, statusMessage: error.message || 'Internal Server Error' })
  }
})
