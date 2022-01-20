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
  onSave: (url: string, label: string) => void
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
  const formRef = useRef<HTMLFormElement>(null)

  const resetForm = () => {
    formRef.current?.reset()
  }

  const handleSave = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const data = new FormData(e.currentTarget)
    const label = `${data.get('bookmarkLabel')}`
    const url = `${data.get('bookmarkUrl')}`
    resetForm()
    onSave(url, label)
  }

  const handleCancel = () => {
    resetForm()
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
        <ModalHeading id={`${modalId}-heading`}>Add a custom link</ModalHeading>
        <Form ref={formRef} onSubmit={handleSave}>
          <Label htmlFor="bookmarkLabel">Name</Label>
          <TextInput
            type="text"
            id="bookmarkLabel"
            name="bookmarkLabel"
            required
          />

          <Label htmlFor="bookmarkUrl">URL</Label>
          <TextInput type="url" id="bookmarkUrl" name="bookmarkUrl" required />
          <ButtonGroup>
            <Button type="submit" data-close-modal>
              Save custom link
            </Button>
            <Button
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
