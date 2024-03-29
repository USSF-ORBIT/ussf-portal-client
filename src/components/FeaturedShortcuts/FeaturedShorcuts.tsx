import React from 'react'
import { Button } from '@trussworks/react-uswds'
import Link from 'next/link'
import styles from './FeaturedShortcuts.module.scss'
import type { Widget, featuredShortcutItems } from 'types'
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

  const handleConfirmRemoveWidget = () => {
    updateModalId('removeFeaturedShortcutsWidgetModal')
    updateModalText({
      headingText: 'Are you sure you’d like to delete this widget?',
      descriptionText:
        'You can re-add it to your My Space from the Add Widget menu.',
    })

    const widgetState: Widget = {
      _id: widget._id,
      title: widget.title,
      type: 'FeaturedShortcuts',
    }

    updateWidget(widgetState)

    modalRef?.current?.toggleModal(undefined, true)
  }

  const handleEventTracking = (clickedShortcutTitle: string) => {
    trackEvent(
      'Featured Shortcuts',
      'Click on a featured shortcut',
      'Click icon',
      clickedShortcutTitle
    )
  }

  return (
    <WidgetWithSettings
      header="Featured Shortcuts"
      className={styles.featuredShortcuts}
      settingsItems={[
        <Button
          key="newsWidgetSettingsMenu_remove"
          type="button"
          onClick={handleConfirmRemoveWidget}>
          Remove Featured Shortcuts widget
        </Button>,
      ]}>
      <ul className={styles.featuredShortcutsRow}>
        {featuredShortcuts.map((a) => {
          return (
            <li
              key={'widget_shortcut_' + a.title}
              className={styles.featuredShortcutsItem}>
              <Link
                href={a.url}
                target="_blank"
                onClick={() => handleEventTracking(a.title)}
                data-testid="featured-shortcut-link">
                <img src={a.icon} alt="" />
                {a.title}
                <span className="usa-sr-only">(opens in a new window)</span>
              </Link>
            </li>
          )
        })}
      </ul>
    </WidgetWithSettings>
  )
}

export default FeaturedShortcuts
