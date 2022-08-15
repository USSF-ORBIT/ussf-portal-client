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
  Alert,
} from '@trussworks/react-uswds'

import ModalPortal from 'components/util/ModalPortal'
import validator from 'validator'
import Error from 'next/error'

type AddCustomLinkModalProps = {
  onSave: (url: string, label: string) => Error | void
  onCancel: () => void
  modalRef: React.RefObject<ModalRef>
  showAddWarning?: boolean
  customLinkLabel?: string
} & Omit<ModalProps, 'children' | 'id'>

const AddCustomLinkModal = ({
  onSave,
  onCancel,
  modalRef,
  showAddWarning,
  customLinkLabel,
  ...props
}: AddCustomLinkModalProps) => {
  const modalId = 'addCustomLinkModal'
  const nameInputRef = useRef<HTMLInputElement>(null)
  const urlInputRef = useRef<HTMLInputElement>(null)

  const resetForm = () => {
    // TODO - ideally we'd just reset the form but ReactUSWDS does not (yet) forward a ref to the form
    const nameInputEl = nameInputRef.current as HTMLInputElement
    const urlInputEl = urlInputRef.current as HTMLInputElement
    nameInputEl.value = customLinkLabel || ''
    urlInputEl.value = ''
  }

  const handleSave = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log('Handle Save ----')
    const data = new FormData(e.currentTarget)
    const label = `${data.get('bookmarkLabel')}`
    let url = `${data.get('bookmarkUrl')}`
    // check if valid url regardless of protocol or not
    // if so, then we can check and add http if necessary
    // if not, return error
    const isValid = validator.isURL(url, { require_protocol: false })

    if (isValid) {
      if (!url.startsWith('http')) {
        url = `http://${url}`
      }
    } else {
      console.log('Invalid URL')
      // error to user
      // return new Error({ statusCode: 400, message: '🤠Invalid URL' })
      return <p>ERORRORO</p>
    }

    resetForm()
    onSave(url, label)
    // this can return an error, we should be handling
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
        <Form onSubmit={handleSave} noValidate>
          <Label htmlFor="newBookmarkLabel">Name</Label>
          <TextInput
            type="text"
            id="newBookmarkLabel"
            name="bookmarkLabel"
            required
            inputRef={nameInputRef}
            placeholder="Example link name"
            value={customLinkLabel?.trim() || ''}
            onChange={(e) => {}} // something something here
          />

          <Label htmlFor="newBookmarkUrl">URL</Label>
          <TextInput
            type="url"
            id="newBookmarkUrl"
            name="bookmarkUrl"
            required
            title="Enter a valid URL"
            inputRef={urlInputRef}
            placeholder="https://www.copy-paste-your-url.com"
          />

          {showAddWarning && (
            <Alert
              type="warning"
              heading="Link limit reached"
              headingLevel="h4"
              slim
              className="font-sans-3xs">
              You’ve almost reached the maximum number of links (10) for this
              collection. To add additional links, please create a new
              collection.
            </Alert>
          )}

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
