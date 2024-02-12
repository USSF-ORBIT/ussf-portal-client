import { gql } from 'graphql-tag'

export const GET_SITE_HEADER = gql`
  query getSiteHeader {
    siteHeader {
      buttonLabel
      buttonSource
      dropdownLabel
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
`
