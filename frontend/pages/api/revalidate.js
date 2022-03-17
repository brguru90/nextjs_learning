export default async function handler(req, res) {
  // Check for secret to confirm this is a valid request
  if (req.headers["secret"] !== "1234") {
    return res.status(401).json({ message: 'Invalid token' })
  }

  if(req.body.revalidated[process.pid]){
    // just skip if its already revalidated
    console.log("already revalidated for pid=",process.pid)
    return res.json({ revalidated: true, pid: process.pid,already:true })
  }

  try {
    await res.unstable_revalidate('/page4', req)
    console.log("just revalidated for pid=",process.pid)
    return res.json({ revalidated: true, pid: process.pid })
  } catch (err) {
    console.log("revalidate", err)
    // If there was an error, Next.js will continue
    // to show the last successfully generated page
    return res.status(500).send('Error revalidating')
  }
}