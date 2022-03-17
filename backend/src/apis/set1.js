const express = require("express")
const axios = require('axios');
const router = express.Router()
const fs = require('fs');
const { json } = require("express");


fs.writeFileSync('./shared_sample.txt', JSON.stringify({
    _date: new Date()
}));



/** 
 * @swagger 
 * /server_api/test_data: 
 *   get: 
 *     description: Shows dummy data
 *     responses:  
 *       200: 
 *         description: Success  
 *   
 */
router.get("/test_data", (req, res) => {
    // console.log("cookies", req.cookies)
    if (!!req.cookies) {
        res.cookie("name", "guru", { expires: new Date(new Date().getTime() + (2 * 60 * 60 * 1000)), httpOnly: true, sameSite: "Strict" });
    }

    const a_data=JSON.parse(fs.readFileSync('./shared_sample.txt',
            {encoding:'utf8', flag:'r'}))

    res.json([
        {
            name: "guru",
            resident: "shimoga",
            _date:a_data["_date"]
        },
        {
            name: "manju",
            resident: "hassan",
            _date:a_data["_date"]
        },
    ])
})



router.all("/updateISR", (req, res) => {

    const total_node_instances = Number(process.env.instances) || 1
    let revalidate_instance_by_pid = {}
    let instances_revalidated = 0
    let max_request = total_node_instances*4

    var fullUrl = req.protocol + '://' + req.get('host')

    fs.writeFileSync('./shared_sample.txt', JSON.stringify({
        _date: new Date()
    }));


    setImmediate(async () => {
        while (instances_revalidated < total_node_instances && (max_request--) > 0) {
            try {
                const response = await axios({
                    method: "get",
                    data: JSON.stringify({
                        revalidated:revalidate_instance_by_pid
                    }),
                    url: fullUrl + '/api/revalidate',
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
                console.error("error",error)
                instances_revalidated = total_node_instances + 1
            }
        }
        res.json({
            msg: "sent revalidate request to all  of instance of next js",
            status: "success",
            instances_revalidated,
            max_request
        })
    })


})

module.exports = router
