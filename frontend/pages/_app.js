import '../styles/globals.scss'
import NavBar from "../components/Shared/NavBar/navBar"


function MyApp({ Component, pageProps }) {
  return <div className='page_wrap'>
    <NavBar />
    <Component {...pageProps} />
  </div>
}

export default MyApp
