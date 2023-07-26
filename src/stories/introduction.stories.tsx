import React from 'react'
import type { Meta } from '@storybook/react'

import Logo from 'components/Logo/Logo'

export default {
  title: 'Welcome',
  parameters: {
    happo: false,
  },
} as Meta

export const Welcome = () => {
  return (
    <div
      className="display-flex flex-column"
      style={{
        fontFamily: 'Sharp Sans',
        width: '100%',
        maxWidth: '800px',
        margin: '40px auto',
      }}>
      <div>
        <svg
          aria-hidden="true"
          height="16"
          viewBox="0 0 16 16"
          version="1.1"
          width="16"
          data-view-component="true">
          <path d="M2 2.5A2.5 2.5 0 014.5 0h8.75a.75.75 0 01.75.75v12.5a.75.75 0 01-.75.75h-2.5a.75.75 0 110-1.5h1.75v-2h-8a1 1 0 00-.714 1.7.75.75 0 01-1.072 1.05A2.495 2.495 0 012 11.5v-9zm10.5-1V9h-8c-.356 0-.694.074-1 .208V2.5a1 1 0 011-1h8zM5 12.25v3.25a.25.25 0 00.4.2l1.45-1.087a.25.25 0 01.3 0L8.6 15.7a.25.25 0 00.4-.2v-3.25a.25.25 0 00-.25-.25h-3.5a.25.25 0 00-.25.25z"></path>
        </svg>
        <a rel="author" href="https://github.com/USSF-ORBIT">
          USSF-ORBIT
        </a>
        /
        <strong>
          <a
            href="https://github.com/USSF-ORBIT/ussf-portal-client"
            target="_blank"
            rel="noreferrer">
            ussf-portal-client
          </a>
        </strong>
      </div>
      <div className="display-flex flex-align-center flex-justify-center padding-top-4">
        <div className="margin-right-3" style={{ width: '150px' }}>
          <Logo noText />
        </div>
        <div>
          <h1 className="margin-y-0" style={{ maxWidth: '527px' }}>
            United States Space Force Design System
          </h1>
        </div>
      </div>
      <p className="line-height-sans-4">
        This is the design system for the client application for the new USSF
        portal website. It is a React application built with{' '}
        <a href="https://nextjs.org/">NextJS</a>. We&#39;re also using{' '}
        <a href="https://storybook.js.org/">Storybook</a> for building and
        reviewing components. We use the{' '}
        <a
          href="https://designsystem.digital.gov/"
          target="_blank"
          rel="noreferrer">
          United States Web Design System (currently in its 2.0 version)
        </a>{' '}
        by including a library called{' '}
        <a
          href="https://github.com/trussworks/react-uswds"
          target="_blank"
          rel="noreferrer">
          react-uswds
        </a>{' '}
        as a base.{' '}
        <a
          href="https://trussworks.github.io/react-uswds/?path=/story/*"
          target="_blank"
          rel="noreferrer">
          React USWDS Storybook
        </a>{' '}
        components library shows these components in their un-customized state.
      </p>
      <h2 className="margin-bottom-0">Design System Organization</h2>
      <ul>
        <li className="padding-bottom-1 line-height-sans-4">
          <strong>Global</strong> is for our most top level brand styles,
          assets, and building blocks. Here we can find USSF base styles and
          things we see central to the USSF brand.
        </li>
        <li className="padding-bottom-1 line-height-sans-4">
          <strong>Navigation</strong> is for our persistant components we see on
          every page, and includes navigation based components such as
          navigation components such as page headers and footers
        </li>
        <li className="padding-bottom-1 line-height-sans-4">
          <strong>Base</strong> where simple components without a corresponding
          parent component reside. These are our custom building blocks specific
          to the USSF Design System. Before adding something new here, please
          refer to{' '}
          <a
            href="https://github.com/trussworks/react-uswds"
            target="_blank"
            rel="noreferrer">
            react-uswds
          </a>{' '}
          to ensure there is not an already existing component.
          <ul>
            <li className="padding-bottom-1 line-height-sans-4">
              If you do use a React USWDS component, you&#39;ll want to display
              it here, so their output can be tracked in visual regression
              testing. These components can be affected unintentionally by
              incorrectly scoped css or by updates to the uswds or react-uswds
              libraries. See pattern used for{' '}
              <a
                href="https://github.com/USSF-ORBIT/ussf-portal-client/blob/main/src/stories/buttons.stories.tsx"
                target="_blank"
                rel="noreferrer">
                buttons.stories.tsx
              </a>{' '}
              for reference.
            </li>
          </ul>
        </li>
        <li className="padding-bottom-1 line-height-sans-4">
          <strong>Components</strong> where more complex, custom components go.
          If they have a corresponding child component (such as{' '}
          <strong>ArticleList</strong> and <strong>ArticleListItem</strong>,
          they get nested into that component using a folder.
        </li>
        <li className="padding-bottom-1 line-height-sans-4">
          <strong>Layouts</strong> is where our most complex components go. They
          often combine several components into an even more complex one, and
          these components may also be used for other things, too.
        </li>
      </ul>
      <h2 className="margin-bottom-0">Documentation</h2>
      <ul>
        <li className="padding-bottom-1 line-height-sans-4">
          <a
            href="https://www.figma.com/file/8TK1fwvmOzysa73fwQebl8/Space-Force-Design-System-V0.1?node-id=616%3A3406&t=r8AaE7Bht8vIIwvK-1"
            target="_blank"
            rel="noreferrer">
            Figma Project
          </a>
        </li>
        <li className="padding-bottom-1 line-height-sans-4">
          <a
            href="https://github.com/USSF-ORBIT/ussf-portal-client/blob/main/docs/development.md"
            target="_blank"
            rel="noreferrer">
            Development Documentation
          </a>
        </li>
      </ul>
    </div>
  )
}
