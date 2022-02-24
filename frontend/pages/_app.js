import '../styles/globals.scss'
import dynamic from "next/dynamic";
const NavBar=dynamic(()=>import("../components/Shared/NavBar/navBar"))


function MyApp({ Component, pageProps }) {
  return <div className='page_wrap'>
    <NavBar />
    <Component {...pageProps} />
  </div>
}


export function reportWebVitals(metric) {
  console.log(metric)
}

export default MyApp
