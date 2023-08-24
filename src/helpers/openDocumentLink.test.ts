/**
 * @jest-environment jsdom
 */
import axios from 'axios'
import { isPdf, handleOpenPdfLink } from './openDocumentLink'

jest.mock('axios', () => ({
  get: jest.fn(() => Promise.resolve({ data: { blob: () => 'test' } })),
}))

// Mock URL.createObjectURL
const mockCreateObjectURL = jest.fn()
const mockRevokeObjectURL = jest.fn()
URL.createObjectURL = mockCreateObjectURL
URL.revokeObjectURL = mockRevokeObjectURL

// Mock window.open
const mockWindowOpen = jest.fn()
window.open = mockWindowOpen

describe('isPdf', () => {
  test('returns true if url ends with .pdf', () => {
    expect(isPdf('https://www.google.com/test.pdf')).toBe(true)
  })

  test('returns false if url does not end with .pdf', () => {
    expect(isPdf('https://www.google.com/test')).toBe(false)
  })
})

describe('handleOpenPdfLink', () => {
  test('opens a new window if the url is a pdf', async () => {
    const pdfString = 'https://www.google.com/test.pdf'
    await handleOpenPdfLink(pdfString)
    expect(axios.get).toHaveBeenCalled()
    expect(mockCreateObjectURL).toHaveBeenCalled()
    expect(mockWindowOpen).toHaveBeenCalled()
    expect(mockRevokeObjectURL).toHaveBeenCalled()
  })
})
