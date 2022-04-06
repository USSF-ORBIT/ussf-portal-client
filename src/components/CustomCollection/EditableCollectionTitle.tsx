import React, { useRef, useEffect } from 'react'

import {
  Button,
  ButtonGroup,
  Form,
  Label,
  TextInput,
} from '@trussworks/react-uswds'
import type { ObjectId } from 'bson'
import styles from './CustomCollection.module.scss'

type PropTypes = {
  collectionId: ObjectId
  text: string
  onSave: (s: string) => void
  onCancel: () => void
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

  useEffect(() => {
    if (isEditing) {
      inputRef?.current?.focus()
    }
  }, [isEditing])

  const inputId = `collectionTitle_${collectionId}`

  const handleSubmitEdit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const data = new FormData(e.currentTarget)
    const label = `${data.get('collectionTitle')}`
    onSave(label)
  }

  return (
    <div className={styles.editCollectionTitle}>
      {isEditing ? (
        <Form
          onSubmit={handleSubmitEdit}
          className={styles.editableCollectionTitle}>
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
            defaultValue={text}
            placeholder={`Name this collection`}
            type="text"
          />
          <ButtonGroup>
            <Button
              type="button"
              className={`padding-105 text-center ${styles.cancelButton}`}
              onClick={() => onCancel()}>
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
