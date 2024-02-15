import axios from 'axios'

// Helper function to determine MIME type from the Keystone file URL
const getMimeType = (url: string): string => {
  const extension = url.split('.').pop()?.toLowerCase()
  const mimeTypes: Record<string, string> = {
    pdf: 'application/pdf',
    jpg: 'image/jpeg',
    jpeg: 'image/jpeg',
    png: 'image/png',
    webp: 'image/webp',
    gif: 'image/gif',
    svg: 'image/svg+xml',
    webm: 'video/webm',
    mp4: 'video/mp4',
    mov: 'video/quicktime',
    mp3: 'audio/mpeg',
    wav: 'audio/wav',
    txt: 'text/plain',
    csv: 'text/csv',
    xls: 'application/vnd.ms-excel',
    xlsx: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    // Add more mappings as needed
  }

  return mimeTypes[extension || ''] || 'application/octet-stream' // Default MIME type
}
// Function to open files in a new tab with TypeScript annotations
export const openFileInNewTab = async (fileUrl: string): Promise<void> => {
  try {
    const response = await axios.get<Blob>(fileUrl, { responseType: 'blob' })
    const mimeType = getMimeType(fileUrl)

    const file = new Blob([response.data], { type: mimeType })
    const fileURL = URL.createObjectURL(file)

    // If the browser cannot open the file, it will download it automatically
    window.open(fileURL, '_blank')

    URL.revokeObjectURL(fileURL)
  } catch (error) {
    console.error('Error opening file:', error)
  }
}
