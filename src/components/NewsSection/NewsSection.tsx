import React, { useEffect, useRef } from 'react'
import { Button, ModalRef } from '@trussworks/react-uswds'

import styles from './NewsSection.module.scss'

import { WidgetWithSettings } from 'components/Widget/Widget'
import LinkTo from 'components/util/LinkTo/LinkTo'
import { useRSSFeed } from 'hooks/useRSSFeed'
import NewsListItem from 'components/NewsListItem/NewsListItem'
import type { RSSNewsItem } from 'types'
import { validateNewsItems, formatRssToArticle } from 'helpers/index'
import { SPACEFORCE_NEWS_RSS_URL } from 'constants/index'
import RemoveSectionModal from 'components/modals/RemoveSectionModal'
import { useAnalytics } from 'stores/analyticsContext'

// Load 2 items
const RSS_URL = `${SPACEFORCE_NEWS_RSS_URL}&max=2`

const NewsSection = ({ onRemove }: { onRemove: () => void }) => {
  const { items, fetchItems } = useRSSFeed(RSS_URL)
  const removeSectionModal = useRef<ModalRef>(null)
  const { trackEvent } = useAnalytics()

  useEffect(() => {
    fetchItems()
  }, [])

  /** Remove section */
  // Show confirmation modal
  const handleConfirmRemoveSection = () => {
    removeSectionModal.current?.toggleModal(undefined, true)
  }

  // After confirming remove, trigger the mutation and close the modal
  const handleRemoveSection = () => {
    trackEvent('Section settings', 'Remove this section', 'News')
    onRemove()
    removeSectionModal.current?.toggleModal(undefined, false)
  }

  // Cancel removing
  const handleCancelRemoveSection = () => {
    removeSectionModal.current?.toggleModal(undefined, false)
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
      <RemoveSectionModal
        modalRef={removeSectionModal}
        onCancel={handleCancelRemoveSection}
        onDelete={handleRemoveSection}
      />
    </>
  )
}

export default NewsSection
