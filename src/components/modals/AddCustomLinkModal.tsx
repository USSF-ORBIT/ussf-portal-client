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
  const nameInputRef = useRef<HTMLInputElement>(null)
  const urlInputRef = useRef<HTMLInputElement>(null)

  const resetForm = () => {
    // TODO - ideally we'd just reset the form but ReactUSWDS does not (yet) forward a ref to the form
    const nameInputEl = nameInputRef.current as HTMLInputElement
    const urlInputEl = urlInputRef.current as HTMLInputElement
    nameInputEl.value = ''
    urlInputEl.value = ''
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
        <Form onSubmit={handleSave}>
          <Label htmlFor="newBookmarkLabel">Name</Label>
          <TextInput
            type="text"
            id="newBookmarkLabel"
            name="bookmarkLabel"
            required
            inputRef={nameInputRef}
          />

          <Label htmlFor="newBookmarkUrl">URL</Label>
          <TextInput
            type="url"
            id="newBookmarkUrl"
            name="bookmarkUrl"
            required
            inputRef={urlInputRef}
          />
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
