import Head from 'next/head'
import styles from './page2.module.scss'
import swrHook from '../Shared/swrHook/swrHook';
import { useEffect } from 'react';


export default function Page2() {

  const [data, error, callSWR] = swrHook('/server_api/test_data')

  console.log("page2")

  useEffect(() => {
    console.log("UE page2")
    callSWR()
  }, [])



  return (
    <>
      <Head>
        <title>Page2</title>
      </Head>
      <div className={styles.container}>
        <h1>Page2</h1>
        <br />
        {data && <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Resident</th>
            </tr>
          </thead>
          <tbody>
            {data && data.map((_data, i) => {
              return <tr key={_data.name + "_" + i}>
                <td>{_data.name}</td>
                <td>{_data.resident}</td>
                <td>{_data._date}</td>
                <td>{_data.dt}</td>
              </tr>
            })}
          </tbody>
        </table>}

      </div>
    </>
  )
}
