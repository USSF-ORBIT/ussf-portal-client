import axios from 'axios'

export const isPdf = (url: string) => {
  return url.toString().includes('.pdf')
}

export const handleOpenPdfLink = async (pdfString: string) => {
  // Fetch the file from Keystone / S3
  const res = await axios.get(pdfString, { responseType: 'blob' })

  // Create a blob from the file and open it in a new tab
  const blobData = await res.data
  const file = new Blob([blobData], { type: 'application/pdf' })
  const fileUrl = URL.createObjectURL(file)

  window.open(fileUrl)
  // Let the browser know not to keep the reference to the file any longer.
  URL.revokeObjectURL(fileUrl)
}
