import React, { useRef, useEffect } from 'react'

import {
  Button,
  ButtonGroup,
  Form,
  Label,
  Textarea,
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
  const inputRef = useRef<HTMLTextAreaElement>(null)

  const handleCancel = () => {
    console.log('handleCancel')
    const inputEl = inputRef.current as HTMLTextAreaElement
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
    <div className={styles.editCollectionTitle}>
      {isEditing ? (
        <Form onSubmit={onSave} className={styles.editableCollectionTitle}>
          <Label htmlFor={inputId} className="usa-sr-only">
            Collection Title
          </Label>
          <Textarea
            inputRef={inputRef}
            id={inputId}
            name="collectionTitle"
            required
            maxLength={200}
            className={styles.collectionTitle}
            placeholder="Name this collection"
          />
          <ButtonGroup>
            <Button
              type="button"
              className={`padding-105 text-center ${styles.cancelButton}`}
              onClick={handleCancel}>
              Cancel
            </Button>
            <Button type="submit">Save name</Button>
          </ButtonGroup>
        </Form>
      ) : (
        <h3 className={styles.collectionTitle}>{text}</h3>
      )}
    </div>
  )
}
