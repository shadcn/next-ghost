import Link from "next/link"

import { getPosts } from "../lib/ghost"

// I want this page to refetch data on every visit.
// revalidate = 0 means I'm telling Next.js to refetch data for this page
// for every visit.
export const revalidate = 0

export default async function Home() {
  const posts = await getPosts()

  return (
    <div>
      {posts?.length ? (
        <div>
          {posts.map((post) => (
            <article key={post.id}>
              <Link href={`/posts/${post.slug}`}>
                <h2>{post.title}</h2>
              </Link>
              {post.excerpt && <p>{post.excerpt}</p>}
            </article>
          ))}
        </div>
      ) : (
        <p>No posts found</p>
      )}
    </div>
  )
}
