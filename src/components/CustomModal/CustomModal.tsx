import React from 'react'

import ModalPortal from 'components/util/ModalPortal'
import { useModalContext } from 'stores/modalContext'

const CustomModal = () => {
  const { component } = useModalContext()
  return <ModalPortal>{component}</ModalPortal>
}

export default CustomModal
