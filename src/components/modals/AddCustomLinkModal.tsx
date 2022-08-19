import React, { useRef, useEffect } from 'react'
import { useFormik } from 'formik'
import * as yup from 'yup'
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
  ErrorMessage,
} from '@trussworks/react-uswds'

import ModalPortal from 'components/util/ModalPortal'

import { CustomBookmarkForm } from 'components/CustomCollection/CustomBookmark/CustomBookmarkForm'
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

  // #TODO: Integrate Formik into our forms following the
  // wrapper component pattern used in other Truss projects
  const formik = useFormik({
    initialValues: {
      bookmarkLabel: '',
      bookmarkUrl: '',
    },
    validateOnChange: false,
    validateOnBlur: false,

    onSubmit: () => {
      formik.resetForm()
      onSave(formik.values.bookmarkUrl, formik.values.bookmarkLabel)
    },

    validationSchema: yup.object({
      bookmarkLabel: yup.string().required('Link name is required'),
      bookmarkUrl: yup
        .string()
        .transform((_, value) => {
          // If the user enters a URL without a scheme,
          // add http:// so we can validate it.
          // This doesn't affect the value of the input.
          if (!value.startsWith('http')) {
            return `http://${value}`
          }
          return value
        })
        .url('URL is invalid')
        .required('URL is required'),
    }),
  })

  // Because the modal is not re-initialized when the user adds a bookmark,
  // we need to manually set the 'default' values when the props change
  useEffect(() => {
    if (customLinkLabel) {
      formik.setFieldValue('bookmarkLabel', customLinkLabel)
    }
  }, [customLinkLabel])

  const handleCancel = () => {
    formik.resetForm()
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
        <Form onSubmit={formik.handleSubmit} noValidate>
          <Label htmlFor="bookmarkLabel">Name</Label>
          <TextInput
            type="text"
            id="BookmarkLabel"
            name="bookmarkLabel"
            inputRef={nameInputRef}
            placeholder="Example link name"
            value={formik.values.bookmarkLabel}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />

          {formik.errors.bookmarkLabel && (
            <ErrorMessage>{formik.errors.bookmarkLabel}</ErrorMessage>
          )}

          <Label htmlFor="newBookmarkUrl">URL</Label>
          <TextInput
            type="url"
            id="newBookmarkUrl"
            name="bookmarkUrl"
            title="Enter a valid URL"
            inputRef={urlInputRef}
            value={formik.values.bookmarkUrl}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder="https://www.copy-paste-your-url.com"
          />
          {formik.errors.bookmarkUrl && (
            <ErrorMessage>{formik.errors.bookmarkUrl}</ErrorMessage>
          )}
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
