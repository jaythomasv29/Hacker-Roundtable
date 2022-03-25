import Head from 'next/head'
import Header from '../components/Header'

function About() {
  
  
  return (
    <div className="max-w-7xl mx-auto">
      <Head>
        <title>About</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />

      <div className='flex justify-between items-center bg-yellow-400 border-y border-black py-10 lg:py-0'>
        <div className='px-10 space-y-5'>
          <h1 className='text-xl max-w-xl font-serif'><span className='underline decoration-black decoration-4'>Hacker Roundtable</span> was inspired by attending hackathons and gaining exposure in content management systems. This page is initially inspired by <strong>Medium. The page has a CMS provided by Sanity.io and the Front end was designed using React / NextJS.</strong></h1>
          <h2>The goal was to build a live community to allow peers to comment on latest news regarding the latest on Hackathon and Technology with thousands of readers.</h2>
          <hr className='border-black'/>
          <h2>The site would have a moderator and journalists that would post, and users would be able to write their responses to build a sort of 'roundtable' feel</h2>
          <p>Technologies Used:</p>
          <p className='font-bold'>React, NextJS, TailwindCSS, Sanity.io, NPM, GitHub, API Protocol with Fetch, Async/Await, React Hook Forms Package</p>
          <a className="text-blue-500" href="https://github.com/jaythomasv29/Hacker-Roundtable" target="_blank">Link to Repository</a>
        </div>
        <p className="hidden md:inline-flex h-32 lg:h-full pr-8 font-serif text-9xl">(HR)</p>
      </div>
      {/* POSTS */}
      
</div>
  )
}

export default About