
export default function page3() {
    return (
        <div>Redirect to page2</div>
    )
}



export async function getServerSideProps(context) {
    return {
        redirect: {
            destination: '/page2',
            permanent: true
        }
    }
}