import React, { useRef } from 'react'
import {
  Modal,
  ModalProps,
  ModalHeading,
  ModalRef,
  Form,
  ButtonGroup,
  Button,
  Label,
  TextInput,
} from '@trussworks/react-uswds'

import ModalPortal from 'components/util/ModalPortal'

type AddCustomLinkModalProps = {
  onSave: (label: string) => void
  onCancel: () => void
  modalRef: React.RefObject<ModalRef>
} & Omit<ModalProps, 'children' | 'id'>

const AddCustomLinkModal = ({
  onSave,
  onCancel,
  modalRef,
  ...props
}: AddCustomLinkModalProps) => {
  const modalId = 'addCustomLinkModal'
  const inputRef = useRef<HTMLInputElement>(null)

  const handleSave = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const data = new FormData(e.currentTarget)
    const label = `${data.get('bookmarkLabel')}`
    if (inputRef.current) inputRef.current.value = ''
    onSave(label)
  }

  const handleCancel = () => {
    if (inputRef.current) inputRef.current.value = ''
    onCancel()
  }

  return (
    <ModalPortal>
      <Modal
        {...props}
        ref={modalRef}
        id={modalId}
        aria-labelledby={`${modalId}-heading`}
        aria-describedby={`${modalId}-description`}
        forceAction
        modalRoot="#modal-root">
        <ModalHeading id={`${modalId}-heading`}>
          We don’t recognize that link
        </ModalHeading>
        <div className="usa-prose">
          <p id={`${modalId}-description`}>
            Please provide a title for the custom link you’d like to save.
          </p>
        </div>

        <Form onSubmit={handleSave}>
          <Label htmlFor="bookmarkLabel" className="usa-sr-only">
            Label
          </Label>
          <TextInput
            type="text"
            id="bookmarkLabel"
            name="bookmarkLabel"
            required
            inputRef={inputRef}
          />
          <ButtonGroup>
            <Button type="submit" data-close-modal>
              Save link name
            </Button>
            <Button
              data-testid="cancel-addLinkModal"
              type="button"
              data-close-modal
              unstyled
              className="padding-105 text-center"
              onClick={handleCancel}>
              Cancel
            </Button>
          </ButtonGroup>
        </Form>
      </Modal>
    </ModalPortal>
  )
}

export default AddCustomLinkModal
