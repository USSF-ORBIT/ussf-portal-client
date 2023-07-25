import React from 'react'
import { Meta } from '@storybook/react'
import { SearchBanner } from './SearchBanner'

export default {
  title: 'Base/SearchBanner',
  component: SearchBanner,
} as Meta

export const NoResults = () => (
  <SearchBanner
    icon={
      <img
        src="/assets/images/moon-flag.svg"
        alt="Icon of the US flag on the moon"
      />
    }>
    <div>
      <h3>There are no results that match that query.</h3>
      <p>
        It seems you didn’t find what you were looking for. Please search again
        with different keywords.
      </p>
    </div>
  </SearchBanner>
)

export const EndOfResults = () => (
  <SearchBanner
    icon={<img src="/assets/images/satellite.svg" alt="Icon of a satellite" />}>
    <div>
      <h3>You’ve reached the end of your search results.</h3>
      <p>
        If you didn’t find what you’re looking for, search again using different
        keywords.
      </p>
    </div>
  </SearchBanner>
)
