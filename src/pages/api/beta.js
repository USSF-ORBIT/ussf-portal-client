import cookie from 'cookie'

export default function betaHandler(req, res) {
  const { method } = req

  switch (method) {
    case 'POST':
      // Create cookie for beta status
      console.log('SETTING COOKIE')
      res.setHeader(
        'Set-Cookie',
        cookie.serialize('betaOptIn', true, {
          httpOnly: true,
          maxAge: 60 * 60, //1 hour
          sameSite: 'strict',
          path: '/', // represents everywhere
        })
      )
      res.statusCode = 200
      res.json({ success: true })
      break

    case 'DELETE':
      // Delete cookie for beta status
      console.log('DELETING COOKIE')
      res.setHeader(
        'Set-Cookie',
        cookie.serialize('betaOptIn', true, {
          httpOnly: true,
          expires: new Date(0),
          sameSite: 'strict',
          path: '/', // represents everywhere
        })
      )
      res.statusCode = 200
      res.json({ success: true })
      break
    default:
      res.status(404)
      res.setHeader('Allow', ['POST', 'DELETE'])
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}
