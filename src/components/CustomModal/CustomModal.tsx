import React from 'react'
import {
  Modal,
  ModalHeading,
  ModalFooter,
  ButtonGroup,
  Button,
} from '@trussworks/react-uswds'
import styles from '../modals/modal.module.scss'
import ModalPortal from 'components/util/ModalPortal'
import { useModalContext } from 'stores/modalContext'

const CustomModal = ({ ...props }) => {
  const {
    modalId,
    modalRef,
    modalHeadingText,
    additionalText,
    closeModal,
    // bookmark,
    // customLinkLabel,
  } = useModalContext()

  return (
    <ModalPortal>
      <Modal
        {...props}
        id="MODAL-ID"
        ref={modalRef}
        aria-labelledby={`MODAL-ID-heading`}
        aria-describedby={`MODAL-ID-description`}
        forceAction
        className={styles.customLinkModal}
        modalRoot="#modal-root">
        <ModalHeading id="MODAL-HEADING">{modalHeadingText}</ModalHeading>

        {additionalText && (
          <div className="usa-prose">
            <p id={`MODAL-ID-description`}>{additionalText}</p>
          </div>
        )}

        <ModalFooter>
          <ButtonGroup>
            <Button
              type="submit"
              data-close-modal
              onClick={() => console.log('delete')}>
              Delete
            </Button>
            <Button
              type="button"
              data-close-modal
              unstyled
              className="padding-105 text-center"
              onClick={closeModal}>
              Cancel
            </Button>
          </ButtonGroup>
        </ModalFooter>

        {/* {bookmark ||
          customLinkLabel && (
            <CustomBookmarkForm
              onSave={onSave}
              onCancel={onCancel}
              label={customLinkLabel}
              showAddWarning={showAddWarning}
              nameInputRef={nameInputRef}
              urlInputRef={urlInputRef}
            />
          )} */}
      </Modal>
    </ModalPortal>
  )
}

export default CustomModal
