import Link from "next/link"

import { getPostBySlug, getPosts } from "../../../lib/ghost"

// This page does not export a revalidate or dynamic property.
// This means this page is indefinitely cached.
// This is same as getStaticProps.

// This replaces getStaticPaths.
export async function generateStaticParams() {
  const posts = await getPosts()

  return posts?.map((post) => ({
    slug: post.slug?.split("/"),
  }))
}

export default async function PostPage(props) {
  const post = await getPostBySlug(props?.params?.slug)

  if (!post) {
    return null
  }

  return (
    <article>
      <Link href="/">Back</Link>
      <h1>{post.title}</h1>
      {post?.html && <div dangerouslySetInnerHTML={{ __html: post.html }} />}
    </article>
  )
}
