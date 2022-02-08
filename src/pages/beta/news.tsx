import React from 'react'
import {
  BreadcrumbBar,
  Breadcrumb,
  BreadcrumbLink,
} from '@trussworks/react-uswds'

import PageLayout from 'layout/Beta/DefaultLayout/PageLayout'
import NavLink, { NavLinkProps } from 'components/util/NavLink/NavLink'

const News = () => {
  return (
    <div>
      <h2>Latest News</h2>
      <h3>The most recently publicly released Space Force news.</h3>
    </div>
  )
}

export default News

News.getLayout = (page: React.ReactNode) => (
  <PageLayout
    header={
      <div>
        <h1>News &amp; Announcements</h1>
        <BreadcrumbBar>
          <Breadcrumb>
            <BreadcrumbLink<NavLinkProps> asCustom={NavLink} href="/">
              Service portal home
            </BreadcrumbLink>
          </Breadcrumb>
          <Breadcrumb current>News & Announcements</Breadcrumb>
        </BreadcrumbBar>
      </div>
    }>
    {page}
  </PageLayout>
)
