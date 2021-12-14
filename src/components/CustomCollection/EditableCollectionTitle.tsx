import React, { useState, useRef, useEffect } from 'react'
import { Textarea } from '@trussworks/react-uswds'

import styles from './CustomCollection.module.scss'
/* eslint-disable jsx-a11y/no-noninteractive-element-to-interactive-role */
type PropTypes = {
  collectionId: string
  text: string
  onSave: (s: string) => void
  onDelete: () => void
}
export const EditableCollectionTitle = ({
  collectionId,
  text,
  onSave,
  onDelete,
}: PropTypes) => {
  const [isEditing, setEditing] = useState(text === '')
  const [currentText, setCurrentText] = useState(text)
  const inputRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    if (isEditing) {
      inputRef?.current?.focus()
    }
  }, [isEditing])

  const handleKeyDown = (event: React.KeyboardEvent) => {
    const { key } = event
    const keys = ['Escape', 'Enter', 'Tab']

    if (keys.includes(key)) {
      if (isEditing) {
        inputRef?.current?.blur()
      } else if (key === 'Enter') {
        setEditing(true)
      }
    }
  }

  const handleOnBlur = () => {
    if (currentText.length) {
      onSave(currentText)

      setEditing(false)
    } else if (text.length) {
      // Revert to previous value
      setCurrentText(text)
      setEditing(false)
    } else {
      // No value, delete the collection
      onDelete()
    }
  }

  const inputId = `collectionTitle_${collectionId}`

  return (
    <>
      {isEditing ? (
        <>
          <label htmlFor={inputId} className="usa-sr-only">
            Collection Title
          </label>
          <Textarea
            inputRef={inputRef}
            id={inputId}
            name="title"
            maxLength={200}
            className={styles.collectionTitle}
            value={currentText}
            placeholder="Add a title for this collection"
            onKeyDown={(e) => handleKeyDown(e)}
            onChange={(e) => setCurrentText(e.target.value)}
            onBlur={handleOnBlur}
          />
        </>
      ) : (
        <h3
          tabIndex={0}
          role="button"
          className={styles.collectionTitle}
          onClick={() => setEditing(true)}
          onKeyDown={(e) => handleKeyDown(e)}
          aria-label={`Edit ${currentText} collection title`}>
          {currentText}
        </h3>
      )}
    </>
  )
}
