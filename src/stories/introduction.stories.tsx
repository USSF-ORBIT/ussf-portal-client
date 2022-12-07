import React from 'react'
import type { Meta } from '@storybook/react'

import Logo from 'components/Logo/Logo'

export default {
  title: 'Welcome',
} as Meta

export const Welcome = () => {
  return (
    <div
      className="sfds"
      style={{
        fontFamily: 'Sharp Sans',
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        padding: '40px',
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
      <div className="display-flex flex-align-center padding-top-4">
        <div className="padding-1" style={{ width: '100px' }}>
          <Logo noText />
        </div>

        <h1>USSF Portal Design System</h1>
      </div>
      <p>
        This is the design system for the client application for the new USSF
        portal website. It is a React application built with{' '}
        <a href="https://nextjs.org/">NextJS</a>. We&#39;re also using{' '}
        <a href="https://storybook.js.org/">Storybook</a> for building and
        reviewing components.
      </p>
      <h2 className="margin-bottom-0">Documentation</h2>
      <ul>
        <li>
          <a
            href="https://www.figma.com/file/8TK1fwvmOzysa73fwQebl8/Space-Force-Design-System-V0.1?node-id=616%3A3406&t=r8AaE7Bht8vIIwvK-1"
            target="_blank"
            rel="noreferrer">
            Figma Project
          </a>
        </li>
        <li>
          <a
            href="https://github.com/USSF-ORBIT/ussf-portal-client/blob/main/docs/development.md"
            target="_blank"
            rel="noreferrer">
            Development
          </a>
        </li>
        <li>
          <a
            href="https://github.com/USSF-ORBIT/ussf-portal-client/blob/main/docs/cms.md"
            target="_blank"
            rel="noreferrer">
            Content Management
          </a>
        </li>
      </ul>
    </div>
  )
}
