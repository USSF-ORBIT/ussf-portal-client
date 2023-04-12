/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable no-import-assign */
/* eslint-disable react/display-name */

import '@testing-library/jest-dom'
import * as NextImage from 'next/image'
import { toHaveNoViolations } from 'jest-axe'
import { ArrayBuffer, TextDecoder, TextEncoder, Uint8Array } from 'util'

import './src/initIcons'

global.TextEncoder = TextEncoder
global.TextDecoder = TextDecoder

// There are some open issues with NextImage in Jest:
// https://github.com/vercel/next.js/issues/26749
// https://github.com/vercel/next.js/issues/26606
// The below code gets around them for now
const OriginalNextImage = NextImage.default
Object.defineProperty(NextImage, 'default', {
  configurable: true,
  value: (props) => <OriginalNextImage layout="fill" {...props} unoptimized />,
})
/* eslint-disable-next-line no-undef */
expect.extend(toHaveNoViolations)
