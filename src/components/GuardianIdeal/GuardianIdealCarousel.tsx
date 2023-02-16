import React, { useRef } from 'react'
import Slider from 'react-slick'
import { Button } from '@trussworks/react-uswds'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import styles from './GuardianIdealCarousel.module.scss'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import GuardianIdealItem from './GuardianIdealItem'
import { WidgetWithSettings } from 'components/Widget/Widget'
import { ArticleListItemRecord, Widget } from 'types'
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
  articles,
  widget,
}: {
  articles: ArticleListItemRecord[]
  widget: Widget
}) => {
  const { updateModalId, updateModalText, modalRef, updateWidget } =
    useModalContext()
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
            data-testid="slick-prev"
            onClick={() => {
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
            data-testid="slick-next"
            onClick={() => {
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

  const handleConfirmRemoveSection = () => {
    updateModalId('removeSectionModal')
    updateModalText({
      headingText: 'Are you sure you’d like to delete this section?',
      descriptionText:
        'You can re-add it to your My Space from the Add Section menu.',
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
      className={styles.guardianIdealCarousel}
      settingsItems={[
        <Button
          key="newsWidgetSettingsMenu_remove"
          type="button"
          className={styles.collectionSettingsDropdown}
          onClick={handleConfirmRemoveSection}>
          Remove Guardian Ideal section
        </Button>,
      ]}>
      <Slider
        ref={sliderRef}
        className={styles.carouselContainer}
        {...settings}>
        {articles.map((article: ArticleListItemRecord, index: number) => {
          return <GuardianIdealItem key={index} article={article} />
        })}
      </Slider>
    </WidgetWithSettings>
  )
}

export default GuardianIdealCarousel
