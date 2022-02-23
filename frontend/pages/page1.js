import dynamic from "next/dynamic";
const Page1Component=dynamic(()=>import("../components/Page1/page1"))

export default function Page1(props) {
  return <Page1Component {...props} />
}


// SSR
export async function getServerSideProps({req}) {
  const protocol = req.headers['x-forwarded-proto'] || 'http'
  const baseUrl = req ? `${protocol}://${req.headers.host}` : ''

  let res = await fetch(baseUrl+"/api/test_data")

  return {
    props: {
      api_data: await res.json()
    }
  }
}