import { sanityClient, urlFor } from '../sanity'
import { Post } from '../typings'
import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import { GetStaticProps } from 'next'
import PortableText from 'react-portable-text'
import { useForm, SubmitHandler } from 'react-hook-form'
import { useRouter } from 'next/router'
interface Props {
  post: Post
}
interface IFormInput {
  _id: string;
  name: string;
  email: string;
  comment: string;
}

function Post({ post }: Props) {
  const router = useRouter();
  const [submitted, setSubmitted] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm<IFormInput>();

  const refreshData = () => {
    router.replace(router.asPath)
  }
  // useEffect to keep track of submitted state and allow for resubmission
  useEffect(() => {
    if (submitted) {
      setInterval(() => {
        setSubmitted(!submitted)
      }, 3000)
    }
  }, [submitted])

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    try {
      console.log('data', data)
      await fetch("/api/createComment", {
        method: "POST",
        body: JSON.stringify(data),
      }).then(() => {
        setSubmitted(!submitted)
        console.log('submitted', isSubmitSuccessful);

        reset({
          name: '',
          email: '',
          comment: '',
        }); // asynchronously reset your form values

      })
      refreshData()
    } catch (e) {
      if (e) console.log(e)
    }


  }
  return (
    <main>
      <Header />
      <div className="p-8 mx-auto max-w-7xl">
        <img
          className="h-40 w-full object-cover"
          src={urlFor(post.mainImage).url()!}
          alt=""
        />
        <article className="mx-auto max-w-3xl">
          <h1 className="mt-10 mb-3 text-3xl">{post.title}</h1>
          <h2 className="mb-2 text-xl font-light text-gray-500">
            {post.description}
          </h2>
          <div className="flex items-center space-x-2">
            <img
              className="h-10 w-10 rounded-full"
              src={urlFor(post.author.image).url()!}
              alt={post.author.name}
            />
            <p className="text-sm text-gray-400">
              Blog post by{' '}
              <span className="text-green-600">{post.author.name} </span>-
              Published at {new Date(post._createdAt).toLocaleString()}
            </p>
          </div>
          <div className="mt-10 ">
            <PortableText
              className='flex flex-col space-y-2'
              dataset={process.env.NEXT_PUBLIC_SANITY_DATASET!}
              projectId={process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!}
              content={post.body}
              serializers={{
                h1: (props: any) => (
                  <h1 className="my-5 text-2xl font-bold" {...props} />
                ),
                h2: (props: any) => (
                  <h1 className="my-5 text-xl font-bold" {...props} />
                ),
                li: ({ children }: any) => (
                  <li className="ml-4 list-disc">{children}</li>
                ),
                link: ({ href, children }: any) => (
                  <a href={href} className="text-blue-500 hover:underline">
                    {children}
                  </a>
                ),
              }}
            />
          </div>
        </article>
        <hr className="my-5 mx-auto max-w-xl border border-slate-400" />
        {submitted ? (
          <div className="flex flex-col p-10 my-10 bg-green-500 text-white max-w-3xl mx-auto space-y-3">
            <h3 className="text-3xl font-bold">Your comment has been submitted!</h3>
            <p className="ml-3">Your comment should appear below!</p>
          </div>
        ) :
          <form onSubmit={handleSubmit(onSubmit)} className="mx-auto mb-10 flex max-w-2xl flex-col p-5">
            <h3 className="text-md mb-3 text-green-600">Enjoyed this article?</h3>
            <h4 className="text-3xl font-bold">Leave a comment below!</h4>
            <hr className="mt-2 py-3" />
            <input
              {...register("_id")}
              type="hidden"
              name="_id"
              value={post._id}
            />

            <label className="mb-5 block">
              {errors.name && (
                <p className="text-xs text-red-500">The Name Field is required</p>
              )}
              <span className="text-gray-700">Name</span>
              <input
                {...register("name", { required: true })}
                className="form-input mt-1 block w-full rounded border py-2 px-3 shadow outline-none ring-green-200 focus:ring"
                type="text"
                placeholder="John Appleseed"
              />
            </label>

            <label className="mb-5 block">
              {errors.email && (
                <p className="text-xs text-red-500">The Email Field is required</p>
              )}
              <span className="text-gray-700">Email</span>
              <input
                {...register("email", { required: true })}
                className="form-input mt-1 block w-full rounded border py-2 px-3 shadow outline-none ring-green-200 focus:ring"
                type="email"
                placeholder="John Appleseed"
              />
            </label>

            <label className="mb-5 block">
              {errors.comment && (
                <p className="text-xs text-red-500">The Comment Field is required</p>
              )}
              <span className="text-gray-700">Comment</span>
              <textarea
                {...register("comment", { required: true })}
                className="form-textarea mt-1 block w-full rounded border py-2 px-3 shadow outline-none ring-green-200 focus:ring"
                placeholder="John Appleseed"
                rows={8}
              />
            </label>
            {/* errors will return when the field validation field */}
            <div className="flex flex-col p-5">
              {errors.name && (
                <span className="text-xs text-red-500">Name Field is required</span>
              )}
              {errors.email && (
                <span className="text-xs text-red-500">Email Field is required</span>
              )}
              {errors.comment && (
                <span className="text-xs text-red-500"> Comment Field is required</span>
              )}
            </div>
            <input type="submit" className="shadow bg-green-500 hover:bg-green-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-b rounded cursor-pointer" value="Submit" />
          </form>
        }
      </div>
      {/* Comments */}
      <section className="flex flex-col p-10 my-10 max-w-2xl mx-auto shadow-slate-300 shadow space-y-2">
        <h3 className='text-4xl'>Comments</h3>
        <hr className='pb-2' />
        {
          post.comments.map((comment) => (
            <div className="shadow shadow-slate-300 p-6" key={comment._id}>
              <p>
                <span className="text-gray-500 pr-2 font-bold">
                  {comment.name}:
                </span>
                {comment.comment}
              </p>
            </div>
          ))
        }
      </section>
    </main>
  )
}

export default Post

export const getStaticPaths = async () => {
  const query = `*[_type == 'post'] {
    _id,
    slug {
      current
    }
  }`

  const posts = await sanityClient.fetch(query)
  const paths = posts.map((post: Post) => ({
    params: {
      slug: post.slug.current,
    },
  }))

  return {
    paths,
    fallback: 'blocking',
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const query = `*[_type == 'post' && slug.current == $slug][0]{
    _id,
    _createdAt,
    title,
    author-> {
      name,
    image
  },
    "comments": *[
      _type == "comment" &&
      post._ref == ^._id
      
    ],
    description,
    mainImage,
    slug,
    body
  }`

  const post = await sanityClient.fetch(query, {
    slug: params?.slug,
  })
  if (!post) {
    return {
      notFound: true,
    }
  }
  return {
    props: {
      post,
    },
    revalidate: 60, // after 60 seconds, itll update the old cashed version
  }
}
