import React, { useEffect, useRef } from 'react'
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
  ErrorMessage,
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

  // #TODO: Integrate Formik into our forms following the
  // wrapper component pattern used in other Truss projects
  const formik = useFormik({
    initialValues: {
      bookmarkLabel: bookmark.label || '',
      bookmarkUrl: bookmark.url,
    },
    validateOnChange: false,
    validateOnBlur: false,

    onSubmit: () => {
      formik.resetForm()
      onSave(formik.values.bookmarkLabel, formik.values.bookmarkUrl)
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

  // Because the modal is not re-initialized when the user edits a bookmark,
  // we need to manually set the 'default' values when the props change
  useEffect(() => {
    formik.setValues({
      bookmarkLabel: bookmark.label || '',
      bookmarkUrl: bookmark.url,
    })
  }, [bookmark])

  const handleCancel = () => {
    formik.resetForm()
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
        <Form onSubmit={formik.handleSubmit} noValidate>
          <Label htmlFor={`bookmarkLabel-${bookmark._id}`}>Name</Label>
          <TextInput
            type="text"
            id={`bookmarkLabel-${bookmark._id}`}
            name="bookmarkLabel"
            required
            inputRef={nameInputRef}
            value={formik.values.bookmarkLabel}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.errors.bookmarkLabel && (
            <ErrorMessage>{formik.errors.bookmarkLabel}</ErrorMessage>
          )}
          <Label htmlFor={`bookmarkUrl-${bookmark._id}`}>URL</Label>
          <TextInput
            type="url"
            id={`bookmarkUrl-${bookmark._id}`}
            name="bookmarkUrl"
            required
            inputRef={urlInputRef}
            value={formik.values.bookmarkUrl}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.errors.bookmarkUrl && (
            <ErrorMessage>{formik.errors.bookmarkUrl}</ErrorMessage>
          )}
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
