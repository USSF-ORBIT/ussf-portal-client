import React, { useEffect } from 'react'
import { Button } from '@trussworks/react-uswds'

import styles from './NewsWidget.module.scss'

import { WidgetWithSettings } from 'components/Widget/Widget'
import LinkTo from 'components/util/LinkTo/LinkTo'
import { useRSSFeed } from 'hooks/useRSSFeed'
import NewsListItem from 'components/NewsListItem/NewsListItem'
import type { RSSNewsItem } from 'types'
import { validateNewsItems, formatRssToArticle } from 'helpers/index'
import { SPACEFORCE_NEWS_RSS_URL } from 'constants/index'

// Load 2 items
const RSS_URL = `${SPACEFORCE_NEWS_RSS_URL}&max=2`

const NewsWidget = ({ onRemove }: { onRemove: () => void }) => {
  const { items, fetchItems } = useRSSFeed(RSS_URL)

  useEffect(() => {
    fetchItems()
  }, [])

  return (
    <WidgetWithSettings
      className={styles.newsWidget}
      header={<h3>Recent News</h3>}
      settingsItems={[
        <Button
          key="newsWidgetSettingsMenu_remove"
          type="button"
          className={styles.collectionSettingsDropdown}
          onClick={onRemove}>
          Remove this section
        </Button>,
      ]}>
      {items
        .filter(validateNewsItems)
        .map((item) => formatRssToArticle(item as Required<RSSNewsItem>))
        .map((item, i) => (
          <NewsListItem
            key={`newsWidgetItem_${i}_${item.id}`}
            article={item}
            widget={true}
          />
        ))}

      <div style={{ textAlign: 'right' }}>
        <LinkTo href="/news" className="usa-button usa-button--outline">
          View all
        </LinkTo>
      </div>
    </WidgetWithSettings>
  )
}

export default NewsWidget
