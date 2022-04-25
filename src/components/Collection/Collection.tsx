import React, { Children } from 'react'

import styles from './Collection.module.scss'

import Widget from 'components/Widget/Widget'
import { Droppable } from 'react-beautiful-dnd'

type PropTypes = {
  title?: string
  header?: React.ReactNode
  children: React.ReactNode | React.ReactNode[]
  footer?: React.ReactNode
}

const Collection = ({ title = '', children, header, footer }: PropTypes) => {
  return (
    <Droppable droppableId="drop-test">
      {(provided, snapshot) => (
        <div ref={provided.innerRef} {...provided.droppableProps}>
          <Widget
            className={styles.collection}
            header={
              <>
                {title && <h3>{title}</h3>}
                {header}
              </>
            }>
            <ol className={styles.collectionList}>
              {Children.map(children, (child) => (
                <li>{child}</li>
              ))}
            </ol>

            {footer}
          </Widget>
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  )
}

export default Collection
