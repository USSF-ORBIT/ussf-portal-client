import React from 'react'
import Slider from 'react-slick'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import styles from './AnnouncementCarousel.module.scss'
import AnnouncementInfo from 'components/AnnouncementInfo/AnnouncementInfo'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import { AnnouncementRecord } from 'types'

type CustomEllipseProps = {
  onClick?: () => void
}

type CustomArrowProps = {
  onClick?: () => void
}

const CustomEllipse = ({ onClick }: CustomEllipseProps) => {
  return (
    <div className="announcement-carousel-container">
      <button
        onClick={onClick}
        type="button"
        title="slide"
        className={styles.carouselEllipse}
        aria-hidden="true"
      />
    </div>
  )
}

const NextArrow = ({ onClick }: CustomArrowProps) => {
  return (
    <div className={styles.carouselArrow}>
      <FontAwesomeIcon icon="angle-right" onClick={onClick} />
    </div>
  )
}

const PrevArrow = ({ onClick }: CustomArrowProps) => {
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
    adaptiveHeight: true,
    accessibility: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    dotsClass: `slick-dots ${styles.dots}`,
    appendDots: (dots: React.ReactNode) => {
      return (
        <div style={{ bottom: '-30px' }}>
          <ul style={{ margin: '0px', paddingLeft: '0px' }}> {dots} </ul>
        </div>
      )
    },
    customPaging: () => <CustomEllipse />,
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
