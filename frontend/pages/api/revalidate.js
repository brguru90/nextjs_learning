const axios = require('axios');

export default async function handler(req, res) {
  // Check for secret to confirm this is a valid request
  if (req.headers["secret"] !== "1234") {
    return res.status(401).json({ message: 'Invalid token' })
  }


  if (req.body?.revalidated != null) {
    if (req.body.revalidated[process.pid]) {
      // just skip if its already revalidated
      console.log("already revalidated for pid=", process.pid)
      return res.json({ revalidated: true, pid: process.pid, already: true })
    }
    try {
      await res.unstable_revalidate('/page4', req)
      console.log("just revalidated for pid=", process.pid)
      return res.json({ revalidated: true, pid: process.pid })
    } catch (err) {
      console.log("revalidate", err)
      // If there was an error, Next.js will continue
      // to show the last successfully generated page
      return res.status(500).send('Error revalidating')
    }

  } else {
    // else start revalidation
    console.log("starting revalidation on all process")
    const total_node_instances = Number(process.env.instances) || 1
    let revalidate_instance_by_pid = {}
    let instances_revalidated = 0
    let max_request = total_node_instances * 4
    const protocol = req.headers['x-forwarded-proto'] || 'http'
    const baseUrl = req ? `${protocol}://${req.headers.host}` : ''
    console.log("baseUrl", baseUrl)

    await axios({
      method: "get",
      url: baseUrl + '/server_api/updateData'
    })

    try {
      await res.unstable_revalidate('/page4', req)
      revalidate_instance_by_pid[process.pid] = "done"
      instances_revalidated = 1
    } catch (error) {

    }

    setImmediate(async () => {
      while (instances_revalidated < total_node_instances && (max_request--) > 0) {
        try {
          const response = await axios({
            method: "get",
            data: JSON.stringify({
              revalidated: revalidate_instance_by_pid
            }),
            url: baseUrl + '/api/revalidate',
            headers: {
              "secret": "1234",
              'Content-Type': 'application/json',
            }
          })
          // console.log("response", response.data, "pid", response.data.pid, !revalidate_instance_by_pid[response.data.pid])
          if (response.data.revalidated && !revalidate_instance_by_pid[response.data.pid]) {
            revalidate_instance_by_pid[response.data.pid] = "done"
            instances_revalidated++
          }
        } catch (error) {
          console.error("error", error)
          instances_revalidated = total_node_instances + 1
        }
      }
      return res.json({
        msg: "sent revalidate request to all  of instance of next js",
        status: "success",
        instances_revalidated,
        max_request,
        revalidate_instance_by_pid
      })
    })

  }



}