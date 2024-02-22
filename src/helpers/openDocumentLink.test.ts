/**
 * @jest-environment jsdom
 */
import axios from 'axios'
import { mimeTypes, getMimeType, openFileInNewTab } from './openDocumentLink'

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
  Object.entries(mimeTypes).forEach(([extension, type]) => {
    test('returns correct type if url ends with extension', () => {
      const fileName = `https://www.google.com/test.${extension}`
      expect(getMimeType(fileName)).toBe(type)
    })
  })

  test('returns octet if url ends with extension not supported', () => {
    expect(getMimeType('https://www.google.com/test')).toBe(
      'application/octet-stream'
    )
  })
})

describe('handleOpenPdfLink', () => {
  test('opens a new window if the url is a pdf', async () => {
    const pdfString = 'https://www.google.com/test.pdf'
    await openFileInNewTab(pdfString)
    expect(axios.get).toHaveBeenCalled()
    expect(mockCreateObjectURL).toHaveBeenCalled()
    expect(mockWindowOpen).toHaveBeenCalled()
    expect(mockRevokeObjectURL).toHaveBeenCalled()
  })
})
