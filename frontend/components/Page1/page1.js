import Head from 'next/head'
import styles from './page1.module.scss'

export default function page1({api_data}) {
  return (
    <>
    <Head>
      <title>Page1</title>
    </Head>
    <div className={styles.container}>
      <h1>Page1</h1>
      <br />
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Resident</th>
          </tr>
        </thead>
        <tbody>
        {api_data && api_data.map(_data=>{
          return <tr>
            <td>{_data.name}</td>
            <td>{_data.resident}</td>
          </tr>
        })}
        </tbody>
      </table>
    </div>
  </>
  )
}
