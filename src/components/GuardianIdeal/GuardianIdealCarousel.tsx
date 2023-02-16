import React, { useRef } from 'react'
import Slider from 'react-slick'
import { Button } from '@trussworks/react-uswds'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import styles from './GuardianIdealCarousel.module.scss'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import GuardianIdealItem from './GuardianIdealItem'
import { WidgetWithSettings } from 'components/Widget/Widget'
import { ArticleListItemRecord } from 'types'

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
}: {
  articles: ArticleListItemRecord[]
}) => {
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
    console.log('Remove Guardian Ideal')
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
          Remove this section
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
