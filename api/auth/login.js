import { checkPasscode, createSessionToken } from '../../lib/session.js'

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end()

  const { passcode } = req.body || {}

  if (!checkPasscode(passcode)) {
    // Small delay to blunt brute-force guessing against a static secret.
    await new Promise(r => setTimeout(r, 500))
    return res.status(401).json({ error: 'invalid_passcode' })
  }

  const sessionToken = createSessionToken()
  res.setHeader(
    'Set-Cookie',
    `session=${sessionToken}; HttpOnly; Secure; SameSite=Strict; Path=/; Max-Age=${30 * 24 * 60 * 60}`
  )
  return res.status(200).json({ ok: true })
}
