/**
 * @jest-environment jsdom
 */
import { isPdf, handleOpenPdfLink } from './openDocumentLink'
import axios from 'axios'

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
  test('returns if url is not a pdf', async () => {
    const pdfString = 'https://www.google.com/test'
    const result = await handleOpenPdfLink(pdfString)
    expect(result).toBe(undefined)
    expect(mockCreateObjectURL).not.toHaveBeenCalled()
    expect(mockRevokeObjectURL).not.toHaveBeenCalled()
    expect(mockRevokeObjectURL).not.toHaveBeenCalled()
  })

  test('opens a new window if the url is a pdf', async () => {
    const pdfString = 'https://www.google.com/test.pdf'
    const result = await handleOpenPdfLink(pdfString)
    expect(axios.get).toHaveBeenCalled()
    expect(mockCreateObjectURL).toHaveBeenCalled()
    expect(mockWindowOpen).toHaveBeenCalled()
    expect(mockRevokeObjectURL).toHaveBeenCalled()
  })
})
