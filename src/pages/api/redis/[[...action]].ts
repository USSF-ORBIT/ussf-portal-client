import NextConnect from 'next-connect'
import { NextApiRequest, NextApiResponse } from 'next'

import redis from 'lib/redis'

const handler = NextConnect<NextApiRequest, NextApiResponse>({
  onError: (err, req, res, next) => {
    console.error(err)
    console.error(err.stack)
    res.status(500).end('Error in test middleware')
  },
})

handler.get('/api/redis/write', async (req, res) => {
  try {
    await redis.connect()
    await redis.set('testKey', `${Date.now()}`)
    await redis.quit()
    res.status(200).end('successfully wrote to redis')
  } catch (e) {
    console.error('Error writing to redis')
    console.error(e)
  }
})

handler.get('/api/redis/read', async (req, res) => {
  try {
    await redis.connect()
    const value = await redis.get('testKey')
    await redis.quit()
    res.status(200).json(value)
  } catch (e) {
    console.error('Error reading from redis')
    console.error(e)
  }
})

export default handler
