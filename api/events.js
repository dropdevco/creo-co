import { createClient } from '@sanity/client'
import { getSessionFromRequest } from '../lib/session.js'

// Write-capable client. Only ever instantiated here — server-side — never
// in a component or anything shipped to the browser. Sanity has no
// per-user write rules, so this endpoint is the only thing allowed to hold
// a write token, and it always checks the session first.
const sanityWrite = createClient({
  projectId: process.env.SANITY_PROJECT_ID,
  dataset: process.env.SANITY_DATASET,
  token: process.env.SANITY_WRITE_TOKEN,
  apiVersion: '2024-01-01',
  useCdn: false,
})

export default async function handler(req, res) {
  const session = getSessionFromRequest(req)
  if (!session) {
    return res.status(401).json({ error: 'not signed in' })
  }

  if (req.method === 'POST') {
    const created = await sanityWrite.create({ _type: 'event', ...req.body })
    return res.status(201).json({ ...created, id: created._id })
  }

  if (req.method === 'PATCH') {
    const { id, ...changes } = req.body
    const updated = await sanityWrite.patch(id).set(changes).commit()
    return res.status(200).json({ ...updated, id: updated._id })
  }

  if (req.method === 'DELETE') {
    const { id } = req.body
    await sanityWrite.delete(id)
    return res.status(204).end()
  }

  return res.status(405).end()
}
