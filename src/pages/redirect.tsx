import { useUser } from 'hooks/useUser'
import Loader from 'components/Loader/Loader'
import { withArticleLayout } from 'layout/DefaultLayout/ArticleLayout'
import { Redirect } from 'components/Redirect/Redirect'

const RedirectPage = ({ redirectTo }: { redirectTo: string }) => {
  const { loading } = useUser()

  // we only want to redirect folks who are signed in
  return loading ? (
    <Loader />
  ) : (
    <>
      <meta httpEquiv="refresh" content={`5;URL='${redirectTo}'`} />
      <Redirect redirectTo={redirectTo} />
    </>
  )
}

export default RedirectPage

RedirectPage.getLayout = withArticleLayout

export async function getServerSideProps(context: {
  query: { redirectPath: string }
}) {
  const { redirectPath } = context.query
  // This page is generically named but for now only redirects to the CMS
  // we could pass in a parameter to redirect to other places if the need
  // should arise.
  //
  // Only allow url to cms `process.env.KEYSTONE_PUBLIC_URL`
  if (process.env.KEYSTONE_PUBLIC_URL !== '') {
    // check if we have a redirectPath and it's a relative path
    if (redirectPath && redirectPath !== '' && redirectPath.startsWith('/')) {
      // create absolute path to keystone with redirectPath
      const finalUrlTo = `${process.env.KEYSTONE_PUBLIC_URL}${redirectPath}`
      return {
        props: {
          redirectTo: finalUrlTo,
          pageTitle: 'Redirect',
        },
      }
    } else {
      // No redirect path send them to the root url
      return {
        props: {
          redirectTo: process.env.KEYSTONE_PUBLIC_URL,
          pageTitle: 'Redirect',
        },
      }
    }
  } else {
    // if we don't know where to send them send them to the 404
    return {
      notFound: true,
    }
  }
}
