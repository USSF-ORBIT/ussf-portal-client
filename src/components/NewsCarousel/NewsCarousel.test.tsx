/**
 * @jest-environment jsdom
 */

import { fireEvent, render, screen } from '@testing-library/react'
import React from 'react'
import { cmsPortalNewsArticlesMock } from '../../__fixtures__/data/cmsPortalNewsArticles'
import '../../__mocks__/mockMatchMedia'
import NewsCarousel from './NewsCarousel'

describe('NewsCarousel component', () => {
  it('renders the component with mock articles', () => {
    render(<NewsCarousel articles={cmsPortalNewsArticlesMock} />)

    // Slider component in react-slick clones each item in the carousel,
    // so a length of 2 is accurate
    expect(screen.getAllByText('Announcing the dev blog')).toHaveLength(2)

    fireEvent.click(screen.getByTestId('slick-next'))
    expect(screen.getAllByText('Welcome and Overview')).toHaveLength(2)

    fireEvent.click(screen.getByTestId('slick-prev'))
    expect(screen.getAllByText('Announcing the dev blog')).toHaveLength(2)
  })
})
