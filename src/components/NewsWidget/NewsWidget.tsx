import React, { useEffect } from 'react'
import { Button } from '@trussworks/react-uswds'
import Link from 'next/link'
import styles from './NewsWidget.module.scss'
import { WidgetWithSettings } from 'components/Widget/Widget'
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

  /** Remove widget */
  // Show confirmation modal
  const handleConfirmRemoveWidget = () => {
    updateModalId('removeNewsWidgetModal')
    updateModalText({
      headingText: 'Are you sure you’d like to delete this widget?',
      descriptionText:
        'You can re-add it to your My Space from the Add Widget menu.',
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
        header="Recent News"
        settingsItems={[
          <Button
            key="newsWidgetSettingsMenu_remove"
            type="button"
            className={styles.collectionSettingsDropdown}
            onClick={handleConfirmRemoveWidget}>
            Remove Recent News widget
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
          <Link
            href="/news-announcements"
            className="usa-button usa-button--outline">
            View all
          </Link>
        </div>
      </WidgetWithSettings>
    </>
  )
}

export default NewsWidget
