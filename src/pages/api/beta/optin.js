import cookie from 'cookie'
// Endpoint to set beta cookie
const handler = (req, res) => {
  // The cookie middleware will add the `set-cookie` header
  //   res.cookie('betaOptIn', 'true')
  console.log('SETTING COOKIE')
  res.setHeader(
    'Set-Cookie',
    cookie.serialize('betaOptIn', true, {
      httpOnly: true,
      // secure: process.env.NODE_ENV !== 'development',
      maxAge: 60 * 60, //1 hour
      sameSite: 'strict',
      path: '/', // represents everywhere
    })
  )
  res.statusCode = 200
  res.json({ success: true })
}

export default handler
