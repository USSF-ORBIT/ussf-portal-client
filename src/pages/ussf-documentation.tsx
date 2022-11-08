import React from 'react'
import { withDefaultLayout } from 'layout/DefaultLayout/DefaultLayout'

const USSFDocumentation = () => {
  return (
    <div>
      <h2>Official USSF documentation</h2>
    </div>
  )
}

export default USSFDocumentation

USSFDocumentation.getLayout = (page: React.ReactNode) =>
  withDefaultLayout(page, false)
