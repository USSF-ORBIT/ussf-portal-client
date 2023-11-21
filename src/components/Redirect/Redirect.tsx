import React from 'react'
import Link from 'next/link'

export const Redirect = ({ redirectTo }: { redirectTo: string }) => {
  return (
    <div>
      <h2>Redirect</h2>
      Please wait 5 seconds, while we redirect you to{' '}
      <Link href={redirectTo}>{redirectTo}</Link>. If you are not redirected
      please click the link.
    </div>
  )
}
