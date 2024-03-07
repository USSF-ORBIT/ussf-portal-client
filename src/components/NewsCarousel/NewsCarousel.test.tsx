/**
 * @jest-environment jsdom
 */

import { fireEvent, render, screen } from '@testing-library/react'
import React from 'react'
import { cmsPortalNewsArticlesMock } from '../../__fixtures__/data/cmsPortalNewsArticles'
import '../../__mocks__/mockMatchMedia'
import NewsCarousel from './NewsCarousel'

describe('NewsCarousel component', () => {
  test('renders the component with mock articles', () => {
    render(<NewsCarousel articles={cmsPortalNewsArticlesMock} />)

    const prevButton = screen.getByTestId('slick-prev')
    const nextButton = screen.getByTestId('slick-next')

    expect(prevButton).toBeInTheDocument()
    expect(nextButton).toBeInTheDocument()

    // TODO: verify that this actually changes the current slide in the carousel
    fireEvent.click(prevButton)
    fireEvent.click(nextButton)
  })
})
