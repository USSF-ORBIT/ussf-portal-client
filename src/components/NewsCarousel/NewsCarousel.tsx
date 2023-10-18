import React, { useRef } from 'react'
import Slider from 'react-slick'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import styles from './NewsCarousel.module.scss'
import NewsCarouselItem from 'components/NewsCarouselItem/NewsCarouselItem'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import { ArticleListItemRecord } from 'types'

type CustomEllipseProps = {
  onClick?: () => void
}

const CustomEllipse = ({ onClick }: CustomEllipseProps) => {
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

const NewsCarousel = ({ articles }: { articles: ArticleListItemRecord[] }) => {
  const sliderRef = useRef<Slider>(null)

  const settings = {
    dots: true,
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
        <div
          style={{
            bottom: '-40px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingLeft: '8rem',
            paddingRight: '8rem',
          }}>
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
              paddingLeft: '0px',
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

  return (
    <Slider ref={sliderRef} className={styles.carouselContainer} {...settings}>
      {articles.map((article: ArticleListItemRecord, index: number) => {
        return <NewsCarouselItem key={index} article={article} />
      })}
    </Slider>
  )
}

export default NewsCarousel
