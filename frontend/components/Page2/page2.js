import Head from 'next/head'
import styles from './page2.module.scss'
import swrHook from '../Shared/NavBar/swrHook/swrHook';
import { useEffect } from 'react';

export default function Page2() {

  const [data,error, callSWR] = swrHook('/api/test_data')

  useEffect(()=>{
    callSWR()
  },[])

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
            {data && data.map(_data => {
              return <tr>
                <td>{_data.name}</td>
                <td>{_data.resident}</td>
              </tr>
            })}
          </tbody>
        </table>}

      </div>
    </>
  )
}
