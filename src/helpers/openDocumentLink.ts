import axios from 'axios'

export const isPdf = (url: string) => {
  return url.toString().endsWith('.pdf')
}

export const handleOpenPdfLink = async (
  e: React.MouseEvent,
  pdfString: string
) => {
  // If the file isn't a pdf, we don't want to blob it
  if (!isPdf(pdfString)) return

  e.preventDefault()

  // Fetch the file from Keystone / S3
  const res = await axios.get(pdfString)

  // Create a blob from the file and open it in a new tab
  const blobData = await res.data.blob()
  const file = new Blob([blobData], { type: 'application/pdf' })
  const fileUrl = URL.createObjectURL(file)

  window.open(fileUrl)
  // Let the browser know not to keep the reference to the file any longer.
  URL.revokeObjectURL(fileUrl)
}
