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
import { useUser } from 'hooks/useUser'

const PersonalData = () => {
  const { user } = useUser()
  const router = useRouter()

  const { data } = useGetDisplayNameQuery()

  let userDisplayName
  if (data?.displayName) {
    userDisplayName = data.displayName
  } else if (user) {
    userDisplayName = `${user.attributes.givenname} ${user.attributes.surname}`
  }

  const greeting = userDisplayName ? `Welcome, ${userDisplayName}` : 'Welcome!'

  const currentPage = router.pathname

  return (
    <div data-testid={'personal-data'} className={styles.personalData}>
      <h2>{greeting}</h2>

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
