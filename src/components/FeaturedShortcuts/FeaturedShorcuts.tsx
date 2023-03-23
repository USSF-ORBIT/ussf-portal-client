import React from 'react'
import { Button } from '@trussworks/react-uswds'
import styles from './FeaturedShortcuts.module.scss'
import type { Widget, featuredShortcutItems } from 'types'
import LinkTo from 'components/util/LinkTo/LinkTo'
import { WidgetWithSettings } from 'components/Widget/Widget'
import { useModalContext } from 'stores/modalContext'
import { useAnalytics } from 'stores/analyticsContext'

const FeaturedShortcuts = ({
  featuredShortcuts,
  widget,
}: {
  widget: Widget
  featuredShortcuts: featuredShortcutItems
}) => {
  const { updateModalId, updateModalText, modalRef, updateWidget } =
    useModalContext()
  const { trackEvent } = useAnalytics()

  const handleConfirmRemoveSection = () => {
    updateModalId('removeFeaturedShortcutsSectionModal')
    updateModalText({
      headingText: 'Are you sure you’d like to delete this section?',
      descriptionText:
        'You can re-add it to your My Space from the Add Section menu.',
    })

    const widgetState: Widget = {
      _id: widget._id,
      title: widget.title,
      type: 'FeaturedShortcuts',
    }

    updateWidget(widgetState)

    modalRef?.current?.toggleModal(undefined, true)
  }

  const handleEventTracking = (clickedShortcut) => {
    trackEvent(
      'Featured Shortcuts',
      'Click on a featured shortcut',
      'Click icon',
      clickedShortcut.title
    )
  }

  return (
    <WidgetWithSettings
      header={<h3>Featured Shortcuts</h3>}
      className={styles.featuredShortcuts}
      settingsItems={[
        <Button
          key="newsWidgetSettingsMenu_remove"
          type="button"
          onClick={handleConfirmRemoveSection}>
          Remove Featured Shortcuts section
        </Button>,
      ]}>
      <ul className={styles.featuredShortcutsRow}>
        {featuredShortcuts.map((a) => {
          return (
            <li
              key={'widget_shortcut_' + a.title}
              className={styles.featuredShortcutsItem}>
              <LinkTo
                href={a.url}
                target="_blank"
                onClick={() => handleEventTracking(a)}>
                <img src={a.icon} alt="" />
                {a.title}
              </LinkTo>
            </li>
          )
        })}
      </ul>
    </WidgetWithSettings>
  )
}

export default FeaturedShortcuts
