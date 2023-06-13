import type {
  GetServerSideProps,
  GetServerSidePropsContext,
  GetServerSidePropsResult,
} from 'next'

import { getSession } from 'lib/session'
import { SessionUser } from 'types'

type WithAuthServerSidePropsResult = GetServerSidePropsResult<{
  user: SessionUser
  [key: string]: any
}>

// Server-side only
export const requireAuth = (getServerSidePropsFunc?: GetServerSideProps) => {
  return async (
    ctx: GetServerSidePropsContext
  ): Promise<WithAuthServerSidePropsResult> => {
    const { req, res } = ctx

    if (!req || !res) {
      throw new Error('requireAuth can only be called from the server')
    }

    try {
      const session = await getSession(req, res)

      if (!session || !session.passport || !session.passport.user) {
        return {
          redirect: {
            destination: '/login',
            permanent: false,
          },
        }
      }

      if (getServerSidePropsFunc) {
        const pageProps = await getServerSidePropsFunc(ctx)

        if ('redirect' in pageProps) {
          return pageProps
        } else if ('notFound' in pageProps) {
          return pageProps
        }

        return {
          props: {
            ...pageProps.props,
            user: session.passport.user,
          },
        }
      }

      return {
        props: {
          user: session.passport.user,
        },
      }
    } catch (e) {
      // TODO - handle the error
      console.error('error getting session', e)

      return {
        redirect: {
          destination: '/login',
          permanent: false,
        },
      }
    }
  }
}
