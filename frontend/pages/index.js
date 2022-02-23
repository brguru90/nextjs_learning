import dynamic from "next/dynamic";
// should use arrow callback in dynamic to dynamically ad css & js
const HomePage=dynamic(()=>import("../components/Home/home"))

export default function Home(props) {
  return <HomePage {...props} />
}
