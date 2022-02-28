import '../styles/globals.scss'
import dynamic from "next/dynamic";
import "../Interceptors/index"
const NavBar=dynamic(()=>import("../components/Shared/NavBar/navBar.jsx"))


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
