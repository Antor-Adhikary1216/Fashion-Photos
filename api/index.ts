import type { IncomingMessage, ServerResponse } from 'node:http'

import { app } from '../server/src/app'

type VercelRequest = IncomingMessage & {
  query?: Record<string, string | string[] | undefined>
}

const getRewritePath = (value: unknown) => {
  if (Array.isArray(value)) {
    return value.join('/')
  }

  return typeof value === 'string' ? value : ''
}

export default function handler(req: VercelRequest, res: ServerResponse) {
  const rewrittenPath = getRewritePath(req.query?.path)

  if (rewrittenPath && (req.url === '/api' || req.url?.startsWith('/api?'))) {
    const queryStart = req.url.indexOf('?')
    const searchParams = new URLSearchParams(
      queryStart === -1 ? '' : req.url.slice(queryStart + 1),
    )
    searchParams.delete('path')

    const query = searchParams.toString()
    req.url = `/api/${rewrittenPath}${query ? `?${query}` : ''}`
  }

  return app(req, res)
}
