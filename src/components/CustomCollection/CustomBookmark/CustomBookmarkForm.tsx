import React, { useEffect } from 'react'
import { useFormik } from 'formik'
import * as yup from 'yup'
import {
  Form,
  ButtonGroup,
  Button,
  Label,
  TextInput,
  Alert,
  ErrorMessage,
} from '@trussworks/react-uswds'

type CustomBookmarkFormProps = {
  onSave: (url: string, label: string) => void
  onCancel: () => void
  onDelete?: () => void
  label?: string
  url?: string
  showAddWarning?: boolean
  nameInputRef: React.RefObject<HTMLInputElement>
  urlInputRef: React.RefObject<HTMLInputElement>
}
export const CustomBookmarkForm = ({
  onSave,
  onCancel,
  onDelete,
  label,
  url,
  showAddWarning,
  nameInputRef,
  urlInputRef,
}: CustomBookmarkFormProps) => {
  // #TODO: Integrate Formik into our forms following the
  // wrapper component pattern used in other Truss projects

  const formik = useFormik({
    initialValues: {
      // We have to provide label and url as possible initial values
      // in case a user is editing
      bookmarkLabel: label || '',
      bookmarkUrl: url || '',
    },

    validateOnChange: true,
    validateOnBlur: true,
    enableReinitialize: true,
    onSubmit: () => {
      onSave(formik.values.bookmarkUrl, formik.values.bookmarkLabel)
      formik.resetForm()
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
        .url('Please enter a valid URL')
        .required('URL is required'),
    }),
  })
  useEffect(() => {
    formik.setValues({
      bookmarkLabel: label || '',
      bookmarkUrl: url || '',
    })
  }, [label, url])

  const handleOnCancel = () => {
    formik.resetForm({
      values: {
        bookmarkUrl: '',
        bookmarkLabel: '',
      },
    })
    onCancel()
  }

  return (
    <Form onSubmit={formik.handleSubmit} noValidate>
      <Label htmlFor="bookmarkLabel">Name</Label>
      <TextInput
        type="text"
        id="bookmarkLabel"
        name="bookmarkLabel"
        inputRef={nameInputRef}
        placeholder="Example link name"
        value={formik.values.bookmarkLabel}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        aria-required
        aria-invalid={!!formik.errors.bookmarkLabel}
        aria-label="bookmarkLabel"
      />
      {console.log(formik.touched)}
      {formik.errors.bookmarkLabel && formik.touched.bookmarkLabel && (
        <ErrorMessage>{formik.errors.bookmarkLabel}</ErrorMessage>
      )}

      <Label htmlFor="bookmarkUrl">URL</Label>
      <TextInput
        type="url"
        id="bookmarkUrl"
        name="bookmarkUrl"
        inputRef={urlInputRef}
        value={formik.values.bookmarkUrl}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        placeholder="https://www.copy-paste-your-url.com"
        aria-required
        aria-invalid={!!formik.errors.bookmarkUrl}
        aria-label="bookmarkUrl"
      />

      {formik.errors.bookmarkUrl && formik.touched.bookmarkUrl && (
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
          collection. To add additional links, please create a new collection.
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
          onClick={handleOnCancel}>
          Cancel
        </Button>
        {onDelete && (
          <Button
            type="button"
            data-close-modal
            unstyled
            className="padding-105 text-center text-error"
            onClick={onDelete}>
            Delete
          </Button>
        )}
      </ButtonGroup>
    </Form>
  )
}
