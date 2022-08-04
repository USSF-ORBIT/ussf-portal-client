import React from 'react'
import Slider from 'react-slick'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import styles from './NewsCarousel.module.scss'
import NewsCarouselItem from 'components/NewsCarouselItem/NewsCarouselItem'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import { ArticleListItemRecord } from 'types'

const NextArrow = ({ onClick }: any) => {
  return (
    <div className={styles.carouselArrow}>
      <FontAwesomeIcon icon="angle-right" onClick={onClick} />
    </div>
  )
}

const PrevArrow = ({ onClick }: any) => {
  return (
    <div className={styles.carouselArrow}>
      <FontAwesomeIcon icon="angle-left" onClick={onClick} />
    </div>
  )
}

const NewsCarousel = ({ articles }: { articles: ArticleListItemRecord[] }) => {
  const settings = {
    dots: true,
    accessibility: true,
    adaptiveHeight: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    appendDots: (dots: React.ReactNode) => {
      return (
        <div style={{ bottom: '-20px' }}>
          <ul style={{ margin: '0px', paddingLeft: '0px' }}> {dots} </ul>
        </div>
      )
    },
  }

  return (
    <Slider className={styles.carouselContainer} {...settings}>
      {articles.map((article: ArticleListItemRecord, index: number) => {
        return <NewsCarouselItem key={index} article={article} />
      })}
    </Slider>
  )
}

export default NewsCarousel
