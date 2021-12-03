import { query } from '.keystone/api'
import type { NextApiRequest, NextApiResponse } from 'next'

// GET /api/bookmarks
// Retrieve a list of all bookmarks from Keystone CMS
export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const result = await query.Bookmark.findMany({
      query: 'id url label',
      orderBy: [{ label: 'asc' }],
    })

    res.status(200).json({ bookmarks: result })
  } catch (e) {
    console.error('error fetching bookmarks', e)
    res.status(500).end()
  }
}
