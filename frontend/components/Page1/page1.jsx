import Head from 'next/head'
import { useEffect } from 'react'
import styles from './page1.module.scss'

export default function Page1({api_data,env}) {

  console.log("page1")

  useEffect(() => {
    console.log("UE page1")
   }, [])

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
        {api_data && api_data.map((_data,i)=>{
          return <tr key={_data.name+"_"+i}>
            <td>{_data.name}</td>
            <td>{_data.resident}</td>
            <td>{_data._date}</td>
          </tr>
        })}
        </tbody>
      </table>
      <br />
      <br />
        <p style={{wordBreak:"break-word"}}>
          ENV:<br />{JSON.stringify(env)}
        </p>
    </div>
  </>
  )
}
