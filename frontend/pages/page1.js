import Page1 from "../components/Page1/page1"

export default function (props) {
  return <Page1 {...props} />
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