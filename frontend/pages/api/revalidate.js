export default async function handler(req, res) {
    // Check for secret to confirm this is a valid request
    if (req.query.secret !== "1234") {
      return res.status(401).json({ message: 'Invalid token' })
    }

    try {
      await res.unstable_revalidate('/page4',req)
      return res.json({ revalidated: true })
    } catch (err) {
      console.log("revalidate",err)
      // If there was an error, Next.js will continue
      // to show the last successfully generated page
      return res.status(500).send('Error revalidating')
    }
  }