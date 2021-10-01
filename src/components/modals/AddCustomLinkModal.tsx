import React from 'react'
import {
  Modal,
  ModalProps,
  ModalHeading,
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
} & ModalProps

const AddCustomLinkModal = (props: AddCustomLinkModalProps) => {
  const { onSave, onCancel } = props
  const modalId = 'addCustomLinkModal'

  const handleSave = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const data = new FormData(e.currentTarget)
    const label = `${data.get('bookmarkLabel')}`
    onSave(label)
  }

  return (
    <ModalPortal>
      <Modal
        id={modalId}
        aria-labelledby={`${modalId}-heading`}
        aria-describedby={`${modalId}-description`}
        forceAction
        {...props}>
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
          />
          <ButtonGroup>
            <Button type="submit" data-close-modal>
              Save link name
            </Button>
            <Button
              type="button"
              data-close-modal
              unstyled
              className="padding-105 text-center"
              onClick={onCancel}>
              Cancel
            </Button>
          </ButtonGroup>
        </Form>
      </Modal>
    </ModalPortal>
  )
}

export default AddCustomLinkModal
