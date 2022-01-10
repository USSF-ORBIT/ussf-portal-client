import React from 'react'

const Logo = ({
  abbreviated = false,
  darkBg = false,
  noText = false,
}: {
  abbreviated?: boolean
  darkBg?: boolean
  noText?: boolean
}) => {
  if (darkBg) {
    return (
      <img
        src="/assets/images/SpaceForce_Horizontal_Gradient_RGBmod-01.svg"
        alt="United States Space Force Logo"
      />
    )
  }

  if (noText) {
    return (
      <img
        src="/assets/images/USSF_Vertical_Gradient_RGBicononly-01.svg"
        alt="USSF Logo"
      />
    )
  }

  if (abbreviated) {
    return <img src="/img/ussf-logo-short.svg" alt="USSF Logo" />
  }

  return <img src="/img/ussf-logo.svg" alt="USSF Logo" />
}

export default Logo
