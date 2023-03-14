import { Grid } from '@trussworks/react-uswds'
import React from 'react'
import { Widget } from 'types'
import { Button } from '@trussworks/react-uswds'
import { WidgetWithSettings } from 'components/Widget/Widget'
import styles from '../GuardianIdeal/GuardianIdealCarousel.module.scss'
import { useAnalytics } from 'stores/analyticsContext'
import { useModalContext } from 'stores/modalContext'

type Apps = {
  title: string
  icon: string
}[]

const FeaturedShortcuts = ({
  apps,
  widget,
}: {
  widget: Widget
  apps: Apps
}) => {
  const { updateModalId, updateModalText, modalRef, updateWidget } =
    useModalContext()
  const { trackEvent } = useAnalytics()

  const handleConfirmRemoveSection = () => {
    updateModalId('removeFeaturedAppsSectionModal')
    updateModalText({
      headingText: 'Are you sure you’d like to delete this section?',
      descriptionText:
        'You can re-add it to your My Space from the Add Section menu.',
    })

    const widgetState: Widget = {
      _id: widget._id,
      title: widget.title,
      type: 'FeaturedApps',
    }

    updateWidget(widgetState)

    modalRef?.current?.toggleModal(undefined, true)
  }

  return (
    <WidgetWithSettings
      className={styles.guardianIdealCarousel}
      settingsItems={[
        <Button
          key="newsWidgetSettingsMenu_remove"
          type="button"
          className={styles.collectionSettingsDropdown}
          onClick={handleConfirmRemoveSection}>
          Remove Featured Apps section
        </Button>,
      ]}>
      <Grid row>
        <h3>Featured Shortcuts</h3>
        <ul>
          <li>LeaveWeb</li>
        </ul>
      </Grid>
    </WidgetWithSettings>
  )
}

export default FeaturedShortcuts
