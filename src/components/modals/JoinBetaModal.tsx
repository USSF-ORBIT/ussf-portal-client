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
            Become a beta tester to access features that haven’t been released
            to the public yet and to share your feedback - your input will make
            this site better.
          </p>
          <p>
            You can return to the current version of the site at any time, and
            you can always opt-out of the beta program.
          </p>
        </div>
        <ModalFooter>
          <ButtonGroup>
            <LinkTo href="/joinbeta" className="usa-button" data-close-modal>
              Join beta
            </LinkTo>
            <LinkTo
              href={MICROSITE_URL}
              target="_blank"
              rel="noreferrer noopener"
              className="padding-105 text-center usa-button usa-button--unstyled">
              What is beta?
            </LinkTo>
          </ButtonGroup>
        </ModalFooter>
      </Modal>
    </ModalPortal>
  )
}

export default JoinBetaModal
