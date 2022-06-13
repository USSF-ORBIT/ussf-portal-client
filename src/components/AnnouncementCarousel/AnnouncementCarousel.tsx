import React from 'react'
import Slider from 'react-slick'
// import { InferGetStaticPropsType } from 'next'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import styles from './AnnouncementCarousel.module.scss'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

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

const AnnouncementCarousel = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  }

  const announcements = [
    {
      date: 'Today 14:00 GMT',
      title: 'Space Force releases service-specific rank names',
      body: 'Effective Feb. 1, the Space Force will use the following rank names across all Space Force systems and in all manners of address.',
    },
    {
      date: 'Today 8:00 GMT',
      title: 'Space Force is doing something',
      body: 'Effective Feb. 1, the Space Force will use the following rank names across all Space Force systems and in all manners of address.',
    },
  ]
  return (
    <Slider className={styles.carouselContainer} {...settings}>
      {announcements.map(({ date, title, body }, index) => {
        return (
          <React.Fragment key={index}>
            <h4 className={styles.date}>{date}</h4>
            <label className={styles.title}>{title}</label>
            <div className={styles.body}>{body}</div>
          </React.Fragment>
        )
      })}
    </Slider>
  )
}

export default AnnouncementCarousel

// export function getStaticProps() {
//   const announcements = [
//     {
//       date: 'Today 14:00 GMT',
//       title: 'Space Force releases service-specific rank names',
//       body: 'Effective Feb. 1, the Space Force will use the following rank names across all Space Force systems and in all manners of address.',
//     },
//   ]

//   return {
//     props: {
//       announcements,
//     },
//   }
// }
