import React, { useEffect } from 'react'
import { Button } from '@trussworks/react-uswds'

import styles from './NewsSection.module.scss'

import { SectionWithSettings } from 'components/Section/Section'
import LinkTo from 'components/util/LinkTo/LinkTo'
import { useRSSFeed, RSSNewsItem } from 'hooks/useRSSFeed'
import NewsListItem, {
  NewsListItemArticle,
} from 'components/NewsListItem/NewsListItem'

const RSS_URL = `https://www.spaceforce.mil/DesktopModules/ArticleCS/RSS.ashx?ContentType=1&Site=1060&max=2`

const validateNewsItems = (item: RSSNewsItem): boolean => {
  return !!(item.id && item.desc && item.date && item.link && item.title)
}

const formatRssToArticle = (
  item: Required<RSSNewsItem>
): NewsListItemArticle => {
  return {
    id: item.id,
    title: item.title,
    sourceLink: item.link,
    description: item.desc,
    publishDate: item.date,
    thumbnailSrc: item.image,
    source: 'RSS',
    sourceName: 'SPACEFORCE.mil',
  }
}

const NewsSection = () => {
  const { items, fetchItems } = useRSSFeed(RSS_URL)

  useEffect(() => {
    fetchItems()
  }, [])

  const handleRemoveSection = () => {
    // TODO
  }

  return (
    <SectionWithSettings
      className={styles.newsSection}
      header={<h3>Recent News</h3>}
      settingsItems={[
        <Button
          key="newsSectionSettingsMenu_remove"
          type="button"
          className={styles.collectionSettingsDropdown}
          onClick={handleRemoveSection}>
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
    </SectionWithSettings>
  )
}

export default NewsSection
