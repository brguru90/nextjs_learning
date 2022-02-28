const express = require("express")
const router = express.Router()


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
    console.log("cookies", req.cookies)
    if (!!req.cookies) {
        res.cookie("name", "guru", { expires: new Date(new Date().getTime() +(2*60*60*1000)), httpOnly: true, sameSite: "Strict" });
    }


    res.json([
        {
            name: "guru",
            resident: "shimoga",
            _date:new Date()
        },
        {
            name: "manju",
            resident: "hassan",
            _date:new Date()
        },
    ])
})

module.exports = router
