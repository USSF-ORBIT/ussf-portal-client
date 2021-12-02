/**
 * @jest-environment jsdom
 */
import { screen } from '@testing-library/react'

import { renderWithAuth, defaultMockAuthContext } from '../../../testHelpers'
import Home from 'pages/index'

jest.mock('lib/session')

describe('Home page', () => {
  beforeEach(() => {
    renderWithAuth(<Home user={defaultMockAuthContext.user} />)
  })

  it('renders the Covid Alert', () => {
    expect(screen.getByRole('region')).toHaveTextContent(
      'Our response to COVID-19 is rapidly evolving. Always check your installation for local guidance. Read general guidance from the Air Force.'
    )
  })

  it.each([
    'Quick Links',
    'Manage Your Life',
    'Work Tools',
    'Learn and Grow',
    'Service portals',
  ])('renders the %s section', (header) => {
    expect(
      screen.getByRole('heading', { name: header, level: 2 })
    ).toBeInTheDocument()
  })

  it('renders the Announcement Cards', () => {
    expect(
      screen.getByRole('heading', {
        level: 3,
        name: 'Read it here – The Guardian Ideal',
      })
    ).toBeInTheDocument()

    expect(
      screen.getByRole('heading', {
        level: 3,
        name: 'View the new Guardian Enlisted Rank insignia',
      })
    ).toBeInTheDocument()
  })

  it.each([
    [
      'general guidance from the Air Force',
      'https://www.af.mil/News/Coronavirus-Disease-2019/',
    ],
    ['myPay', 'https://mypay.dfas.mil/'],
    [
      'DTS',
      'https://dtsproweb.defensetravel.osd.mil/dts-app/pubsite/all/view/',
    ],
    [
      'Base housing allowance calculator Find an area’s housing allowance that helps cover the cost of housing in the private sector.',
      'https://www.defensetravel.dod.mil/site/bahCalc.cfm',
    ],
    [
      'milConnect Check your health insurance coverage. Schedule a CAC appointment or update your contact info.',
      'https://milconnect.dmdc.osd.mil/milconnect',
    ],
    [
      'Military OneSource Get help for many aspects of military life. This includes tax services, spouse employment and deployment tools.',
      'https://www.militaryonesource.mil',
    ],
    ['move.mil Plan and execute your relocation.', 'https://move.mil/'],
    [
      'myPay View your paycheck, leave balance, and salary.',
      'https://mypay.dfas.mil',
    ],
    [
      'Defense Collaboration Services (DCS) Schedule and attend online web conferences. Record and share meetings. Manage and engage attendees.',
      'https://conference.apps.mil/',
    ],
    [
      'Defense Travel System (DTS) Create authorizations for work travel (TDY), prepare reservations, receive approval and get reimbursed.',
      'https://dtsproweb.defensetravel.osd.mil/dts-app/pubsite/all/view',
    ],
    [
      'DoD Directives and Issuances Find all the published DoD directives, forms and issuances.',
      'http://www.esd.whs.mil/DD/index.html',
    ],
    [
      'DoDIIS One-way Transfer Service (DOTS) Send files from a lower classification network to a higher classification network.',
      'https://dots.dodiis.mil/',
    ],
    [
      'Intelink.gov Intelligence and data: access all the resources of the intelligence community.',
      'https://www.intelink.gov',
    ],
    [
      'milSuite Collaborate and create with the milSuite tools.',
      'https://www.milsuite.mil',
    ],
    [
      'Force Multiplier program',
      '/training-and-education/force-multiplier-program',
    ],
    ['More in Training + Education', '/training-and-education'],
    ['Army', 'https://www.hrcapps.army.mil/portal/'],
    ['Navy', 'https://my.navy.mil/'],
    ['Air Force', 'https://www.my.af.mil/'],
    ['Marines', 'https://mol.tfs.usmc.mil/'],
    ['Coast Guard', 'https://cgportal2.uscg.mil/'],
  ])('renders the link to %s', (label, url) => {
    const link = screen.getByRole('link', { name: label })
    expect(link).toBeInstanceOf(HTMLAnchorElement)
    expect(link).toHaveAttribute('href', url)
  })
})
