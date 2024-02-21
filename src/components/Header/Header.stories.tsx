import React from 'react'
import { Meta } from '@storybook/react'
import { gql } from '@apollo/client'
import Header from './Header'
import HeaderWithoutNav from './HeaderWithoutNav'

export default {
  title: 'Navigation/Header',
  component: Header,
} as Meta

export const DefaultHeader = () => <Header />

DefaultHeader.story = {
  parameters: {
    apolloClient: {
      mocks: [
        {
          request: {
            query: gql`
              query getSiteHeader {
                getSiteHeader {
                  headerButtonLabel
                  headerButtonSource
                  headerDropdownLabel
                  dropdownItem1Label
                  dropdownItem1Source
                  dropdownItem2Label
                  dropdownItem2Source
                  dropdownItem3Label
                  dropdownItem3Source
                  dropdownItem4Label
                  dropdownItem4Source
                }
              }
            `,
          },
          result: {
            data: {
              getSiteHeader: {
                headerButtonLabel: 'News',
                headerButtonSource: '/news',
                headerDropdownLabel: 'About Us',
                dropdownItem1Label: 'About the USSF',
                dropdownItem1Source: '/about-us',
                dropdownItem2Label: 'ORBIT blog',
                dropdownItem2Source: '/about-us/orbit-blog',
                dropdownItem3Label: 'Landing',
                dropdownItem3Source: '/landing',
                dropdownItem4Label: 'Contact Us',
                dropdownItem4Source: '/contact',
              },
            },
          },
        },
      ],
    },
  },
}

export const NoNavHeader = () => <HeaderWithoutNav />
