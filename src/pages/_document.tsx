import Document, { Html, Head, Main, NextScript } from 'next/document'

class USSFPortalDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head />
        <body>
          <Main />
          <div id="modal-root" />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default USSFPortalDocument
