import React, { useRef, useEffect } from 'react'

import {
  Button,
  ButtonGroup,
  Form,
  Label,
  TextInput,
} from '@trussworks/react-uswds'

import styles from './CustomCollection.module.scss'

type PropTypes = {
  collectionId: string
  text: string
  onSave: (event: React.FormEvent<HTMLFormElement>) => void
  onCancel: () => void
  onDelete: () => void
  isEditing: boolean
}

export const EditableCollectionTitle = ({
  collectionId,
  text,
  isEditing,
  onSave,
  onCancel,
}: PropTypes) => {
  const inputRef = useRef<HTMLInputElement>(null)

  const handleCancel = () => {
    console.log('handleCancel')
    const inputEl = inputRef.current as HTMLInputElement
    inputEl.value = ''
    onCancel()
  }
  useEffect(() => {
    if (isEditing) {
      inputRef?.current?.focus()
    }
  }, [isEditing])

  const inputId = `collectionTitle_${collectionId}`

  return (
    <>
      {isEditing ? (
        <Form onSubmit={onSave}>
          <Label htmlFor={inputId} className="usa-sr-only">
            Collection Title
          </Label>
          <TextInput
            inputRef={inputRef}
            id={inputId}
            name="collectionTitle"
            required
            maxLength={200}
            className={styles.collectionTitle}
            type="text"
            placeholder="Name this collection"
          />
          <ButtonGroup>
            <Button
              type="button"
              unstyled
              className="padding-105 text-center"
              onClick={handleCancel}>
              Cancel
            </Button>
            <Button type="submit">Save name</Button>
          </ButtonGroup>
        </Form>
      ) : (
        <h3 className={styles.collectionTitle}>{text}</h3>
      )}
    </>
  )
}
