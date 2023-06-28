import React, { useRef } from 'react'
import Slider from 'react-slick'
import { Button } from '@trussworks/react-uswds'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import styles from './GuardianIdealCarousel.module.scss'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import GuardianIdealItem from './GuardianIdealItem'
import { WidgetWithSettings } from 'components/Widget/Widget'
import { IdealListItem, Widget } from 'types'
import { useAnalytics } from 'stores/analyticsContext'
import { useModalContext } from 'stores/modalContext'

const CustomEllipse = ({ onClick }: any) => {
  return (
    <div className="news-carousel-container">
      <button
        onClick={onClick}
        type="button"
        title="slide"
        className={styles.newsCarouselEllipse}
      />
    </div>
  )
}

const GuardianIdealCarousel = ({
  ideals,
  widget,
}: {
  ideals: IdealListItem[]
  widget: Widget
}) => {
  const { updateModalId, updateModalText, modalRef, updateWidget } =
    useModalContext()
  const { trackEvent } = useAnalytics()

  const sliderRef = useRef<Slider>(null)

  const settings = {
    dots: true,
    fade: true,
    accessibility: true,
    adaptiveHeight: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    dotsClass: `slick-dots ${styles.dots}`,
    appendDots: (dots: React.ReactNode) => {
      return (
        <div>
          <button
            type="button"
            className={styles.carouselArrow}
            aria-label="previous guardian ideal"
            data-testid="slick-prev"
            onClick={() => {
              trackEvent(
                'Guardian Ideal Carousel',
                'View next/previous',
                'Click next/previous'
              )
              if (sliderRef.current) {
                return sliderRef.current.slickPrev()
              }
            }}>
            <FontAwesomeIcon size="lg" icon="angle-left" />
          </button>
          <ul
            style={{
              margin: '0px',
            }}>
            {' '}
            {dots}{' '}
          </ul>
          <button
            type="button"
            className={styles.carouselArrow}
            aria-label="next guardian ideal"
            data-testid="slick-next"
            onClick={() => {
              trackEvent(
                'Guardian Ideal Carousel',
                'View next/previous',
                'Click next/previous'
              )
              if (sliderRef.current) {
                return sliderRef.current.slickNext()
              }
            }}>
            <FontAwesomeIcon size="lg" icon="angle-right" />
          </button>
        </div>
      )
    },
    customPaging: () => <CustomEllipse />,
  }

  const handleConfirmRemoveWidget = () => {
    updateModalId('removeGuardianIdealWidgetModal')
    updateModalText({
      headingText: 'Are you sure you’d like to delete this widget?',
      descriptionText:
        'You can re-add it to your My Space from the Add Widget menu.',
    })

    const widgetState: Widget = {
      _id: widget._id,
      title: widget.title,
      type: 'GuardianIdeal',
    }

    updateWidget(widgetState)

    modalRef?.current?.toggleModal(undefined, true)
  }

  return (
    <WidgetWithSettings
      header="Guardian Ideals"
      className={styles.guardianIdealCarousel}
      settingsItems={[
        <Button
          key="newsWidgetSettingsMenu_remove"
          type="button"
          className={styles.collectionSettingsDropdown}
          onClick={handleConfirmRemoveWidget}>
          Remove Guardian Ideal widget
        </Button>,
      ]}>
      <h3 className="usa-sr-only">Guardian Ideals</h3>
      <Slider
        ref={sliderRef}
        className={styles.carouselContainer}
        {...settings}>
        {ideals.map((ideal: IdealListItem, index: number) => {
          return <GuardianIdealItem key={index} ideal={ideal} />
        })}
      </Slider>
    </WidgetWithSettings>
  )
}

export default GuardianIdealCarousel
