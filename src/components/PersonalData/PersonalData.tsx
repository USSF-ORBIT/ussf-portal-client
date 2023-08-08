import React from 'react'
import { useRouter } from 'next/router'
import {
  Breadcrumb,
  BreadcrumbBar,
  BreadcrumbLink,
} from '@trussworks/react-uswds'
import styles from './PersonalData.module.scss'
import NavLink, { NavLinkProps } from 'components/util/NavLink/NavLink'

const PersonalData = ({ userDisplayName }: { userDisplayName: string }) => {
  const router = useRouter()
  const greeting = `Welcome, ${userDisplayName}`
  const currentPage = router.pathname

  return (
    <div className={styles.personalData}>
      <h2 data-testid={'personal-data'}>{greeting}</h2>

      {currentPage != '/settings' && (
        <div>
          <BreadcrumbBar>
            <Breadcrumb>
              <BreadcrumbLink<NavLinkProps>
                asCustom={NavLink}
                href="/settings"
                data-testid="editName">
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
