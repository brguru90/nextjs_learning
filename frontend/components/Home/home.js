import Head from 'next/head'
import styles from './home.module.scss'

export default function Home() {
  return (
    <>
      <Head>
        <title>Home</title>
      </Head>
      <div className={styles.container}>
        <h1>Home page</h1>
      </div>
    </>
  )
}
