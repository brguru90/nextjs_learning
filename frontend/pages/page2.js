import dynamic from "next/dynamic";
const Page2Component=dynamic(()=>import("../components/Page2/page2"))


export default function Page2(props) {
  return <Page2Component {...props} />
}
