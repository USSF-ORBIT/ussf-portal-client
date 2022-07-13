import React from 'react'
import { useRouter } from 'next/router'
import {
  Breadcrumb,
  BreadcrumbBar,
  BreadcrumbLink,
} from '@trussworks/react-uswds'
import styles from './PersonalData.module.scss'
import NavLink, { NavLinkProps } from 'components/util/NavLink/NavLink'
import { useGetDisplayNameQuery } from 'operations/portal/queries/getDisplayName.g'

const PersonalData = () => {
  const router = useRouter()

  const { data } = useGetDisplayNameQuery()
  const userDisplayName = (data?.displayName || '') as string

  const greeting = userDisplayName ? `Welcome, ${userDisplayName}` : 'Welcome!'

  const currentPage = router.pathname

  return (
    <div className={styles.personalData}>
      <h2>{greeting}</h2>

      {currentPage != '/settings' && (
        <div>
          <BreadcrumbBar>
            <Breadcrumb>
              <BreadcrumbLink<NavLinkProps> asCustom={NavLink} href="/settings">
                Edit name
              </BreadcrumbLink>
            </Breadcrumb>
          </BreadcrumbBar>
        </div>
      )}
    </div>
  )
}

export default PersonalData
