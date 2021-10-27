import nextConnect from 'next-connect'
import { NextApiRequest, NextApiResponse } from 'next'

export default nextConnect<NextApiRequest, NextApiResponse>().get(
  (req, res) => {
    console.log('Logged out')
    res.send(`User logged out`)
  }
)
