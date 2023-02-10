import '@testing-library/jest-dom'
import { toHaveNoViolations } from 'jest-axe'

import './src/initIcons'

/* eslint-disable-next-line no-undef */
expect.extend(toHaveNoViolations)

jest.mock('next/router', () => ({
  useRouter: jest.fn().mockReturnValue({
    route: '',
    pathname: '',
    query: '',
    asPath: '',
    push: jest.fn(),
    replace: jest.fn(),
    events: {
      on: jest.fn(),
      off: jest.fn(),
    },
  }),
}))
