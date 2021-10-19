import React, { useState, useRef, useEffect } from 'react'
import { TextInput } from '@trussworks/react-uswds'

import styles from './CustomCollection.module.scss'
/* eslint-disable jsx-a11y/no-noninteractive-element-to-interactive-role */
type PropTypes = {
  text: string
  placeholder: string
  onSave: (s: string) => void
}
export const EditableCollectionTitle = ({
  text,
  placeholder,
  onSave,
}: PropTypes) => {
  const [isEditing, setEditing] = useState(false)
  const [currentText, setCurrentText] = useState(text)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    inputRef?.current?.focus()
  }, [isEditing])

  const handleKeyDown = (event: React.KeyboardEvent) => {
    const { key } = event
    const keys = ['Escape', 'Enter', 'Tab']

    if (keys.includes(key)) {
      setEditing(!isEditing)
      onSave(currentText)
    }
  }

  const handleOnBlur = () => {
    // setEditing(!isEditing)
    // onSave(currentText)
  }

  return (
    <>
      {isEditing ? (
        <TextInput
          inputRef={inputRef}
          id="editableCollectionTitle"
          type="text"
          name="title"
          maxLength={200}
          className={styles.collectionTitle}
          value={currentText}
          placeholder={'Add a title for this collection'}
          onKeyDown={(e) => handleKeyDown(e)}
          onChange={(e) => setCurrentText(e.target.value)}
          onBlur={handleOnBlur}
        />
      ) : (
        <h3
          tabIndex={0}
          role="button"
          className={` ${styles.collectionTitle}`}
          onClick={() => setEditing(true)}
          onKeyDown={(e) => handleKeyDown(e)}>
          {currentText || placeholder}
        </h3>
      )}
    </>
  )
}
