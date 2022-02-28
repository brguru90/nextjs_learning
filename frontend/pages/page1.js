import dynamic from "next/dynamic";
const Page1Component = dynamic(() => import("../components/Page1/page1.jsx"))

export default function Page1(props) {
  return <Page1Component {...props} />
}


// SSR
export async function getServerSideProps({ req,res }) {

  const protocol = req.headers['x-forwarded-proto'] || 'http'
  const baseUrl = req ? `${protocol}://${req.headers.host}` : ''
  const cookie = req ? req.headers.cookie : null

  let response = await fetch(baseUrl + "/server_api/test_data", {
    headers: {
      cookie
    }
  })


  // forwarding express server cookie to browser instead of next js server
  try {
    const set_cookie = response.headers.get('Set-Cookie').replace("set_cookie").trim()
    res.setHeader("Set-Cookie", set_cookie);
  } catch (error) {
    console.log(error)
  }


  return {
    props: {
      api_data: await response.json(),
      env:JSON.parse(JSON.stringify(process.env))
    }
  }
}