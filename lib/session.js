// Minimal HMAC-signed session tokens for /api/auth/login and /api/events.
// No extra service to run — this is just logic inside the Vercel
// serverless functions.
//
// SESSION_SECRET must be set as a server-side env var (Vercel project
// settings), never prefixed VITE_. Generate with:
//   node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

import crypto from 'node:crypto'

const SECRET = process.env.SESSION_SECRET
const THIRTY_DAYS = 30 * 24 * 60 * 60 * 1000

function sign(payload) {
  const body = Buffer.from(JSON.stringify(payload)).toString('base64url')
  const sig = crypto.createHmac('sha256', SECRET).update(body).digest('base64url')
  return `${body}.${sig}`
}

function verify(token) {
  if (!token || !token.includes('.')) return null
  const [body, sig] = token.split('.')
  const expected = crypto.createHmac('sha256', SECRET).update(body).digest('base64url')
  const a = Buffer.from(sig)
  const b = Buffer.from(expected)
  if (a.length !== b.length || !crypto.timingSafeEqual(a, b)) return null
  const payload = JSON.parse(Buffer.from(body, 'base64url').toString())
  if (payload.exp < Date.now()) return null
  return payload
}

export function checkPasscode(passcode) {
  const expected = process.env.EDIT_PASSCODE || ''
  const a = Buffer.from(String(passcode || ''))
  const b = Buffer.from(expected)
  return Boolean(expected) && a.length === b.length && crypto.timingSafeEqual(a, b)
}

export function createSessionToken() {
  return sign({ purpose: 'session', exp: Date.now() + THIRTY_DAYS })
}

export function verifySessionToken(token) {
  const payload = verify(token)
  return payload?.purpose === 'session' ? payload : null
}

export function getSessionFromRequest(req) {
  const cookie = (req.headers.cookie || '')
    .split(';')
    .map(c => c.trim())
    .find(c => c.startsWith('session='))
  if (!cookie) return null
  return verifySessionToken(cookie.slice('session='.length))
}
