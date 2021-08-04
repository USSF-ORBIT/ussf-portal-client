import Head from 'next/head'
import { InferGetStaticPropsType } from 'next'

import { lists } from '.keystone/api'

const TestPage = ({
  posts,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <>
      <Head>
        <title>Space Force Portal | Test Page</title>
        <meta name="description" content="Test page description" />
      </Head>

      <main>USSF Portal test page!</main>

      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <h3>{post.title}</h3>
            <p>{post.content}</p>
          </li>
        ))}
      </ul>
    </>
  )
}

export default TestPage

export async function getStaticProps() {
  const posts = await lists.Post.findMany({ query: 'id title content' })
  return { props: { posts } }
}
