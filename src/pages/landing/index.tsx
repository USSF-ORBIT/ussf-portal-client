import { withLandingPageLayout } from 'layout/DefaultLayout/LandingPageLayout'

const Landing = () => {
  return (
    <div>
      <h1>Landing Pages</h1>
    </div>
  )
}

export default Landing

Landing.getLayout = (page: JSX.Element) => withLandingPageLayout(page)
