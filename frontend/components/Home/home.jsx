import Head from 'next/head'
import styles from './home.module.scss'

export default function Home() {
  return (
    <>
      <Head>
        <title>Home</title>
        <meta name="robots" content="all" />
        <meta name="google" content="notranslate" key="notranslate" />
        <meta
          name="description"
          content="some description for SEO"
        />
        {/* ----------  og: is good for sharing links on  social media like FB & Whatsapp ----------- */}
        <meta property="og:title" content="Social Title for Cool Page" />
        <meta
          property="og:description"
          content="And a social description for our cool page"
        />
        <meta
          property="og:image"
          content="https://example.com/images/cool-page.jpg"
        />
      </Head>
      <div className={styles.container}>
        <h1>Home page</h1>
        
      </div>
    </>
  )
}
