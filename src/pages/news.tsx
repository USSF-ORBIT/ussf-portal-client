import { useEffect, useState } from 'react'
import { GridContainer, Grid, CardGroup } from '@trussworks/react-uswds'
import AnnouncementCard from 'components/MVP/AnnouncementCard/AnnouncementCard'
import LinkTo from 'components/util/LinkTo/LinkTo'
import Loader from 'components/Loader'
import { useUser } from 'hooks/useUser'

const RSS_URL = `https://www.spaceforce.mil/DesktopModules/ArticleCS/RSS.ashx?ContentType=1&Site=1060&max=10`

type NewsItem = {
  desc?: string
  date?: string
  link?: string
  title?: string
}

export const NewsArticle = ({ date, link, title, desc }: NewsItem) => (
  <article>
    <p className="heading--small margin-top-3">{date}</p>
    <LinkTo
      className="usa-link usa-prose display-inline-block margin-top-1 text-no-underline hover:text-underline"
      href={link || ''}>
      <h3 className="font-heading-lg text-bold">{title}</h3>
    </LinkTo>
    <p>{desc}</p>
  </article>
)

const News = () => {
  const { user } = useUser()

  const [newsItems, setNewsItems] = useState<NewsItem[]>([])

  // Fetch RSS items on load
  useEffect(() => {
    fetch(RSS_URL)
      .then((resp) => resp.text())
      .then((str) => new window.DOMParser().parseFromString(str, 'text/xml'))
      .then((data) => {
        const items = data.querySelectorAll('item')
        const newsObjects: NewsItem[] = []
        items.forEach((el) => {
          const desc = el
            .querySelector('description')
            ?.innerHTML.split('&lt;br')[0]

          const date = el.querySelector('pubDate')?.textContent || ''
          const formattedDate =
            date &&
            new Date(date)
              .toLocaleString('en-US', {
                day: '2-digit',
                month: 'short',
                year: 'numeric',
              })
              .toUpperCase()
          const link = el.querySelector('link')?.textContent || ''
          const title = el.querySelector('title')?.textContent || ''

          newsObjects.push({
            desc,
            date: formattedDate,
            link,
            title,
          })
        })

        setNewsItems(newsObjects)
      })
      .catch(() => {
        // Error displaying RSS articles
        console.error('Error displaying RSS feed')
      })
  }, [RSS_URL])

  return !user ? (
    <Loader />
  ) : (
    <>
      <section className="usa-section bg-news text-white">
        <div className="usa-prose grid-container">
          <span className="text-uppercase text-ls-3 text-orange-warm-30v text-bold">
            News
          </span>
          <h1 className="page-header">What’s New</h1>
        </div>
      </section>

      <section className="usa-section">
        <GridContainer>
          <Grid row gap>
            <Grid desktop={{ col: 10 }}>
              <div className="page-news-feed usa-prose">
                <h2 className="section-header">Announcements</h2>
                <CardGroup className="card-group--feature margin-top-4">
                  <AnnouncementCard
                    heading="Space Force rank names"
                    tag="news"
                    cols={true}
                    bgColor="gradient--orange bg-accent-warm-dark"
                    path="https://www.spaceforce.mil/News/Article/2487814/space-force-releases-service-specific-rank-names/"
                  />
                  <AnnouncementCard
                    heading="Officer stratification guidance changed"
                    tag="news"
                    cols={true}
                    bgColor="gradient--orange bg-accent-warm-dark"
                    path="https://www.spaceforce.mil/News/Article/2519922/air-force-announces-officer-stratification-guidance/"
                  />
                  <AnnouncementCard
                    heading="Chief of Space Operations’ Planning Guidance"
                    tag="news"
                    cols={true}
                    bgColor="gradient--orange bg-accent-warm-dark"
                    path="https://media.defense.gov/2020/Nov/09/2002531998/-1/-1/0/CSO%20PLANNING%20GUIDANCE.PDF"
                  />
                </CardGroup>

                <h2 className="section-header">News</h2>
                <Grid tablet={{ col: 9 }} className="margin-top-4">
                  {newsItems.map((newsItem, i) => (
                    <NewsArticle key={`newsItem_${i}`} {...newsItem} />
                  ))}
                </Grid>
              </div>
            </Grid>
          </Grid>
        </GridContainer>
      </section>
    </>
  )
}

export default News
