// Created by Zack Sheppard (@zackdotcomputer) on 1/19/2021
// Freely available under MIT License
// Workaround for https://github.com/vercel/next.js/issues/5533
import React, { AnchorHTMLAttributes, PropsWithChildren } from 'react'
import Link, { LinkProps } from 'next/link'

type PropTypes = LinkProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'>

/// A unified component for the next/link <Link> and a standard <a> anchor.
/// Will lift href and all other props from Link up to the Link.
/// Will automatically make an <a> tag containing the children and pass it remaining props.
const LinkTo = ({
  children,
  href,
  as,
  replace,
  scroll,
  shallow,
  prefetch,
  locale,
  ...anchorProps
}: PropsWithChildren<PropTypes>) => {
  return (
    // These props are lifted up to the `Link` element. All others are passed to the `<a>`
    <Link {...{ href, as, replace, scroll, shallow, prefetch, locale }}>
      {/* eslint-disable-next-line react/jsx-props-no-spreading */}
      <a {...anchorProps}>{children}</a>
    </Link>
  )
}

export default LinkTo
