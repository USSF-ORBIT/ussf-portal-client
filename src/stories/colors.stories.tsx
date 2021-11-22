import React from 'react'
import type { Meta } from '@storybook/react'

import colors from 'styles/sfds/colors.module.scss'

export default {
  title: 'Global/Colors',
} as Meta

const filterGroup = (filter: string, omit?: string) =>
  Object.keys(colors).filter(
    (color) =>
      color.indexOf(filter) === 0 && (omit ? color.indexOf(omit) === -1 : color)
  )

const Color = ({ color }: { color: string }) => (
  <li
    style={{
      borderRadius: '5px',
      border: '1px solid lightgray',
      padding: '8px',
      marginBottom: '12px',
    }}>
    <span
      style={{
        backgroundColor: colors[color],
        display: 'block',
        height: '4em',
        marginBottom: '0.3em',
        borderRadius: '5px',
      }}
    />
    <span style={{ fontFamily: 'monospace, monospace' }}>
      ${color}
      <br />
      {colors[color]}
    </span>
  </li>
)

const ColorGroup = ({ group }: { group: string[] }) => (
  <ul
    style={{
      listStyleType: 'none',
      padding: '0',
      fontSize: '14px',
    }}>
    {group.map((color) => (
      <Color color={color} key={`swatch_${color}`} />
    ))}
  </ul>
)

export const Colors = () => {
  return (
    <div>
      <h1>Theme Colors</h1>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '12px',
        }}>
        <div>
          <h2>Space Base</h2>
          <ColorGroup group={filterGroup('theme-spacebase')} />
        </div>
        <div>
          <h2>Ultraviolet</h2>
          <ColorGroup
            group={filterGroup('theme-ultraviolet', 'theme-ultraviolet-muted')}
          />
        </div>
        <div>
          <h2>Ultraviolet (muted)</h2>
          <ColorGroup group={filterGroup('theme-ultraviolet-muted')} />
        </div>
        <div>
          <h2>Aurora</h2>
          <ColorGroup group={filterGroup('theme-aurora')} />
        </div>
        <div>
          <h2>Mars</h2>
          <ColorGroup group={filterGroup('theme-mars')} />
        </div>
        <div>
          <h2>Cosmic Latte</h2>
          <ColorGroup group={filterGroup('theme-cosmiclatte')} />
        </div>
      </div>

      <h1>State Colors</h1>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '12px',
        }}>
        <div>
          <h2>Info</h2>
          <ColorGroup group={filterGroup('state-info')} />
        </div>
        <div>
          <h2>Error</h2>
          <ColorGroup group={filterGroup('state-error')} />
        </div>
        <div>
          <h2>Warning</h2>
          <ColorGroup group={filterGroup('state-warning')} />
        </div>
        <div>
          <h2>Success</h2>
          <ColorGroup group={filterGroup('state-success')} />
        </div>
        <div>
          <h2>Disabled</h2>
          <ColorGroup group={filterGroup('state-disabled')} />
        </div>
      </div>
    </div>
  )
}
