import React from 'react'
import { Accordion } from '@trussworks/react-uswds'
import { AccordionItemProps } from '@trussworks/react-uswds/lib/components/Accordion/Accordion'
import { withDefaultLayout } from 'layout/DefaultLayout/DefaultLayout'

const USSFDocumentation = () => {
  const testItems: AccordionItemProps[] = [
    {
      title: 'First',
      content: <div>This is a test</div>,
      expanded: false,
      id: 'thisistheid',
      headingLevel: 'h3',
    },
  ]

  return (
    <div>
      <h2>Official USSF documentation</h2>
      <Accordion bordered={true} items={testItems} />
    </div>
  )
}

export default USSFDocumentation

USSFDocumentation.getLayout = (page: React.ReactNode) =>
  withDefaultLayout(page, false)
