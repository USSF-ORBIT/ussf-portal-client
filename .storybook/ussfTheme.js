import { create } from '@storybook/theming'

export default create({
  base: 'dark',
  brandTitle: 'USSF Design System',
  brandUrl: 'https://github.com/USSF-ORBIT/ussf-portal-client',
  brandImage: '/img/ussf-logo-short.svg',
  brandTarget: '_self',

  fontBase:
    '"Sharp Sans", "Trebuchet MS", Lucida Grande, Lucida Sans Unicode, Lucida Sans, Tahoma, sans-serif', //font needs to be loaded in via @fontface in manager-head.html

  barBg: '#0e163b', //adddons and canvas toolbar bg
  appContentBg: '#0e163b', //addons  panel background
  appBg: '#070b1e', //sidebar background
  barTextColor: '#a7afd4', //adddons and canvas toolbar text
})
