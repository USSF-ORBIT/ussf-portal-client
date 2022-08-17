import React, { useRef, useEffect } from 'react'
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
// todo cleanup
import Error from 'next/error'
import { useFormik } from 'formik'
import * as yup from 'yup'

type AddCustomLinkModalProps = {
  onSave: (url: string, label: string) => Error | void
  onCancel: () => void
  modalRef: React.RefObject<ModalRef>
  showAddWarning?: boolean
  customLinkLabel?: string
} & Omit<ModalProps, 'children' | 'id'>

const URL =
  /^((https?|ftp):\/\/)?(www.)?(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i

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

  // regex for validating a url with optional scheme and www.
  const URL =
    /^((https?):\/\/)?(www.)?(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i

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
      let { bookmarkLabel, bookmarkUrl } = formik.values
      if (!bookmarkUrl.startsWith('http')) {
        bookmarkUrl = `http://${bookmarkUrl}`
      }
      formik.resetForm()
      onSave(bookmarkUrl, bookmarkLabel)
    },

    validationSchema: yup.object({
      bookmarkLabel: yup.string().required('Link name is required'),
      bookmarkUrl: yup
        .string()
        .matches(URL, 'URL is not valid')
        .required('URL is required'),
    }),
  })

  // Because the modal is initialized before a user begins the
  // Add Custom Link flow, we need to populate the label name
  // before the modal is shown.
  useEffect(() => {
    if (customLinkLabel) {
      formik.setFieldValue('bookmarkLabel', customLinkLabel)
    }
  }, [customLinkLabel])

  // #TODO Can this be folded in to Formik functionality?
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
