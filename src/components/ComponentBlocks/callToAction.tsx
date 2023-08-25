import React from 'react'
import {
  NotEditable,
  component,
  fields,
} from '@keystone-6/fields-document/component-blocks'

/**
 * This file is a copy of callToAction.tsx in the
 * CMS repo, and is needed here to infer prop types.
 */

export const componentBlocks = {
  callToAction: component({
    preview: (props) => {
      return (
        <NotEditable>
          <button type="button">{props.fields.ctaText.value}</button>
        </NotEditable>
      )
    },
    label: 'Call To Action',
    schema: {
      ctaText: fields.text({
        label: 'Button text',
        defaultValue: 'View more',
      }),
      link: fields.conditional(
        fields.select({
          label: 'CTA Type',
          options: [
            { label: 'URL', value: 'url' },
            { label: 'Article', value: 'article' },
          ],
          defaultValue: 'url',
        }),
        {
          url: fields.url({
            label: 'URL',
          }),
          article: fields.relationship({
            label: 'Article',
            listKey: 'Article',
            selection: 'id title slug',
          }),
          document: fields.relationship({
            label: 'Document',
            listKey: 'Document',
            selection: 'id title file { url }',
          }),
        }
      ),
    },
  }),
}
