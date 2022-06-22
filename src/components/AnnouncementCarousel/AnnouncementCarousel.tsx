import React from 'react'
import Slider from 'react-slick'
import styles from './AnnouncementCarousel.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import AnnouncementInfo from 'components/AnnouncementInfo/AnnouncementInfo'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import { AnnouncementRecord } from 'types'

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

const AnnouncementCarousel = ({
  announcements,
}: {
  announcements: AnnouncementRecord[]
}) => {
  const settings = {
    dots: true,
    accessibility: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    appendDots: (dots: React.ReactNode) => {
      return (
        <div style={{ bottom: '10px' }}>
          <ul style={{ margin: '0px' }}> {dots} </ul>
        </div>
      )
    },
  }

  return (
    <Slider className={styles.carouselContainer} {...settings}>
      {announcements.map((announcement: AnnouncementRecord, index: number) => {
        return <AnnouncementInfo key={index} announcement={announcement} />
      })}
    </Slider>
  )
}

export default AnnouncementCarousel
