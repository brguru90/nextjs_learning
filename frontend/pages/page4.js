import dynamic from "next/dynamic";
const Page1Component = dynamic(() => import("../components/Page1/page1.jsx"))

export default function Page1(props) {
  return <Page1Component {...props} />
}


// ISR
export async function getStaticProps(context) {
  const _url="http://"+process.env.SERVER_HOST+":"+process.env.SERVER_PORT + "/server_api/test_data"
  console.log("url",_url)
  let response = await fetch(_url)


  return {
    props: {
      // unstable_revalidate:1,
      api_data: await response.json(),
      env:JSON.parse(JSON.stringify(process.env))
    }
  }
}