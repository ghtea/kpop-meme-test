import type {NextPage} from "next"
import Head from "next/head"
import {WEBSITE_TITLE} from "./_app"

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>{WEBSITE_TITLE}</title>
      </Head>
      <div className='flex bg-slate-900'>home</div>
    </>
  )
}

export default Home
