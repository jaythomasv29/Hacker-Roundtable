import type { NextPage } from 'next'
import Head from 'next/head'
import { sanityClient, urlFor } from '../sanity'
import Header from '../components/Header'
import { Post } from '../typings';
import Link from 'next/link';

interface Props {
  posts: [Post];
}


function Home({ posts }: Props) {
  console.log(posts);
  
  return (
    <div className="max-w-7xl mx-auto">
      <Head>
        <title>Hackathon Roundtable</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />

      <div className='flex justify-between items-center bg-yellow-400 border-y border-black py-10 lg:py-0'>
        <div className='px-10 space-y-5'>
          <h1 className='text-6xl max-w-xl font-serif'><span className='underline decoration-black decoration-4'>Hacker Roundtable</span> is a place to write, comment and connect</h1>
          <h2>A live community to comment on latest news regarding the latest on Hackathon and Technology with thousands of readers</h2>
        </div>
        <p className="hidden md:inline-flex h-32 lg:h-full pr-8 font-serif text-9xl">(HR)</p>
      </div>
      {/* POSTS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6 p2 md:p-6">
        { posts.map(post => (
          <Link key={post._id} href={`/${post.slug.current}`}>
            <div className="border rounded-lg group cursor-pointer overflow-hidden">
              { post.mainImage && 
                <img className="h-60 w-full object-cover group-hover:scale-105 transition-transform duration-200 ease-in-out" src={urlFor(post.mainImage).url()} alt={post.description}/>}
                <div className="flex justify-between p-5 bg-slate-50">
                  <div>
                    <p className="text-lg">{post.title}</p>
                    <p className="font-bold">{post.description} by {post.author.name}</p>
                  </div>
                  <img 
                    className="h-12 w-12 rounded-full"
                    src={ urlFor(post.author.image).url()! } alt={`${post.author.image} portrait`} />
                  </div>
            </div>
          </Link>
        ))}
      </div>
</div>
  )
}

export default Home

export const getServerSideProps = async () => {
  const query = `*[_type == "post"] {
    _id,
    title,
    slug,
    author -> {
    name,
    image,
  },
  description,
  mainImage,
  slug
  }`;

  const posts = await sanityClient.fetch(query)

  return {
    props: {
      posts,
    },
  }
}