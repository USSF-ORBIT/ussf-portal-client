import { Grid, GridContainer } from '@trussworks/react-uswds'
import React from 'react'
import { Widget } from 'types'
import LinkTo from 'components/util/LinkTo/LinkTo'
import { Button } from '@trussworks/react-uswds'
import { WidgetWithSettings } from 'components/Widget/Widget'
import styles from './FeaturedShortcuts.module.scss'
import { useAnalytics } from 'stores/analyticsContext'
import { useModalContext } from 'stores/modalContext'
import type { featuredShortcutItems } from 'types'

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
      <ul className={styles.featuredShortcutsRow + ' grid-row grid-gap'}>
        {featuredShortcuts.map((a) => {
          return (
            // #TODO fix missing grid gap between columns
            <li
              key={'widget_shortcut_' + a.title}
              className={styles.featuredShortcutsItem + ' grid-col-3'}>
              <LinkTo href={a.url}>
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
