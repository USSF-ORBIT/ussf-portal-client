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

import styles from './modal.module.scss'

import ModalPortal from 'components/util/ModalPortal'
import type { Bookmark as BookmarkType } from 'types/index'

type EditCustomLinkModalProps = {
  bookmark: BookmarkType
  onSave: (label: string, url: string) => void
  onCancel: () => void
  onDelete: () => void
  modalRef: React.RefObject<ModalRef>
} & Omit<ModalProps, 'children' | 'id'>

const EditCustomLinkModal = ({
  bookmark,
  onSave,
  onCancel,
  onDelete,
  modalRef,
  ...props
}: EditCustomLinkModalProps) => {
  const modalId = 'editCustomLinkModal'
  const nameInputRef = useRef<HTMLInputElement>(null)
  const urlInputRef = useRef<HTMLInputElement>(null)

  const resetForm = () => {
    // TODO - ideally we'd just reset the form but ReactUSWDS does not (yet) forward a ref to the form
    const nameInputEl = nameInputRef.current as HTMLInputElement
    const urlInputEl = urlInputRef.current as HTMLInputElement
    nameInputEl.value = bookmark.label || ''
    urlInputEl.value = bookmark.url || ''
  }

  const handleSave = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const data = new FormData(e.currentTarget)
    const label = `${data.get('bookmarkLabel')}`
    const url = `${data.get('bookmarkUrl')}`
    onSave(label, url)
  }

  const handleCancel = () => {
    resetForm()
    onCancel()
  }

  const handleDelete = () => {
    onDelete()
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
        <ModalHeading id={`${modalId}-heading`}>Edit custom link</ModalHeading>
        <Form onSubmit={handleSave}>
          <Label htmlFor="bookmarkLabel">Name</Label>
          <TextInput
            type="text"
            id="bookmarkLabel"
            name="bookmarkLabel"
            required
            inputRef={nameInputRef}
            defaultValue={bookmark.label}
          />

          <Label htmlFor="bookmarkUrl">URL</Label>
          <TextInput
            type="url"
            id="bookmarkUrl"
            name="bookmarkUrl"
            required
            inputRef={urlInputRef}
            defaultValue={bookmark.url}
          />
          <ButtonGroup className={styles.buttonGroupWithDelete}>
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

            <Button
              type="button"
              data-close-modal
              unstyled
              className="padding-105 text-center text-error"
              onClick={handleDelete}>
              Delete
            </Button>
          </ButtonGroup>
        </Form>
      </Modal>
    </ModalPortal>
  )
}

export default EditCustomLinkModal
