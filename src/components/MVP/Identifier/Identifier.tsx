import React from 'react'
import {
  Identifier as USWDSIdentifier,
  IdentifierMasthead,
  IdentifierIdentity,
  IdentifierLinks,
  IdentifierLinkItem,
  IdentifierLink,
} from '@trussworks/react-uswds'

const Identifier = () => {
  return (
    <USWDSIdentifier id="identifier">
      <IdentifierMasthead aria-label="Agency identifier">
        <IdentifierIdentity
          domain="spaceforce.mil"
          aria-label="Agency description">
          An official website of the{' '}
          <a href="https://www.spaceforce.mil/">Space Force</a>
        </IdentifierIdentity>
      </IdentifierMasthead>
      <IdentifierLinks navProps={{ 'aria-label': 'Important links' }}>
        <IdentifierLinkItem>
          <IdentifierLink href="https://dodcio.defense.gov/DoDSection508/Std_Stmt/">
            Accessibility Support
          </IdentifierLink>
        </IdentifierLinkItem>
        <IdentifierLinkItem>
          <IdentifierLink href="https://comptroller.defense.gov/Budget-Materials/">
            Budget and Performance
          </IdentifierLink>
        </IdentifierLinkItem>
        <IdentifierLinkItem>
          <IdentifierLink href="https://www.foia.af.mil/">
            FOIA Requests
          </IdentifierLink>
        </IdentifierLinkItem>
        <IdentifierLinkItem>
          <IdentifierLink href="https://www.af.mil/Equal-Opportunity/">
            No FEAR Act Data
          </IdentifierLink>
        </IdentifierLinkItem>
        <IdentifierLinkItem>
          <IdentifierLink href="https://www.dodig.mil/">
            Office of the Inspector General
          </IdentifierLink>
        </IdentifierLinkItem>
        <IdentifierLinkItem>
          <IdentifierLink href="https://www.resilience.af.mil/SAPR/">
            Sexual Assault Prevention and Response
          </IdentifierLink>
        </IdentifierLinkItem>
        <IdentifierLinkItem>
          <IdentifierLink href="https://www.usa.gov/">USA.gov</IdentifierLink>
        </IdentifierLinkItem>
      </IdentifierLinks>
    </USWDSIdentifier>
  )
}

export default Identifier
