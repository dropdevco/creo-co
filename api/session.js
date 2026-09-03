import { getSessionFromRequest } from '../lib/session.js'

// Lets the browser check "am I signed in?" without exposing anything secret.
export default function handler(req, res) {
  const session = getSessionFromRequest(req)
  if (!session) {
    return res.status(401).json({ error: 'not signed in' })
  }
  return res.status(200).json({ ok: true })
}
