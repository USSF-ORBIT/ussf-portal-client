import React, { useRef } from 'react'
import {
  Modal,
  ModalHeading,
  ModalFooter,
  ButtonGroup,
  Button,
} from '@trussworks/react-uswds'
import styles from '../modals/modal.module.scss'
import ModalPortal from 'components/util/ModalPortal'
import { CustomBookmarkForm } from 'components/CustomCollection/CustomBookmark/CustomBookmarkForm'
import { useModalContext } from 'stores/modalContext'

const CustomModal = ({ ...props }) => {
  const {
    modalRef,
    modalHeadingText,
    additionalText,
    closeModal,
    onSave,
    onDelete,
    bookmark,
    customLinkLabel,
    showAddWarning,
  } = useModalContext()

  const nameInputRef = useRef<HTMLInputElement>(null)
  const urlInputRef = useRef<HTMLInputElement>(null)

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

        {/* <a href="#">tab</a>
        <a href="#">tab</a> */}

        {additionalText && (
          <div className="usa-prose">
            <p id={`MODAL-ID-description`}>{additionalText}</p>
          </div>
        )}

        {bookmark || customLinkLabel ? (
          <CustomBookmarkForm
            onSave={onSave}
            onCancel={closeModal}
            onDelete={bookmark ? onDelete : null}
            label={bookmark ? bookmark.label : customLinkLabel}
            url={bookmark?.url}
            showAddWarning={showAddWarning}
            nameInputRef={nameInputRef}
            urlInputRef={urlInputRef}
          />
        ) : (
          <ModalFooter>
            <ButtonGroup>
              <Button type="submit" data-close-modal onClick={onDelete}>
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
        )}
      </Modal>
    </ModalPortal>
  )
}

export default CustomModal
