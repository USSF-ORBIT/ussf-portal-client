import React from 'react'
import {
  Modal,
  ModalProps,
  ModalHeading,
  ModalFooter,
  ModalRef,
  ButtonGroup,
  Button,
} from '@trussworks/react-uswds'

import ModalPortal from 'components/util/ModalPortal'
import LinkTo from 'components/util/LinkTo/LinkTo'

type JoinBetaModalProps = {
  modalRef: React.RefObject<ModalRef>
} & Omit<ModalProps, 'children' | 'id'>

const MICROSITE_URL = 'https://ussf-orbit.github.io/ussf-portal/'

const JoinBetaModal = ({ modalRef, ...props }: JoinBetaModalProps) => {
  const modalId = 'joinBetaModal'

  return (
    <ModalPortal>
      <Modal
        {...props}
        id={modalId}
        ref={modalRef}
        aria-labelledby={`${modalId}-heading`}
        aria-describedby={`${modalId}-description`}
        modalRoot="#modal-root"
        className="sfds">
        <ModalHeading id={`${modalId}-heading`}>Join the Beta</ModalHeading>
        <div className="usa-prose" id={`${modalId}-description`}>
          <p>
            This will give you a sneak peek at features that haven’t been
            released to the public yet and you can return to this version of the
            portal at anytime.
          </p>
          <p>
            We’d love to hear your feedback on what you like (or don’t)! Share
            your thoughts about new features or issues you experience at any
            time by emailing us at feedback@ussforbit.us.
          </p>
        </div>
        <ModalFooter>
          <ButtonGroup>
            <LinkTo href="/joinbeta" className="usa-button" data-close-modal>
              Join Beta
            </LinkTo>
            <LinkTo
              href={MICROSITE_URL}
              target="_blank"
              rel="noreferrer noopener"
              data-close-modal
              className="padding-105 text-center usa-button usa-button--unstyled">
              Learn more
            </LinkTo>
          </ButtonGroup>
        </ModalFooter>
      </Modal>
    </ModalPortal>
  )
}

export default JoinBetaModal
