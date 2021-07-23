import { GridContainer, Grid, CardGroup } from '@trussworks/react-uswds'
import AnnouncementCard from 'components/MVP/AnnouncementCard/AnnouncementCard'
import LinkTo from 'components/util/LinkTo/LinkTo'

const News = () => {
  return (
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
                  news
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
