import React, { useEffect, useRef } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Button } from '@trussworks/react-uswds'

import styles from './NewsSection.module.scss'

import LinkTo from 'components/util/LinkTo/LinkTo'
import DropdownMenu from 'components/DropdownMenu/DropdownMenu'
import { useCloseWhenClickedOutside } from 'hooks/useCloseWhenClickedOutside'
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

  // Collection settings dropdown state
  const dropdownEl = useRef<HTMLDivElement>(null)
  const [isDropdownOpen, setIsDropdownOpen] = useCloseWhenClickedOutside(
    dropdownEl,
    false
  )

  // Toggle the dropdown menu
  const menuOnClick = () => {
    setIsDropdownOpen(!isDropdownOpen)
  }

  const handleRemoveWidget = () => {
    //
  }

  return (
    <div className={styles.collection}>
      <div className={styles.header}>
        <h3>Recent News</h3>
        <DropdownMenu
          toggleEl={
            <button
              type="button"
              className={styles.dropdownMenuToggle}
              onClick={menuOnClick}
              aria-label="Collection Settings">
              <FontAwesomeIcon icon="cog" />
            </button>
          }
          dropdownRef={dropdownEl}
          align="right"
          isActive={isDropdownOpen}>
          <Button
            type="button"
            className={styles.collectionSettingsDropdown}
            onClick={handleRemoveWidget}>
            Delete this collection
          </Button>
        </DropdownMenu>
      </div>

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
    </div>
  )
}

export default NewsSection
