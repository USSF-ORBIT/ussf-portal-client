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
const windowOpenMock = jest.fn()
window.open = windowOpenMock

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
    const e = {
      preventDefault: jest.fn(),
    }
    const pdfString = 'https://www.google.com/test'
    const result = await handleOpenPdfLink(e, pdfString)
    expect(result).toBe(undefined)
  })

  test('opens a new window if the url is a pdf', async () => {
    const e = {
      preventDefault: jest.fn(),
    }
    const pdfString = 'https://www.google.com/test.pdf'
    const result = await handleOpenPdfLink(e, pdfString)
    expect(e.preventDefault).toHaveBeenCalled()
    expect(axios.get).toHaveBeenCalled()
  })
})
