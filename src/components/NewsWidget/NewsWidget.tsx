import React, { useEffect } from 'react'
import { Button } from '@trussworks/react-uswds'

import styles from './NewsWidget.module.scss'

import { WidgetWithSettings } from 'components/Widget/Widget'
import LinkTo from 'components/util/LinkTo/LinkTo'
import { useRSSFeed } from 'hooks/useRSSFeed'
import NewsItem from 'components/NewsItem/NewsItem'
import type { RSSNewsItem } from 'types'
import { validateNewsItems, formatRssToArticle } from 'helpers/index'
import { SPACEFORCE_NEWS_RSS_URL } from 'constants/index'
import { useModalContext } from 'stores/modalContext'
import { Widget } from 'types/index'

// Load 2 items
const RSS_URL = `${SPACEFORCE_NEWS_RSS_URL}&max=2`

type NewsWidgetProps = {
  widget: Widget
}

const NewsWidget = (widget: NewsWidgetProps) => {
  const { updateModalId, updateModalText, modalRef, updateWidget } =
    useModalContext()
  const { items, fetchItems } = useRSSFeed(RSS_URL)

  useEffect(() => {
    fetchItems()
  }, [])

  /** Remove section */
  // Show confirmation modal
  const handleConfirmRemoveSection = () => {
    updateModalId('removeNewsSectionModal')
    updateModalText({
      headingText: 'Are you sure you’d like to delete this section?',
      descriptionText:
        'You can re-add it to your My Space from the Add Section menu.',
    })

    const widgetState: Widget = {
      _id: widget.widget._id,
      title: widget.widget.title,
      type: 'News',
    }

    updateWidget(widgetState)

    modalRef?.current?.toggleModal(undefined, true)
  }

  return (
    <>
      <WidgetWithSettings
        className={styles.newsWidget}
        header={<h3>Recent News</h3>}
        settingsItems={[
          <Button
            key="newsWidgetSettingsMenu_remove"
            type="button"
            className={styles.collectionSettingsDropdown}
            onClick={handleConfirmRemoveSection}>
            Remove this section
          </Button>,
        ]}>
        {items
          .filter(validateNewsItems)
          .map((item) => formatRssToArticle(item as Required<RSSNewsItem>))
          .map((item, i) => (
            <NewsItem
              key={`newsWidgetItem_${i}_${item.id}`}
              article={item}
              widget={true}
            />
          ))}

        <div style={{ textAlign: 'right' }}>
          <LinkTo
            href="/news-announcements"
            className="usa-button usa-button--outline">
            View all
          </LinkTo>
        </div>
      </WidgetWithSettings>
    </>
  )
}

export default NewsWidget
