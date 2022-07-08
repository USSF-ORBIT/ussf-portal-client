import React from 'react'
import { useRouter } from 'next/router'
import { Breadcrumb, BreadcrumbLink } from '@trussworks/react-uswds'
import styles from './PersonalData.module.scss'
import NavLink, { NavLinkProps } from 'components/util/NavLink/NavLink'
import { useAuthContext } from 'stores/authContext'

const PersonalData = () => {
  const { user } = useAuthContext()
  const router = useRouter()

  const greeting = user
    ? `Welcome, ${user.attributes.givenname} ${user.attributes.surname}`
    : 'Welcome!'

  const currentPage = router.pathname

  return (
    <div className={styles.personalData}>
      <h2>{greeting}</h2>

      {currentPage != '/settings' && (
        <div>
          <Breadcrumb>
            <BreadcrumbLink<NavLinkProps> asCustom={NavLink} href="/settings">
              Edit name
            </BreadcrumbLink>
          </Breadcrumb>
        </div>
      )}
    </div>
  )
}

export default PersonalData
