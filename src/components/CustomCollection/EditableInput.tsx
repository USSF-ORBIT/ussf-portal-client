import React, { useState, useEffect } from 'react'

type PropTypes = {
  text: string
  placeholder: string
  children: React.ReactNode
  childRef: React.RefObject<HTMLInputElement>
  onSave: (s: string) => void
}
export const EditableInput = ({
  text,
  placeholder,
  children,
  childRef,
  onSave,
  ...props
}: PropTypes) => {
  const [isEditing, setEditing] = useState(false)
  const [currentText, setCurrentText] = useState('')
  // console.log('Are we editing?', isEditing)
  // console.log('Current text: ', currentText)

  useEffect(() => {
    setCurrentText(text) // this vs default state?
  }, [])

  useEffect(() => {
    if (childRef && childRef.current && isEditing) {
      childRef.current.focus()
    }
  }, [isEditing, childRef])

  const handleKeyDown = (event: React.KeyboardEvent) => {
    const { key } = event
    const keys = ['Escape', 'Enter', 'Tab']

    if (keys.includes(key)) {
      console.log('keys includes key')
      setCurrentText(text)
      setEditing(!isEditing)
      onSave(text)
    }
  }

  return (
    <>
      {isEditing ? (
        <div tabIndex={0} role="textbox" onKeyDown={(e) => handleKeyDown(e)}>
          {children}
        </div>
      ) : (
        <div
          tabIndex={0}
          role="textbox"
          onClick={() => setEditing(true)}
          onKeyDown={(e) => handleKeyDown(e)}>
          <span>{currentText || placeholder}</span>
        </div>
      )}
    </>
  )
}
